def decide_exit_signal(market):
    forecast = list(market["forecast_7_days"].values())
    seasonal = market["seasonal_outlook"]["trend"]
    volatility = market["confidence_band"]["volatility_level"]

    peak = max(forecast)
    last = forecast[-1]
    upside_pct = ((peak - last) / last) * 100

    if forecast[-1] < forecast[-3]:
        return "SELL", "Short-term momentum weakening"

    if seasonal == "bearish":
        return "SELL", "Seasonal demand expected to weaken"

    if upside_pct < 2:
        return "SELL", "Limited upside remaining"

    if volatility == "high" and last < peak:
        return "SELL", "High volatility with weak trend"

    return "HOLD", "Trend remains favorable"
