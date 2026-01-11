import requests
import pandas as pd
from updater.config import DATA_GOV_API_KEY

RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070"

def fetch_mandi_prices(date):
    """
    Fetch mandi prices from data.gov.in for a given date (YYYY-MM-DD)
    """
    url = f"https://api.data.gov.in/resource/{RESOURCE_ID}"

    params = {
        "api-key": DATA_GOV_API_KEY,
        "format": "json",
        "filters[Arrival_Date]": date,
        "limit": 1000
    }

    response = requests.get(url, params=params, timeout=30)
    response.raise_for_status()

    records = response.json().get("records", [])
    return pd.DataFrame(records)
