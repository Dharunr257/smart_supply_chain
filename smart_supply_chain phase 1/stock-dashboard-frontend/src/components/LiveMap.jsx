import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Typography } from "@mui/material";
import truckIconImage from "../utils/truck marker.png";

// 💡 Replace this with your actual ORS API key
const ORS_API_KEY = "5b3ce3597851110001cf6248a26d74893de645c09444993972676d8e";

const truckIcon = L.icon({
  iconUrl: truckIconImage,
  iconSize: [52, 52],        // 🔼 Increased from [40, 40] to [52, 52]
  iconAnchor: [26, 52],      // 🔼 Half of icon size
  popupAnchor: [0, -52], // point from which the popup should open relative to the iconAnchor
});

// Set default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 🔍 Geocode a place using Nominatim
const geocode = async (place) => {
  console.log("[Geocode] Searching for:", place);
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&limit=1&q=${encodeURIComponent(
      place
    )}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.length > 0) {
      const loc = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        name: place,
      };
      console.log(`[Geocode] Found for "${place}":`, loc);
      return loc;
    } else {
      console.warn(`[Geocode] No results for: ${place}`);
    }
  } catch (err) {
    console.error("[Geocode] Error:", err.message);
  }
  return null;
};

const LiveMap = ({ lat, lng, source, destination }) => {
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    const fetchGeoAndRoute = async () => {
      console.log("[Map Init] Source:", source, "Destination:", destination);

      if (!source || !destination) {
        console.warn("[LiveMap] Source or destination missing.");
        return;
      }

      const [src, dest] = await Promise.all([
        geocode(source),
        geocode(destination),
      ]);

      if (!src || !dest) {
        console.warn("[LiveMap] Could not geocode one or both locations.");
        return;
      }

      setSourceCoords(src);
      setDestinationCoords(dest);

      console.log("[LiveMap] Requesting ORS route...");
      console.log("[ORS Request]", src.lng, src.lat, dest.lng, dest.lat);
      try {
        const response = await axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            coordinates: [
              [src.lng, src.lat],
              [dest.lng, dest.lat],
            ],
          },
          {
            headers: {
              Authorization: ORS_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const coords = response.data.features[0].geometry.coordinates.map(
          ([lon, lat]) => [lat, lon]
        );

        console.log("[LiveMap] ORS route points:", coords.length);
        setRouteCoords(coords);
      } catch (err) {
        console.error("[LiveMap] ORS Error:", err.message);
      }
    };

    fetchGeoAndRoute();
  }, [source, destination]);

  return (
    <Box sx={{ height: 400, mt: 2 }}>
      <MapContainer center={[lat, lng]} zoom={7} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* 🔵 Current Stock Location */}

        <Marker position={[lat, lng]} icon={truckIcon}>
          <Popup>
            <strong>Current Stock Location</strong>
          </Popup>
        </Marker>
        {/* <Marker position={[lat, lng]}>
          <Popup>Current Stock Location</Popup>
        </Marker> */}

        {/* 🟡 Source Marker */}
        {sourceCoords && (
          <Marker position={[sourceCoords.lat, sourceCoords.lng]}>
            <Popup>Source: {sourceCoords.name}</Popup>
          </Marker>
        )}

        {/* 🟣 Destination Marker */}
        {destinationCoords && (
          <Marker position={[destinationCoords.lat, destinationCoords.lng]}>
            <Popup>Destination: {destinationCoords.name}</Popup>
          </Marker>
        )}

        {/* 🟢 Route Line */}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="green" weight={5} />
        )}
      </MapContainer>

      {(!sourceCoords || !destinationCoords || routeCoords.length === 0) && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <CircularProgress size={24} />
          <Typography variant="body2" color="text.secondary">
            Loading route or geocoding data...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LiveMap;
