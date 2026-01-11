import requests

def fetch_rainfall_mm(lat=23.0, lon=72.5):
    """
    Fetch today's rainfall (mm) using Open-Meteo
    Default: Gujarat coordinates
    """
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "precipitation_sum",
        "timezone": "Asia/Kolkata"
    }

    response = requests.get(url, params=params, timeout=30)
    response.raise_for_status()

    data = response.json()
    return float(data["daily"]["precipitation_sum"][0])
