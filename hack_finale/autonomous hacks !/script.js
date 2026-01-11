// HarvestHub AI - Crop Price Prediction System

// Real Crop Data (from your JSON file)
const cropData = {
    "Banana": {
        "commodity": "Banana",
        "generated_on": "2026-01-10T23:02:27.740192",
        "forecast_7_days": {
            "day_1": 2453.89,
            "day_2": 2454.58,
            "day_3": 2440.22,
            "day_4": 2427.10,
            "day_5": 2410.73,
            "day_6": 2414.84,
            "day_7": 2414.48
        },
        "confidence_band": {
            "lower_bound": 2223.69,
            "upper_bound": 2641.62,
            "volatility_level": "high"
        },
        "statistics": {
            "last_price": 2451.95,
            "weekly_change_pct": -3.18
        },
        "historical_comparison": {
            "vs_last_week_pct": -3.18,
            "vs_last_year_pct": 10.69
        },
        "drivers": {
            "positive": ["Lower mandi arrivals"],
            "negative": []
        },
        "alerts": [
            "⚠️ High price volatility expected",
            "⚠️ Seasonal downward pressure likely in coming weeks"
        ],
        "seasonal_outlook": {
            "trend": "bearish",
            "time_horizon": "3–6 weeks",
            "reason": "Rabi harvest approaching, supply likely to increase"
        }
    },
    "Coconut": {
        "commodity": "Coconut",
        "generated_on": "2026-01-10T23:02:27.740192",
        "forecast_7_days": {
            "day_1": 3150.50,
            "day_2": 3160.75,
            "day_3": 3175.20,
            "day_4": 3180.30,
            "day_5": 3192.45,
            "day_6": 3200.80,
            "day_7": 3210.25
        },
        "confidence_band": {
            "lower_bound": 2900.00,
            "upper_bound": 3400.00,
            "volatility_level": "medium"
        },
        "statistics": {
            "last_price": 3145.30,
            "weekly_change_pct": 1.25
        },
        "historical_comparison": {
            "vs_last_week_pct": 1.25,
            "vs_last_year_pct": 8.45
        },
        "drivers": {
            "positive": ["Festival demand", "Export orders"],
            "negative": ["Transportation issues"]
        },
        "alerts": [
            "📈 Steady upward trend observed",
            "🌴 Coastal region production stable"
        ],
        "seasonal_outlook": {
            "trend": "bullish",
            "time_horizon": "2–4 weeks",
            "reason": "Festival season and export demand increasing"
        }
    },
    "Rice": {
        "commodity": "Rice",
        "generated_on": "2026-01-10T23:02:27.740192",
        "forecast_7_days": {
            "day_1": 2850.75,
            "day_2": 2845.20,
            "day_3": 2838.90,
            "day_4": 2830.45,
            "day_5": 2825.60,
            "day_6": 2820.30,
            "day_7": 2815.80
        },
        "confidence_band": {
            "lower_bound": 2650.00,
            "upper_bound": 3050.00,
            "volatility_level": "low"
        },
        "statistics": {
            "last_price": 2855.40,
            "weekly_change_pct": -0.85
        },
        "historical_comparison": {
            "vs_last_week_pct": -0.85,
            "vs_last_year_pct": 5.30
        },
        "drivers": {
            "positive": ["Government procurement", "Stable demand"],
            "negative": ["Good harvest"]
        },
        "alerts": [
            "📊 Stable market conditions",
            "🏭 Mills operating at normal capacity"
        ],
        "seasonal_outlook": {
            "trend": "neutral",
            "time_horizon": "4–8 weeks",
            "reason": "Balanced supply and demand with stable government policies"
        }
    },
    "Wheat": {
        "commodity": "Wheat",
        "generated_on": "2026-01-10T23:02:27.740192",
        "forecast_7_days": {
            "day_1": 2250.40,
            "day_2": 2245.80,
            "day_3": 2240.30,
            "day_4": 2235.60,
            "day_5": 2230.90,
            "day_6": 2226.40,
            "day_7": 2220.80
        },
        "confidence_band": {
            "lower_bound": 2100.00,
            "upper_bound": 2400.00,
            "volatility_level": "low"
        },
        "statistics": {
            "last_price": 2255.20,
            "weekly_change_pct": -1.20
        },
        "historical_comparison": {
            "vs_last_week_pct": -1.20,
            "vs_last_year_pct": -2.45
        },
        "drivers": {
            "positive": ["Global price increase"],
            "negative": ["High domestic stock", "Low export demand"]
        },
        "alerts": [
            "📉 Mild downward pressure",
            "🌾 Rabi harvest completion increasing supply"
        ],
        "seasonal_outlook": {
            "trend": "bearish",
            "time_horizon": "3–5 weeks",
            "reason": "Harvest season and high buffer stocks"
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // 1. Handle Preloader
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1500);
    }

    // 2. Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // 3. Setup Smooth Scrolling for navigation
    setupSmoothScroll();
});

// Function to handle smooth scrolling for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for the fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to predict next 3 days using linear regression
function predictNext3Days(forecast7Days) {
    const days = Object.values(forecast7Days);
    const n = days.length;
    
    // Calculate linear regression
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (let i = 0; i < n; i++) {
        const x = i + 1;
        const y = days[i];
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Predict next 3 days
    const predictions = {
        day_8: Math.round((slope * 8 + intercept) * 100) / 100,
        day_9: Math.round((slope * 9 + intercept) * 100) / 100,
        day_10: Math.round((slope * 10 + intercept) * 100) / 100
    };
    
    return predictions;
}

// Function to calculate regional price adjustment
function getRegionalMultiplier(region) {
    const regionMultipliers = {
        'Punjab': 1.05,
        'Haryana': 1.03,
        'Uttar Pradesh': 1.00,
        'Maharashtra': 0.98,
        'Gujarat': 0.97,
        'Rajasthan': 1.02,
        'Madhya Pradesh': 0.99,
        'Karnataka': 0.96
    };
    
    return regionMultipliers[region] || 1.00;
}

// Function to calculate soil adjustment
function getSoilMultiplier(soil) {
    const soilMultipliers = {
        'Loamy': 1.05,
        'Silt': 1.02,
        'Clay': 0.95,
        'Sandy': 0.90,
        'Peaty': 0.92
    };
    
    return soilMultipliers[soil] || 1.00;
}

// Function to calculate irrigation adjustment
function getIrrigationMultiplier(irrigation) {
    const irrigationMultipliers = {
        'Drip': 1.08,
        'TubeWell': 1.03,
        'Canal': 1.00,
        'Rainfed': 0.95
    };
    
    return irrigationMultipliers[irrigation] || 1.00;
}

// Function to calculate demand adjustment
function getDemandMultiplier(demand) {
    const demandMultipliers = {
        'Very High': 1.15,
        'High': 1.10,
        'Medium': 1.00,
        'Low': 0.90
    };
    
    return demandMultipliers[demand] || 1.00;
}

// Function to calculate yield adjustment
function getYieldMultiplier(yieldValue) {
    if (yieldValue > 70) return 0.95; // High supply, lower price
    if (yieldValue < 30) return 1.05; // Low supply, higher price
    return 1.00;
}

// Function to calculate season adjustment
function getSeasonMultiplier(season) {
    const seasonMultipliers = {
        'Kharif': 1.08,
        'Rabi': 1.00,
        'Zaid': 1.03
    };
    
    return seasonMultipliers[season] || 1.00;
}

// Function to create price trend chart
function createPriceChart(cropInfo, next3Days) {
    const existingChart = Chart.getChart("priceChart");
    if (existingChart) {
        existingChart.destroy();
    }
    
    const ctx = document.createElement('canvas');
    ctx.id = 'priceChart';
    
    // Prepare data
    const forecastDays = Object.values(cropInfo.forecast_7_days);
    const nextDays = Object.values(next3Days);
    const allDays = [...forecastDays, ...nextDays];
    
    const labels = [];
    for (let i = 1; i <= 7; i++) labels.push(`Day ${i}`);
    for (let i = 8; i <= 10; i++) labels.push(`Day ${i}*`);
    
    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Price (₹/Quintal)',
            data: allDays,
            borderColor: 'rgba(46, 204, 113, 1)',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Price (₹/Quintal)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Days Forecast'
                    }
                }
            }
        }
    };
    
    return { ctx, config: chartConfig };
}

// Main prediction function
function startPrediction() {
    // Get form values
    const crop = document.getElementById('cropSelect').value;
    const region = document.getElementById('regionSelect').value;
    const soil = document.getElementById('soilType').value;
    const season = document.getElementById('season').value;
    const yieldValue = parseInt(document.getElementById('yield').value) || 50;
    const irrigation = document.getElementById('irrigation').value;
    const demand = document.getElementById('marketDemand').value;
    
    // Validate required fields
    if(!crop || !region || !soil || !season || !irrigation || !demand) {
        alert("Please fill in all the required fields.");
        return;
    }
    
    if (!cropData[crop]) {
        alert(`Data not available for ${crop}. Please select from available crops.`);
        return;
    }
    
    // Hide form and show loading animation
    document.getElementById('predictForm').style.display = 'none';
    document.getElementById('predictAnimation').style.display = 'flex';
    document.getElementById('predictResult').style.display = 'none';
    
    // Simulate AI processing delay
    setTimeout(() => {
        const cropInfo = cropData[crop];
        
        // Predict next 3 days
        const next3Days = predictNext3Days(cropInfo.forecast_7_days);
        
        // Calculate adjustments
        const regionalMultiplier = getRegionalMultiplier(region);
        const soilMultiplier = getSoilMultiplier(soil);
        const irrigationMultiplier = getIrrigationMultiplier(irrigation);
        const demandMultiplier = getDemandMultiplier(demand);
        const yieldMultiplier = getYieldMultiplier(yieldValue);
        const seasonMultiplier = getSeasonMultiplier(season);
        
        // Calculate final predicted price for tomorrow
        const basePrice = cropInfo.statistics.last_price;
        const adjustedPrice = basePrice * regionalMultiplier * soilMultiplier * 
                             irrigationMultiplier * demandMultiplier * 
                             yieldMultiplier * seasonMultiplier;
        
        // Get trend information
        const trend = cropInfo.seasonal_outlook.trend;
        const trendIcon = trend === 'bullish' ? '↗️' : trend === 'bearish' ? '↘️' : '➡️';
        const trendClass = trend === 'bullish' ? 'trend-up' : trend === 'bearish' ? 'trend-down' : 'trend-neutral';
        const trendColor = trend === 'bullish' ? 'var(--primary)' : trend === 'bearish' ? '#e74c3c' : '#f39c12';
        
        // Create chart
        const chart = createPriceChart(cropInfo, next3Days);
        
        // Generate result HTML
        const resultDiv = document.getElementById('predictResult');
        resultDiv.innerHTML = `
            <div class="result-success">
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px;">
                    <i class="fas fa-robot" style="font-size: 2.5rem; color: var(--primary);"></i>
                    <h2 style="color: var(--dark); margin: 0;">AI Prediction Result</h2>
                </div>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 2rem; font-weight: 600; color: var(--dark); margin-bottom: 10px;">
                        ${crop} in ${region}
                    </div>
                    <div class="price-display">
                        ₹${adjustedPrice.toFixed(2)}<span class="price-unit"> / Quintal</span>
                    </div>
                    <div class="market-trend ${trendClass}">
                        <span style="font-size: 1.2rem;">${trendIcon}</span>
                        <span>${trend.toUpperCase()} TREND | ${cropInfo.statistics.weekly_change_pct >= 0 ? '+' : ''}${cropInfo.statistics.weekly_change_pct}% Weekly</span>
                    </div>
                </div>
                
                <!-- Next 3 Days Forecast -->
                <div class="result-details">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-calendar-alt"></i> Next 3 Days Forecast
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                        <div style="text-align: center; padding: 20px; background: rgba(46, 204, 113, 0.08); border-radius: 12px;">
                            <div style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 5px;">Tomorrow</div>
                            <div style="font-size: 1.8rem; font-weight: 700; color: var(--primary-dark);">₹${next3Days.day_8}</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: rgba(46, 204, 113, 0.08); border-radius: 12px;">
                            <div style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 5px;">Day +2</div>
                            <div style="font-size: 1.8rem; font-weight: 700; color: var(--primary-dark);">₹${next3Days.day_9}</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: rgba(46, 204, 113, 0.08); border-radius: 12px;">
                            <div style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 5px;">Day +3</div>
                            <div style="font-size: 1.8rem; font-weight: 700; color: var(--primary-dark);">₹${next3Days.day_10}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Price Chart -->
                <div class="chart-container">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-chart-line"></i> 10-Day Price Trend
                    </h4>
                    <div id="chartPlaceholder"></div>
                    <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 15px; text-align: center;">
                        *Days 8-10 are AI predictions based on historical trends
                    </p>
                </div>
                
                <!-- Market Analysis -->
                <div class="result-details">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-chart-bar"></i> Market Analysis
                    </h4>
                    
                    <div class="detail-row">
                        <span class="detail-label">Current Market Price:</span>
                        <span class="detail-value">₹${cropInfo.statistics.last_price}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Price Range:</span>
                        <span class="detail-value">₹${cropInfo.confidence_band.lower_bound} - ₹${cropInfo.confidence_band.upper_bound}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Volatility:</span>
                        <span class="detail-value" style="text-transform: capitalize; color: ${cropInfo.confidence_band.volatility_level === 'high' ? '#e74c3c' : cropInfo.confidence_band.volatility_level === 'medium' ? '#f39c12' : 'var(--primary)'}">
                            ${cropInfo.confidence_band.volatility_level}
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">vs Last Year:</span>
                        <span class="detail-value" style="color: ${cropInfo.historical_comparison.vs_last_year_pct >= 0 ? 'var(--primary)' : '#e74c3c'}">
                            ${cropInfo.historical_comparison.vs_last_year_pct >= 0 ? '+' : ''}${cropInfo.historical_comparison.vs_last_year_pct}%
                        </span>
                    </div>
                    
                    <!-- Market Drivers -->
                    ${cropInfo.drivers.positive.length > 0 || cropInfo.drivers.negative.length > 0 ? `
                        <div style="margin-top: 20px;">
                            <div style="font-weight: 600; color: var(--dark); margin-bottom: 10px;">Market Drivers:</div>
                            ${cropInfo.drivers.positive.map(driver => `
                                <div style="color: var(--primary); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-arrow-up"></i> ${driver}
                                </div>
                            `).join('')}
                            ${cropInfo.drivers.negative.map(driver => `
                                <div style="color: #e74c3c; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-arrow-down"></i> ${driver}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Alerts -->
                ${cropInfo.alerts.length > 0 ? `
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle" style="color: var(--warning); font-size: 1.2rem;"></i>
                        <div>
                            <div style="font-weight: 600; color: var(--warning); margin-bottom: 5px;">Market Alerts</div>
                            ${cropInfo.alerts.map(alert => `<div style="margin-bottom: 5px;">${alert}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Seasonal Outlook -->
                <div class="result-details">
                    <h4 style="margin-bottom: 15px; color: var(--dark); display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-calendar-check"></i> Seasonal Outlook
                    </h4>
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <div class="market-trend ${trendClass}" style="margin: 0;">
                            ${trendIcon} ${trend.toUpperCase()}
                        </div>
                        <span style="color: var(--text-light);">Time Horizon: ${cropInfo.seasonal_outlook.time_horizon}</span>
                    </div>
                    <p style="color: var(--text-main); line-height: 1.6;">${cropInfo.seasonal_outlook.reason}</p>
                </div>
                
                <!-- Your Input Factors -->
                <div class="result-details">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-cogs"></i> Your Input Factors
                    </h4>
                    <div class="detail-row">
                        <span class="detail-label">Region Adjustment:</span>
                        <span class="detail-value">${region} (${((regionalMultiplier - 1) * 100).toFixed(0)}%)</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Soil Type:</span>
                        <span class="detail-value">${soil} (${((soilMultiplier - 1) * 100).toFixed(0)}%)</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Irrigation:</span>
                        <span class="detail-value">${irrigation} (${((irrigationMultiplier - 1) * 100).toFixed(0)}%)</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Market Demand:</span>
                        <span class="detail-value">${demand} (${((demandMultiplier - 1) * 100).toFixed(0)}%)</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Season:</span>
                        <span class="detail-value">${season} (${((seasonMultiplier - 1) * 100).toFixed(0)}%)</span>
                    </div>
                </div>
                
                <div style="margin-top: 40px; text-align: center;">
                    <p style="font-style: italic; color: var(--text-light); margin-bottom: 20px; font-size: 0.9rem;">
                        *Prediction generated on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
                        *All prices are in Indian Rupees (₹) per quintal
                    </p>
                    
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn predict-again-btn" onclick="resetPrediction()">
                            <i class="fas fa-redo"></i> Predict Another Crop
                        </button>
                        <button class="btn btn-secondary" onclick="downloadPredictionReport('${crop}', '${region}', ${adjustedPrice.toFixed(2)})">
                            <i class="fas fa-download"></i> Download Report
                        </button>
                        <button class="btn" style="background: var(--info);" onclick="sharePrediction('${crop}', '${region}', ${adjustedPrice.toFixed(2)})">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add chart to DOM
        const chartPlaceholder = document.getElementById('chartPlaceholder');
        chartPlaceholder.appendChild(chart.ctx);
        new Chart(chart.ctx, chart.config);
        
        // Show result and hide loading animation
        resultDiv.style.display = 'block';
        document.getElementById('predictAnimation').style.display = 'none';
        
        // Scroll to results
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 2500); // 2.5 second delay for simulation
}

// Function to download prediction report
function downloadPredictionReport(crop, region, price) {
    const report = `
╔══════════════════════════════════════════════════╗
║         HARVESTHUB AI - PREDICTION REPORT        ║
╚══════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleString()}

═══════════════════════════════════════════════════
CROP DETAILS
═══════════════════════════════════════════════════
Crop: ${crop}
Region: ${region}
Predicted Price: ₹${price} per quintal

═══════════════════════════════════════════════════
MARKET ANALYSIS
═══════════════════════════════════════════════════
${Object.entries(cropData[crop].forecast_7_days).map(([day, price]) => `${day.replace('_', ' ')}: ₹${price}`).join('\n')}

Next 3 Days Forecast:
- Day 8: ₹${predictNext3Days(cropData[crop].forecast_7_days).day_8}
- Day 9: ₹${predictNext3Days(cropData[crop].forecast_7_days).day_9}
- Day 10: ₹${predictNext3Days(cropData[crop].forecast_7_days).day_10}

Price Range: ₹${cropData[crop].confidence_band.lower_bound} - ₹${cropData[crop].confidence_band.upper_bound}
Volatility: ${cropData[crop].confidence_band.volatility_level.toUpperCase()}

═══════════════════════════════════════════════════
MARKET DRIVERS
═══════════════════════════════════════════════════
POSITIVE FACTORS:
${cropData[crop].drivers.positive.map(factor => `• ${factor}`).join('\n')}

${cropData[crop].drivers.negative.length > 0 ? `NEGATIVE FACTORS:\n${cropData[crop].drivers.negative.map(factor => `• ${factor}`).join('\n')}` : ''}

═══════════════════════════════════════════════════
SEASONAL OUTLOOK
═══════════════════════════════════════════════════
Trend: ${cropData[crop].seasonal_outlook.trend.toUpperCase()}
Time Horizon: ${cropData[crop].seasonal_outlook.time_horizon}
Reason: ${cropData[crop].seasonal_outlook.reason}

═══════════════════════════════════════════════════
DISCLAIMER
═══════════════════════════════════════════════════
This is an AI-generated prediction based on market data
and historical trends. For exact market prices, please
visit your local mandi or agricultural market.

© ${new Date().getFullYear()} HarvestHub AI. All rights reserved.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HarvestHub_${crop}_${region}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to share prediction
function sharePrediction(crop, region, price) {
    if (navigator.share) {
        navigator.share({
            title: `HarvestHub AI Prediction: ${crop}`,
            text: `Predicted price for ${crop} in ${region}: ₹${price} per quintal. Check out HarvestHub AI for more predictions!`,
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        const text = `Predicted price for ${crop} in ${region}: ₹${price} per quintal.\n\nCheck out HarvestHub AI: ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('Prediction copied to clipboard!');
        });
    }
}

// Function to reset the prediction form
function resetPrediction() {
    // Reset form fields
    document.getElementById('cropSelect').value = '';
    document.getElementById('regionSelect').value = '';
    document.getElementById('soilType').value = '';
    document.getElementById('season').value = '';
    document.getElementById('yield').value = '';
    document.getElementById('irrigation').value = '';
    document.getElementById('marketDemand').value = '';
    
    // Show form, hide results and animation
    document.getElementById('predictForm').style.display = 'flex';
    document.getElementById('predictResult').style.display = 'none';
    document.getElementById('predictAnimation').style.display = 'none';
    
    // Scroll back to form
    document.getElementById('predictForm').scrollIntoView({ behavior: 'smooth' });
}

// Function to get trend color based on percentage
function getTrendColor(percentage) {
    if (percentage > 5) return 'var(--primary)';
    if (percentage < -5) return '#e74c3c';
    return '#f39c12';
}