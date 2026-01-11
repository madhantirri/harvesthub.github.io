import requests
from updater.config import NEWS_API_KEY

def fetch_policy_flags():
    """
    Fetch agriculture-related news and convert to policy flags
    """
    url = "https://newsapi.org/v2/everything"

    params = {
        "q": "India agriculture MSP export ban procurement",
        "language": "en",
        "apiKey": NEWS_API_KEY,
        "pageSize": 20
    }

    response = requests.get(url, params=params, timeout=30)
    response.raise_for_status()

    articles = response.json().get("articles", [])

    flags = {
        "Export_Ban_Flag": 0,
        "Procurement_Season_Flag": 0
    }

    for a in articles:
        text = ((a.get("title") or "") + (a.get("description") or "")).lower()

        if "export ban" in text:
            flags["Export_Ban_Flag"] = 1

        if "procurement" in text or "msp" in text:
            flags["Procurement_Season_Flag"] = 1

    return flags
