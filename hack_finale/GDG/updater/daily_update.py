print("🚀 daily_update.py file loaded")

import pandas as pd
from datetime import datetime
from updater.fetch_mandi import fetch_mandi_prices
from updater.fetch_weather import fetch_rainfall_mm
from updater.fetch_news import fetch_policy_flags
from updater.config import DATA_FILE, COMMODITIES

def daily_update():
    print("🔁 daily_update() started")

    today = datetime.today().strftime("%Y-%m-%d")
    print(f"📅 Date: {today}")

    df = pd.read_excel(DATA_FILE)
    df.columns = df.columns.str.strip()

    if today in df["Date"].astype(str).values:
        print("✅ Data already exists for today")
        return

    print("🌾 Fetching mandi data...")
    mandi_df = fetch_mandi_prices(today)

    print("📰 Fetching news signals...")
    policy_flags = fetch_policy_flags()

    print("🌧 Fetching weather...")
    rainfall = fetch_rainfall_mm()

    new_rows = []

    for commodity in COMMODITIES:
        print(f"➕ Updating {commodity}")

        hist = df[df["Commodity"] == commodity].iloc[-1]

        mdf = mandi_df[
            mandi_df["commodity"].str.lower() == commodity.lower()
        ] if not mandi_df.empty else pd.DataFrame()

        price = float(mdf["modal_price"].mean()) if not mdf.empty else hist["Daily_Mandi_Price"]
        arrivals = float(mdf["arrivals"].mean()) if not mdf.empty else hist["Daily_Arrivals_Tonnes"]

        new_rows.append({
            "Date": today,
            "Commodity": commodity,
            "MSP": hist["MSP"],
            "Procurement_Season_Flag": policy_flags["Procurement_Season_Flag"],
            "Export_Ban_Flag": policy_flags["Export_Ban_Flag"],
            "FCI_Stock_LMT": hist["FCI_Stock_LMT"],
            "Daily_Mandi_Price": price,
            "Daily_Arrivals_Tonnes": arrivals,
            "Rainfall_Deviation_Pct": rainfall,
            "Festival_Season_Flag": 0,
            "Fertilizer_Price_Index": hist["Fertilizer_Price_Index"]
        })

    df = pd.concat([df, pd.DataFrame(new_rows)], ignore_index=True)
    df.to_excel(DATA_FILE, index=False)

    print("🎉 DAILY UPDATE COMPLETED SUCCESSFULLY")

if __name__ == "__main__":
    print("▶️ Running as module")
    daily_update()
