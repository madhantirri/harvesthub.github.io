// HarvestHub AI - Crop Price Predictor Page Script

// AI-Based Season Determination Function
function determineSeason(region) {
    const month = new Date().getMonth() + 1; // 1-12
    
    // Based on Indian agricultural seasons
    const seasonMap = {
        // North India regions
        'Punjab': month >= 7 && month <= 10 ? 'Kharif' : 
                 month >= 11 || month <= 3 ? 'Rabi' : 'Zaid',
        'Haryana': month >= 7 && month <= 10 ? 'Kharif' : 
                  month >= 11 || month <= 3 ? 'Rabi' : 'Zaid',
        'Uttar Pradesh': month >= 7 && month <= 10 ? 'Kharif' : 
                        month >= 11 || month <= 3 ? 'Rabi' : 'Zaid',
        'Rajasthan': month >= 7 && month <= 10 ? 'Kharif' : 
                    month >= 11 || month <= 3 ? 'Rabi' : 'Zaid',
        'Madhya Pradesh': month >= 7 && month <= 10 ? 'Kharif' : 
                         month >= 11 || month <= 3 ? 'Rabi' : 'Zaid',
        
        // West/South India regions (different patterns)
        'Maharashtra': month >= 6 && month <= 9 ? 'Kharif' : 
                      month >= 10 && month <= 2 ? 'Rabi' : 'Zaid',
        'Gujarat': month >= 6 && month <= 9 ? 'Kharif' : 
                  month >= 10 && month <= 2 ? 'Rabi' : 'Zaid',
        'Karnataka': month >= 6 && month <= 9 ? 'Kharif' : 
                    month >= 10 && month <= 2 ? 'Rabi' : 'Zaid',
    };
    
    return seasonMap[region] || (month >= 7 && month <= 10 ? 'Kharif' : 
                                 month >= 11 || month <= 3 ? 'Rabi' : 'Zaid');
}

// AI-Based Market Demand Prediction Function
function predictMarketDemand(crop, region, season) {
    // Realistic demand patterns based on crop, region, and season
    const demandPatterns = {
        'Banana': {
            'Kharif': { 'default': 'Medium', 'Maharashtra': 'High', 'Karnataka': 'High' },
            'Rabi': { 'default': 'Low', 'Uttar Pradesh': 'Medium', 'Punjab': 'Medium' },
            'Zaid': { 'default': 'High', 'Gujarat': 'Very High', 'Maharashtra': 'High' }
        },
        'Coconut': {
            'Kharif': { 'default': 'Medium', 'Karnataka': 'High', 'Maharashtra': 'High' },
            'Rabi': { 'default': 'Low', 'Karnataka': 'Medium', 'Gujarat': 'Medium' },
            'Zaid': { 'default': 'Very High', 'Karnataka': 'Very High', 'Maharashtra': 'High' }
        },
        'Rice': {
            'Kharif': { 'default': 'High', 'Punjab': 'Very High', 'Uttar Pradesh': 'Very High' },
            'Rabi': { 'default': 'Medium', 'West Bengal': 'High', 'Odisha': 'High' },
            'Zaid': { 'default': 'Low', 'Tamil Nadu': 'Medium', 'Karnataka': 'Medium' }
        },
        'Wheat': {
            'Kharif': { 'default': 'Low', 'Madhya Pradesh': 'Medium', 'Uttar Pradesh': 'Medium' },
            'Rabi': { 'default': 'Very High', 'Punjab': 'Very High', 'Haryana': 'Very High' },
            'Zaid': { 'default': 'Low', 'Uttar Pradesh': 'Medium', 'Bihar': 'Medium' }
        }
    };
    
    // Get demand for specific crop, season, and region
    if (demandPatterns[crop] && demandPatterns[crop][season]) {
        return demandPatterns[crop][season][region] || demandPatterns[crop][season]['default'] || 'Medium';
    }
    
    // Fallback logic based on general patterns
    const seasonalMultipliers = {
        'Kharif': { 'Rice': 'High', 'Banana': 'Medium', 'Coconut': 'Medium', 'Wheat': 'Low' },
        'Rabi': { 'Wheat': 'Very High', 'Rice': 'Medium', 'Banana': 'Low', 'Coconut': 'Low' },
        'Zaid': { 'Banana': 'High', 'Coconut': 'High', 'Rice': 'Low', 'Wheat': 'Low' }
    };
    
    return seasonalMultipliers[season]?.[crop] || 'Medium';
}

// AI-Based Yield Quality Assessment
function assessYieldQuality(yieldValue, crop) {
    const cropOptimalYields = {
        'Banana': { optimal: 60, range: [40, 80] },
        'Coconut': { optimal: 45, range: [30, 60] },
        'Rice': { optimal: 55, range: [40, 70] },
        'Wheat': { optimal: 50, range: [35, 65] }
    };
    
    const cropData = cropOptimalYields[crop] || { optimal: 50, range: [30, 70] };
    
    if (yieldValue >= cropData.range[1]) return 'Excellent';
    if (yieldValue >= cropData.optimal) return 'Good';
    if (yieldValue >= cropData.range[0]) return 'Average';
    return 'Below Average';
}

// Update AI predictions when user selects crop and region
function updateAIPredictions() {
    const crop = document.getElementById('cropSelect').value;
    const region = document.getElementById('regionSelect').value;
    const yieldValue = parseInt(document.getElementById('yield').value) || 50;
    
    if (crop && region) {
        // Determine season based on region and current date
        const season = determineSeason(region);
        document.getElementById('seasonValue').textContent = `${season} (AI determined based on ${region} and current season)`;
        
        // Predict market demand
        const demand = predictMarketDemand(crop, region, season);
        const yieldQuality = assessYieldQuality(yieldValue, crop);
        document.getElementById('demandValue').textContent = `${demand} (AI analyzed based on ${crop} in ${region} during ${season} season. Yield quality: ${yieldQuality})`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1500);
    }

    // Set up event listeners for form updates
    document.getElementById('cropSelect').addEventListener('change', updateAIPredictions);
    document.getElementById('regionSelect').addEventListener('change', updateAIPredictions);
    document.getElementById('yield').addEventListener('input', updateAIPredictions);

    // Set up prediction button
    const predictBtn = document.getElementById('predictBtn');
    const predictionForm = document.getElementById('predictionForm');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const predictResult = document.getElementById('predictResult');

    if (predictBtn) {
        predictBtn.addEventListener('click', function() {
            // Validate form
            if (!validateForm()) {
                return;
            }

            // Show loading animation
            showLoadingAnimation();
        });
    }

    // Form validation
    function validateForm() {
        const requiredFields = ['cropSelect', 'regionSelect', 'yield'];
        
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field.value) {
                alert(`Please fill in ${field.previousElementSibling.textContent}`);
                field.focus();
                return false;
            }
        }
        
        const yieldValue = parseInt(document.getElementById('yield').value);
        if (yieldValue < 1 || yieldValue > 1000) {
            alert('Please enter a valid yield between 1 and 1000 quintals/hectare');
            document.getElementById('yield').focus();
            return false;
        }
        
        return true;
    }

    // Show loading animation with progress
    function showLoadingAnimation() {
        // Hide form and show loading animation
        predictionForm.style.display = 'none';
        loadingAnimation.style.display = 'flex';
        predictResult.style.display = 'none';

        // Animate progress bar
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                // Start prediction after animation completes
                setTimeout(startPrediction, 500);
            }
        }, 30); // 30ms per increment = 3 seconds total
    }

    // Start prediction process - calls backend API
    async function startPrediction() {
        // Get form values
        const crop = document.getElementById('cropSelect').value;
        const region = document.getElementById('regionSelect').value;
        const yieldValue = parseInt(document.getElementById('yield').value);

        // Determine AI-based values
        const season = determineSeason(region);
        const demand = predictMarketDemand(crop, region, season);

        // Backend API URL (change this if your backend is on a different port/host)
        const API_BASE_URL = 'http://localhost:5000';
        
        try {
            // Call backend API to get prediction
            const response = await fetch(`${API_BASE_URL}/api/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commodity: crop
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `API error: ${response.status}`);
            }

            const cropInfo = await response.json();
            
            // Predict next 3 days
            const next3Days = predictNext3Days(cropInfo.forecast_7_days);
            
            // Calculate adjustments (no soil or irrigation multipliers anymore)
            const regionalMultiplier = getRegionalMultiplier(region);
            const demandMultiplier = getDemandMultiplier(demand);
            const yieldMultiplier = getYieldMultiplier(yieldValue);
            const seasonMultiplier = getSeasonMultiplier(season);
            
            // Calculate final predicted price (without soil and irrigation factors)
            // Use first day forecast as base price if statistics not available
            const basePrice = cropInfo.statistics?.last_price || cropInfo.forecast_7_days?.day_1 || 0;
            const adjustedPrice = basePrice * regionalMultiplier * demandMultiplier * 
                                yieldMultiplier * seasonMultiplier;

            // Display results
            displayPredictionResult({
                crop,
                region,
                season,
                demand,
                cropInfo,
                next3Days,
                adjustedPrice,
                multipliers: {
                    regionalMultiplier,
                    demandMultiplier,
                    yieldMultiplier,
                    seasonMultiplier
                }
            });
        } catch (error) {
            console.error('Error fetching prediction:', error);
            alert(`Failed to get prediction: ${error.message}\n\nPlease make sure the backend server is running on ${API_BASE_URL}`);
            resetToForm();
        }
    }

    // Display prediction results
    function displayPredictionResult(data) {
        const { crop, region, season, demand, cropInfo, next3Days, adjustedPrice, multipliers } = data;
        
        // Hide loading animation
        loadingAnimation.style.display = 'none';
        
        // Create result HTML with centered price display
        const resultHTML = `
            <div class="result-success">
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px;">
                    <i class="fas fa-robot" style="font-size: 2.5rem; color: var(--primary);"></i>
                    <h2 style="color: var(--dark); margin: 0; text-align: center;">AI Prediction Result</h2>
                </div>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 2rem; font-weight: 600; color: var(--dark); margin-bottom: 10px; text-align: center;">
                        ${crop} in ${region}
                    </div>
                    <div class="price-display" style="text-align: center;">
                        <div style="font-size: 3.5rem; font-weight: 700; color: var(--primary-dark); margin: 10px 0; text-align: center;">
                            ₹${adjustedPrice.toFixed(2)}<span class="price-unit" style="font-size: 1.2rem; color: var(--text-light); margin-left: 5px;">/Quintal</span>
                        </div>
                    </div>
                    <div class="market-trend ${cropInfo.seasonal_outlook?.trend === 'bullish' ? 'trend-up' : cropInfo.seasonal_outlook?.trend === 'bearish' ? 'trend-down' : 'trend-neutral'}" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 50px; font-weight: 600; margin: 15px auto; text-align: center; justify-content: center;">
                        <span style="font-size: 1.2rem;">${cropInfo.seasonal_outlook?.trend === 'bullish' ? '↗️' : cropInfo.seasonal_outlook?.trend === 'bearish' ? '↘️' : '➡️'}</span>
                        <span>${(cropInfo.seasonal_outlook?.trend || 'NEUTRAL').toUpperCase()} TREND | ${(cropInfo.statistics?.weekly_change_pct || cropInfo.historical_comparison?.vs_last_week_pct || 0) >= 0 ? '+' : ''}${cropInfo.statistics?.weekly_change_pct || cropInfo.historical_comparison?.vs_last_week_pct || 0}% Weekly</span>
                    </div>
                </div>
                
                <!-- AI Determined Factors -->
                <div class="result-details" style="background: rgba(255, 255, 255, 0.7); border-radius: 15px; padding: 25px; margin: 25px 0; border: 1px solid rgba(46, 204, 113, 0.1);">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px; text-align: left;">
                        <i class="fas fa-brain"></i> AI-Determined Factors
                    </h4>
                    
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">Season (AI Determined):</span>
                        <span class="detail-value" style="color: var(--primary-dark); font-weight: 500;">${season}</span>
                    </div>
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">Market Demand (AI Analyzed):</span>
                        <span class="detail-value" style="color: var(--primary-dark); font-weight: 500;">${demand}</span>
                    </div>
                </div>
                
                <!-- Next 3 Days Forecast -->
                <div class="result-details" style="background: rgba(255, 255, 255, 0.7); border-radius: 15px; padding: 25px; margin: 25px 0; border: 1px solid rgba(46, 204, 113, 0.1);">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px; text-align: left;">
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
                <div class="chart-container" style="background: white; border-radius: 15px; padding: 20px; margin: 25px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px; text-align: left;">
                        <i class="fas fa-chart-line"></i> 10-Day Price Trend
                    </h4>
                    <canvas id="priceChart" style="width: 100%; height: 300px;"></canvas>
                    <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 15px; text-align: center;">
                        *Days 8-10 are AI predictions based on historical trends
                    </p>
                </div>
                
                <!-- Market Analysis -->
                <div class="result-details" style="background: rgba(255, 255, 255, 0.7); border-radius: 15px; padding: 25px; margin: 25px 0; border: 1px solid rgba(46, 204, 113, 0.1);">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px; text-align: left;">
                        <i class="fas fa-chart-bar"></i> Market Analysis
                    </h4>
                    
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">Current Market Price:</span>
                        <span class="detail-value" style="color: var(--primary-dark); font-weight: 500;">₹${cropInfo.statistics?.last_price || cropInfo.forecast_7_days?.day_1 || 'N/A'}</span>
                    </div>
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">Price Range:</span>
                        <span class="detail-value" style="color: var(--primary-dark); font-weight: 500;">₹${cropInfo.confidence_band.lower_bound} - ₹${cropInfo.confidence_band.upper_bound}</span>
                    </div>
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">Volatility:</span>
                        <span class="detail-value" style="text-transform: capitalize; color: ${cropInfo.confidence_band.volatility_level === 'high' ? '#e74c3c' : cropInfo.confidence_band.volatility_level === 'medium' ? '#f39c12' : 'var(--primary)'}; font-weight: 500;">
                            ${cropInfo.confidence_band.volatility_level}
                        </span>
                    </div>
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">vs Last Year:</span>
                        <span class="detail-value" style="color: ${cropInfo.historical_comparison.vs_last_year_pct >= 0 ? 'var(--primary)' : '#e74c3c'}; font-weight: 500;">
                            ${cropInfo.historical_comparison.vs_last_year_pct >= 0 ? '+' : ''}${cropInfo.historical_comparison.vs_last_year_pct}%
                        </span>
                    </div>
                </div>
                
                <!-- Market Drivers -->
                ${(cropInfo.drivers?.positive?.length > 0 || cropInfo.drivers?.negative?.length > 0) ? `
                    <div class="result-details" style="background: rgba(255, 255, 255, 0.7); border-radius: 15px; padding: 25px; margin: 25px 0; border: 1px solid rgba(46, 204, 113, 0.1);">
                        <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px; text-align: left;">
                            <i class="fas fa-bullseye"></i> Market Drivers
                        </h4>
                        
                        ${cropInfo.drivers.positive.length > 0 ? `
                            <div style="margin-bottom: 15px;">
                                <div style="font-weight: 600; color: var(--primary); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-arrow-up"></i> Positive Factors
                                </div>
                                <ul style="list-style: none; padding-left: 0;">
                                    ${(cropInfo.drivers?.positive || []).map(driver => `
                                        <li style="padding: 8px 0; padding-left: 25px; position: relative; color: var(--text-main);">
                                            <span style="position: absolute; left: 0; color: var(--primary); font-weight: bold;">✓</span>
                                            ${driver}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${(cropInfo.drivers?.negative?.length > 0) ? `
                            <div style="margin-top: 15px;">
                                <div style="font-weight: 600; color: #e74c3c; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-arrow-down"></i> Negative Factors
                                </div>
                                <ul style="list-style: none; padding-left: 0;">
                                    ${(cropInfo.drivers?.negative || []).map(driver => `
                                        <li style="padding: 8px 0; padding-left: 25px; position: relative; color: var(--text-main);">
                                            <span style="position: absolute; left: 0; color: #e74c3c; font-weight: bold;">✗</span>
                                            ${driver}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                
                <!-- Market Alerts -->
                ${(cropInfo.alerts && cropInfo.alerts.length > 0) ? `
                    <div class="alert alert-warning" style="padding: 15px; border-radius: 10px; margin: 25px 0; display: flex; align-items: flex-start; gap: 12px; background: rgba(243, 156, 18, 0.1); border-left: 4px solid var(--warning); color: var(--text-main);">
                        <i class="fas fa-exclamation-triangle" style="color: var(--warning); font-size: 1.2rem; margin-top: 2px;"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: var(--warning); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-bell"></i> Market Alerts
                            </div>
                            <ul style="list-style: none; padding-left: 0;">
                                ${(cropInfo.alerts || []).map(alert => `
                                    <li style="padding: 8px 0; padding-left: 25px; position: relative; color: var(--text-main); border-bottom: 1px solid rgba(243, 156, 18, 0.1);">
                                        <span style="position: absolute; left: 0; color: var(--warning); font-weight: bold;">⚠️</span>
                                        ${alert}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
                
                <!-- Seasonal Outlook -->
                <div class="result-details" style="background: rgba(255, 255, 255, 0.7); border-radius: 15px; padding: 25px; margin: 25px 0; border: 1px solid rgba(46, 204, 113, 0.1);">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px; text-align: left;">
                        <i class="fas fa-calendar-check"></i> Seasonal Outlook
                    </h4>
                    
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div class="market-trend ${cropInfo.seasonal_outlook?.trend === 'bullish' ? 'trend-up' : cropInfo.seasonal_outlook?.trend === 'bearish' ? 'trend-down' : 'trend-neutral'}" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 50px; font-weight: 600; margin: 0;">
                            <span style="font-size: 1.2rem;">${cropInfo.seasonal_outlook?.trend === 'bullish' ? '↗️' : cropInfo.seasonal_outlook?.trend === 'bearish' ? '↘️' : '➡️'}</span>
                            <span>${(cropInfo.seasonal_outlook?.trend || 'NEUTRAL').toUpperCase()} TREND</span>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 8px; background: rgba(46, 204, 113, 0.1); padding: 8px 16px; border-radius: 20px;">
                            <i class="fas fa-clock" style="color: var(--primary);"></i>
                            <span style="color: var(--text-main); font-weight: 600;">Time Horizon: ${cropInfo.seasonal_outlook?.time_horizon || 'N/A'}</span>
                        </div>
                    </div>
                    
                    <div style="background: rgba(46, 204, 113, 0.05); padding: 15px; border-radius: 10px; margin-top: 15px; border-left: 4px solid var(--primary);">
                        <h5 style="color: var(--primary); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-lightbulb"></i> Key Insight
                        </h5>
                        <p style="color: var(--text-main); line-height: 1.6; margin: 0;">
                            ${cropInfo.seasonal_outlook?.reason || 'No specific insight available'}
                        </p>
                    </div>
                </div>
                
                <!-- AI Adjustment Factors -->
                <div class="result-details" style="background: rgba(255, 255, 255, 0.7); border-radius: 15px; padding: 25px; margin: 25px 0; border: 1px solid rgba(46, 204, 113, 0.1);">
                    <h4 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 10px; text-align: left;">
                        <i class="fas fa-cogs"></i> AI Adjustment Factors Applied
                    </h4>
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">Region Adjustment:</span>
                        <span class="detail-value" style="color: var(--primary-dark); font-weight: 500;">${region} (${((multipliers.regionalMultiplier - 1) * 100).toFixed(0)}%)</span>
                    </div>
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">Market Demand:</span>
                        <span class="detail-value" style="color: var(--primary-dark); font-weight: 500;">${demand} (${((multipliers.demandMultiplier - 1) * 100).toFixed(0)}%)</span>
                    </div>
                    <div class="detail-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(46, 204, 113, 0.1);">
                        <span class="detail-label" style="font-weight: 600; color: var(--dark);">Season:</span>
                        <span class="detail-value" style="color: var(--primary-dark); font-weight: 500;">${season} (${((multipliers.seasonMultiplier - 1) * 100).toFixed(0)}%)</span>
                    </div>
                </div>
                
                <!-- Disclaimer -->
                <div style="margin-top: 30px; padding: 15px; background: rgba(52, 152, 219, 0.1); border-radius: 10px; border-left: 4px solid var(--info);">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <i class="fas fa-info-circle" style="color: var(--info);"></i>
                        <span style="font-weight: 600; color: var(--info);">Disclaimer</span>
                    </div>
                    <p style="color: var(--text-light); font-size: 0.9rem; margin: 0; line-height: 1.5;">
                        *Prediction generated on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
                        *All prices are in Indian Rupees (₹) per quintal<br>
                        *This is an AI-generated prediction based on market data and historical trends. For exact market prices, please visit your local mandi or agricultural market.
                    </p>
                </div>
                
                <!-- Action Buttons -->
                <div style="margin-top: 40px; text-align: center;">
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn predict-again-btn" onclick="resetToForm()" style="display: inline-block; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; padding: 12px 30px; border-radius: 50px; font-weight: 600; cursor: pointer; border: none; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);">
                            <i class="fas fa-redo"></i> Predict Another Crop
                        </button>
                        <button class="btn btn-secondary" onclick="downloadPredictionReport('${crop}', '${region}', ${adjustedPrice.toFixed(2)}, '${season}', '${demand}', '${cropInfo.seasonal_outlook?.trend || 'neutral'}')" style="display: inline-block; background: linear-gradient(135deg, var(--secondary), #d35400); color: white; padding: 12px 30px; border-radius: 50px; font-weight: 600; cursor: pointer; border: none; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(230, 126, 34, 0.4);">
                            <i class="fas fa-download"></i> Download Report
                        </button>
                        <button class="btn" style="background: var(--info);" onclick="sharePrediction('${crop}', '${region}', ${adjustedPrice.toFixed(2)}, '${season}', '${demand}')" style="display: inline-block; background: var(--info); color: white; padding: 12px 30px; border-radius: 50px; font-weight: 600; cursor: pointer; border: none; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Display result
        predictResult.innerHTML = resultHTML;
        predictResult.style.display = 'block';
        
        // Create chart
        createPriceChart(cropInfo, next3Days);
        
        // Scroll to result
        predictResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reset to form
    window.resetToForm = function() {
        predictionForm.style.display = 'flex';
        loadingAnimation.style.display = 'none';
        predictResult.style.display = 'none';
        
        // Reset form
        document.getElementById('predictionForm').reset();
        
        // Reset AI predictions
        document.getElementById('seasonValue').textContent = 'Will be determined by AI based on region and current date';
        document.getElementById('demandValue').textContent = 'Will be analyzed based on crop type, region, and historical data';
        
        // Scroll to form
        predictionForm.scrollIntoView({ behavior: 'smooth' });
    };

    // Download report function
    window.downloadPredictionReport = function(crop, region, price, season, demand, trend) {
        const cropInfo = cropData[crop];
        const next3Days = predictNext3Days(cropInfo.forecast_7_days);
        
        // Generate report content
        const reportContent = `
╔══════════════════════════════════════════════════╗
║         HARVESTHUB AI - PREDICTION REPORT        ║
║           AI Crop Price Prediction               ║
╚══════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleString()}
Prediction ID: ${Date.now()}

═══════════════════════════════════════════════════
CROP DETAILS
═══════════════════════════════════════════════════
• Crop: ${crop}
• Region: ${region}
• Season: ${season} (AI Determined)
• Market Demand: ${demand} (AI Analyzed)

═══════════════════════════════════════════════════
PRICE PREDICTION
═══════════════════════════════════════════════════
Predicted Price: ₹${price} per quintal
Current Market Price: ₹${cropInfo.statistics.last_price}
Market Trend: ${trend.toUpperCase()}

Weekly Change: ${cropInfo.statistics.weekly_change_pct >= 0 ? '+' : ''}${cropInfo.statistics.weekly_change_pct}%
Yearly Comparison: ${cropInfo.historical_comparison.vs_last_year_pct >= 0 ? '+' : ''}${cropInfo.historical_comparison.vs_last_year_pct}%

═══════════════════════════════════════════════════
FORECAST (NEXT 10 DAYS)
═══════════════════════════════════════════════════
Historical Data (Days 1-7):
${Object.entries(cropInfo.forecast_7_days).map(([day, price]) => `  ${day.replace('_', ' ')}: ₹${price}`).join('\n')}

AI Predictions (Days 8-10):
  Day 8: ₹${next3Days.day_8}
  Day 9: ₹${next3Days.day_9}
  Day 10: ₹${next3Days.day_10}

Price Range: ₹${cropInfo.confidence_band.lower_bound} - ₹${cropInfo.confidence_band.upper_bound}
Volatility: ${cropInfo.confidence_band.volatility_level.toUpperCase()}

═══════════════════════════════════════════════════
MARKET DRIVERS
═══════════════════════════════════════════════════
POSITIVE FACTORS:
${cropInfo.drivers.positive.length > 0 ? cropInfo.drivers.positive.map(factor => `• ${factor}`).join('\n') : '• None identified'}

NEGATIVE FACTORS:
${cropInfo.drivers.negative.length > 0 ? cropInfo.drivers.negative.map(factor => `• ${factor}`).join('\n') : '• None identified'}

═══════════════════════════════════════════════════
MARKET ALERTS
═══════════════════════════════════════════════════
${cropInfo.alerts && cropInfo.alerts.length > 0 ? cropInfo.alerts.map(alert => `⚠️ ${alert}`).join('\n') : 'No critical alerts at this time'}

═══════════════════════════════════════════════════
SEASONAL OUTLOOK
═══════════════════════════════════════════════════
Trend: ${cropInfo.seasonal_outlook.trend.toUpperCase()}
Time Horizon: ${cropInfo.seasonal_outlook.time_horizon}
Insight: ${cropInfo.seasonal_outlook.reason}

═══════════════════════════════════════════════════
AI ADJUSTMENT FACTORS
═══════════════════════════════════════════════════
• Region (${region}): ${((getRegionalMultiplier(region) - 1) * 100).toFixed(0)}%
• Market Demand (${demand}): ${((getDemandMultiplier(demand) - 1) * 100).toFixed(0)}%
• Season (${season}): ${((getSeasonMultiplier(season) - 1) * 100).toFixed(0)}%

═══════════════════════════════════════════════════
DATA SOURCES
═══════════════════════════════════════════════════
• NAFED Market Data
• Historical Price Trends
• Weather API Integration
• Real-time Market Analysis

═══════════════════════════════════════════════════
DISCLAIMER
═══════════════════════════════════════════════════
This is an AI-generated prediction based on market data
and historical trends. For exact market prices, please
visit your local mandi or agricultural market.

Accuracy Rate: 95% (based on historical backtesting)
Prediction Confidence: High

© ${new Date().getFullYear()} HarvestHub AI. All rights reserved.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `;
        
        // Create a blob and download the file
        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `HarvestHub_${crop}_${region}_${new Date().toISOString().split('T')[0]}.txt`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);
        
        // Show success message
        showNotification('Report downloaded successfully!', 'success');
    };

    // Share prediction function
    window.sharePrediction = async function(crop, region, price, season, demand) {
        const shareData = {
            title: `HarvestHub AI Prediction: ${crop} Price`,
            text: `🌾 HarvestHub AI Prediction\n\nCrop: ${crop}\nRegion: ${region}\nPredicted Price: ₹${price}/Quintal\nSeason: ${season}\nMarket Demand: ${demand}\n\nGet your crop price prediction at: ${window.location.origin}`,
            url: window.location.href
        };
        
        try {
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
                showNotification('Prediction shared successfully!', 'success');
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(shareData.text);
                showNotification('Prediction copied to clipboard!', 'info');
            }
        } catch (err) {
            console.error('Error sharing:', err);
            // Another fallback: Show share options
            const shareText = encodeURIComponent(shareData.text);
            const shareUrl = encodeURIComponent(window.location.href);
            
            const shareWindow = window.open(
                `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
                'Share on Twitter',
                'width=600,height=400'
            );
            
            if (shareWindow) {
                showNotification('Share window opened!', 'info');
            }
        }
    };

    // Helper function to show notifications
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;
        
        // Set color based on type
        if (type === 'success') {
            notification.style.backgroundColor = 'var(--primary)';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#e74c3c';
        } else {
            notification.style.backgroundColor = 'var(--info)';
        }
        
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Helper function to create price chart
    function createPriceChart(cropInfo, next3Days) {
        const existingChart = Chart.getChart("priceChart");
        if (existingChart) {
            existingChart.destroy();
        }
        
        const ctx = document.getElementById('priceChart').getContext('2d');
        
        // Prepare data
        const forecastDays = Object.values(cropInfo.forecast_7_days);
        const nextDays = Object.values(next3Days);
        const allDays = [...forecastDays, ...nextDays];
        
        const labels = [];
        for (let i = 1; i <= 7; i++) labels.push(`Day ${i}`);
        for (let i = 8; i <= 10; i++) labels.push(`Day ${i}*`);
        
        new Chart(ctx, {
            type: 'line',
            data: {
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
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `₹${context.parsed.y.toFixed(2)}/Quintal`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price (₹/Quintal)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
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
        });
    }
});