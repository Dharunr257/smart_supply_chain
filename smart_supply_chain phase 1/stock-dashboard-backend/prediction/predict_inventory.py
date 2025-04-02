import pandas as pd
import psycopg2
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from datetime import datetime, timedelta
import json
from dotenv import load_dotenv
import os

load_dotenv() 

def get_db_connection():
     return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )

def fetch_delivery_data():
    conn = get_db_connection()
    query = """
        SELECT stock_name, quantity, delivered_at
        FROM delivered
        ORDER BY delivered_at ASC
    """
    df = pd.read_sql(query, conn)
    conn.close()
    return df

def preprocess(df):
    df['delivered_at'] = pd.to_datetime(df['delivered_at'])
    df['month'] = df['delivered_at'].dt.to_period('M')
    grouped = df.groupby(['stock_name', 'month'])['quantity'].sum().reset_index()
    grouped['month'] = grouped['month'].dt.to_timestamp()
    return grouped

def forecast_stock(grouped, steps=3):
    forecasts = {}

    for stock in grouped['stock_name'].unique():
        sub = grouped[grouped['stock_name'] == stock].copy()
        sub.set_index('month', inplace=True)

        if len(sub) < 2:
            forecasts[stock] = "Insufficient data for forecasting"
            continue

        model = ExponentialSmoothing(sub['quantity'], trend='add', seasonal=None)
        fit = model.fit()

        forecast = fit.forecast(steps)

        forecasts[stock] = {
            str(k if isinstance(k, datetime) else datetime.now().date() + timedelta(days=30 * i)): int(v)
            for i, (k, v) in enumerate(forecast.items())
        }

    return forecasts

def predict():
    df = fetch_delivery_data()
    grouped = preprocess(df)
    forecast = forecast_stock(grouped)
    return forecast

if __name__ == '__main__':
    result = predict()
    print(json.dumps(result, indent=2, default=str))
