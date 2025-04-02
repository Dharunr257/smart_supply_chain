-- Create the main database
CREATE DATABASE supply_chain_db;

-- Connect to the database
\c supply_chain_db;

-- ----------------------------------------
-- PHASE 2: Products Table (Manufactured State)
-- ----------------------------------------
CREATE TABLE products (
  stock_id VARCHAR(20) PRIMARY KEY,
  product_name VARCHAR(100),
  category VARCHAR(50),
  quantity INT,
  status VARCHAR(20),
  barcode_path TEXT
);

-- ----------------------------------------
-- PHASE 1: Inventory List Table
-- ----------------------------------------
CREATE TABLE inventory_list (
  stock_id VARCHAR(20) PRIMARY KEY,
  stock_name VARCHAR(100),
  quantity INT,
  status VARCHAR(20),
  moved_to_inventory_at TIMESTAMP
);

-- ----------------------------------------
-- PHASE 1: Transit List Table
-- ----------------------------------------
CREATE TABLE transit_list (
  stock_id VARCHAR(20) PRIMARY KEY,
  stock_name VARCHAR(100),
  quantity INT,
  status VARCHAR(20),
  last_location_updated_at TIMESTAMP,
  moved_at TIMESTAMP,
  source_location VARCHAR(100),
  destination_location VARCHAR(100)
);

-- ----------------------------------------
-- PHASE 1: Shipment Tracking Table (GPS Tracker)
-- ----------------------------------------
CREATE TABLE shipment_tracking (
  stock_id VARCHAR(20) PRIMARY KEY,
  stock_name VARCHAR(100),
  quantity INT,
  status VARCHAR(20),
  latitude DECIMAL(10, 6),
  longitude DECIMAL(10, 6),
  temperature VARCHAR(10),
  updated_at TIMESTAMP,
  in_transit_since INTERVAL,
  source_location VARCHAR(100),
  destination_location VARCHAR(100)
);

-- ----------------------------------------
-- PHASE 1: Delivered Table
-- ----------------------------------------
CREATE TABLE delivered (
  stock_id VARCHAR(20) PRIMARY KEY,
  stock_name VARCHAR(100),
  quantity INT,
  status VARCHAR(20),
  delivered_at TIMESTAMP,
  destination_location VARCHAR(100)
);

-- ----------------------------------------
-- Indexes for performance (Optional)
-- ----------------------------------------
CREATE INDEX idx_shipment_tracking_status ON shipment_tracking(status);
CREATE INDEX idx_transit_list_status ON transit_list(status);

-- Update source_location and destination_location in transit_list table
UPDATE transit_list
SET source_location = REPLACE(source_location, 'Vishakhapatnam', 'Visakhapatnam'),
    destination_location = REPLACE(destination_location, 'Vishakhapatnam', 'Visakhapatnam');

-- Update source_location and destination_location in shipment_tracking table
UPDATE shipment_tracking
SET source_location = REPLACE(source_location, 'Vishakhapatnam', 'Visakhapatnam'),
    destination_location = REPLACE(destination_location, 'Vishakhapatnam', 'Visakhapatnam');

-- Update source_location and destination_location in delivered table
UPDATE delivered
SET destination_location = REPLACE(destination_location, 'Vishakhapatnam', 'Visakhapatnam');
