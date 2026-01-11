// HarvestHub AI - Settings and Language Management

// Available languages with translations
const translations = {
    en: {
        // Navigation
        "home": "Home",
        "predict": "Predict Price",
        "benefits": "Benefits",
        "how-it-works": "How It Works",
        "predict-now": "Predict Now",
        "back-home": "Back to Home",
        
        // Hero Section
        "hero-title": "AI-Powered Crop Price Prediction",
        "hero-subtitle": "Get accurate market price forecasts for your crops using advanced AI algorithms and real-time market data. Plan your harvest and maximize profits.",
        "predict-crop-price": "Predict Crop Price",
        "learn-more": "Learn More",
        
        // Predictor Page
        "ai-predictor": "AI Crop Price Predictor",
        "ai-predictor-sub": "Get accurate market price predictions using real-time data and machine learning algorithms",
        "select-crop": "Select Crop",
        "select-crop-option": "-- Choose Crop --",
        "select-region": "Region / District",
        "select-region-option": "-- Select Region --",
        "expected-yield": "Expected Yield (Quintal/Hectare)",
        "yield-placeholder": "e.g., 50",
        "season-label": "Season (AI Determined)",
        "season-text": "Will be determined by AI based on region and current date",
        "demand-label": "Market Demand (AI Analyzed)",
        "demand-text": "Will be analyzed based on crop type, region, and historical data",
        
        // Benefits
        "why-use": "Why Use Our AI Predictor?",
        "why-use-sub": "Get accurate insights to make informed decisions about your crops",
        "prediction-accuracy": "Prediction Accuracy",
        "real-time-data": "Real-time Market Data",
        "data-points": "Data Points Analyzed",
        "successful-predictions": "Successful Predictions",
        "ai-powered": "AI-Powered",
        "ai-powered-desc": "Advanced machine learning algorithms analyze multiple market factors.",
        "future-forecast": "Future Forecast",
        "future-forecast-desc": "Predict prices for next 3 days based on historical trends.",
        "regional-analysis": "Regional Analysis",
        "regional-analysis-desc": "Get location-specific price adjustments and insights.",
        "market-alerts": "Market Alerts",
        "market-alerts-desc": "Receive alerts about price volatility and market changes.",
        
        // How it works
        "how-works": "How Our AI Predictor Works",
        "step1-title": "Select Crop & Region",
        "step1-desc": "Choose your crop and farming region for accurate predictions.",
        "step2-title": "Input Farming Details",
        "step2-desc": "Provide soil type, irrigation method, and expected yield.",
        "step3-title": "AI Analysis",
        "step3-desc": "Our algorithms analyze market data and historical trends.",
        "step4-title": "Get Predictions",
        "step4-desc": "Receive accurate price forecasts for next 3 days.",
        
        // Footer
        "footer-tagline": "Empowering farmers with AI-powered price predictions and market insights.",
        "farmer-support": "Farmer Support",
        "data-sources": "Data Sources",
        "nafed-market": "NAFED Market Data",
        "weather-api": "Weather API",
        "historical-trends": "Historical Trends",
        
        // Settings
        "settings": "Settings",
        "theme": "Theme",
        "language": "Language",
        "light": "Light",
        "dark": "Dark",
        "apply": "Apply",
        "about": "About",
        
        // Prediction Results
        "ai-prediction-result": "AI Prediction Result",
        "next-3-days": "Next 3 Days Forecast",
        "tomorrow": "Tomorrow",
        "day-plus2": "Day +2",
        "day-plus3": "Day +3",
        "price-trend": "10-Day Price Trend",
        "market-analysis": "Market Analysis",
        "current-market-price": "Current Market Price",
        "price-range": "Price Range",
        "volatility": "Volatility",
        "vs-last-year": "vs Last Year",
        "market-drivers": "Market Drivers",
        "positive-factors": "Positive Factors",
        "negative-factors": "Negative Factors",
        "seasonal-outlook": "Seasonal Outlook",
        "key-insight": "Key Insight",
        "ai-factors": "AI Adjustment Factors Applied",
        "region-adjustment": "Region Adjustment",
        "market-demand": "Market Demand",
        "season": "Season",
        "disclaimer": "Disclaimer",
        "predict-another": "Predict Another Crop",
        "download-report": "Download Report",
        "share": "Share"
    },
    
    hi: { // Hindi
        "home": "होम",
        "predict": "मूल्य भविष्यवाणी",
        "benefits": "लाभ",
        "how-it-works": "कैसे काम करता है",
        "predict-now": "अभी भविष्यवाणी करें",
        "back-home": "होम पर वापस",
        "hero-title": "एआई-संचालित फसल मूल्य भविष्यवाणी",
        "hero-subtitle": "उन्नत एआई एल्गोरिदम और रीयल-टाइम बाजार डेटा का उपयोग करके अपनी फसलों के लिए सटीक बाजार मूल्य पूर्वानुमान प्राप्त करें। अपनी कटाई की योजना बनाएं और मुनाफा बढ़ाएं।",
        "predict-crop-price": "फसल मूल्य भविष्यवाणी",
        "learn-more": "और जानें"
    },
    
    bn: { // Bengali
        "home": "হোম",
        "predict": "মূল্য ভবিষ্যদ্বাণী",
        "benefits": "সুবিধা",
        "how-it-works": "কিভাবে কাজ করে",
        "predict-now": "এখনই ভবিষ্যদ্বাণী করুন",
        "back-home": "হোমে ফিরুন",
        "hero-title": "এআই-চালিত ফসলের মূল্য ভবিষ্যদ্বাণী",
        "hero-subtitle": "উন্নত এআই অ্যালগরিদম এবং রিয়েল-টাইম মার্কেট ডেটা ব্যবহার করে আপনার ফসলের জন্য সঠিক বাজার মূল্যের পূর্বাভাস পান। আপনার ফসল কাটার পরিকল্পনা করুন এবং লাভ সর্বাধিক করুন।"
    },
    
    te: { // Telugu
        "home": "హోమ్",
        "predict": "ధర ఊహించు",
        "benefits": "ప్రయోజనాలు",
        "how-it-works": "ఎలా పని చేస్తుంది",
        "predict-now": "ఇప్పుడే ఊహించండి",
        "back-home": "హోమ్‌కి తిరిగి వెళ్ళండి",
        "hero-title": "AI-పవర్డ్ పంట ధర ఊహించడం",
        "hero-subtitle": "అధునాతన AI అల్గోరిథంలు మరియు నిజ సమయ మార్కెట్ డేటాను ఉపయోగించి మీ పంటల కోసం ఖచ్చితమైన మార్కెట్ ధర ముందస్తు సమాచారాన్ని పొందండి. మీ పంటను ప్లాన్ చేసుకోండి మరియు లాభాలను గరిష్టం చేయండి."
    },
    
    mr: { // Marathi
        "home": "होम",
        "predict": "किंमत अंदाज",
        "benefits": "फायदे",
        "how-it-works": "कसे काम करते",
        "predict-now": "आत्ताच अंदाज करा",
        "back-home": "होमवर परत जा",
        "hero-title": "AI-चालित पीक किंमत अंदाज",
        "hero-subtitle": "प्रगत AI अल्गोरिदम आणि रिअल-टाइम मार्केट डेटा वापरून तुमच्या पिकांसाठी अचूक बाजारभावाचा अंदाज मिळवा. तुमची कापणीची योजना करा आणि नफा वाढवा."
    },
    
    ta: { // Tamil
        "home": "முகப்பு",
        "predict": "விலை கணிப்பு",
        "benefits": "நன்மைகள்",
        "how-it-works": "எவ்வாறு செயல்படுகிறது",
        "predict-now": "இப்போது கணிக்கவும்",
        "back-home": "முகப்பிற்கு திரும்பு",
        "hero-title": "AI-இயக்கப்படும் பயிர் விலை கணிப்பு",
        "hero-subtitle": "மேம்பட்ட AI அல்காரிதங்கள் மற்றும் நிகழ்நேர சந்தைத் தரவுகளைப் பயன்படுத்தி உங்கள் பயிர்களுக்கான துல்லியமான சந்தை விலை முன்னறிவிப்புகளைப் பெறுங்கள். உங்கள் அறுவடையைத் திட்டமிடுங்கள் மற்றும் லாபத்தை அதிகரிக்கவும்."
    },
    
    gu: { // Gujarati
        "home": "હોમ",
        "predict": "કિંમતનો અંદાજ",
        "benefits": "ફાયદા",
        "how-it-works": "કેવી રીતે કામ કરે છે",
        "predict-now": "હમણાં અંદાજ કરો",
        "back-home": "હોમ પર પાછા જાઓ",
        "hero-title": "AI-ચાલિત પાક કિંમત અંદાજ",
        "hero-subtitle": "અદ્યતન AI એલ્ગોરિધમ્સ અને રીઅલ-ટાઇમ માર્કેટ ડેટાનો ઉપયોગ કરીને તમારા પાક માટે સચોટ માર્કેટ કિંમતની આગાહીઓ મેળવો. તમારી કાપણીની યોજના બનાવો અને નફો વધારવો."
    },
    
    kn: { // Kannada
        "home": "ಹೋಮ್",
        "predict": "ಬೆಲೆ ಊಹಿಸಿ",
        "benefits": "ಲಾಭಗಳು",
        "how-it-works": "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
        "predict-now": "ಈಗಲೇ ಊಹಿಸಿ",
        "back-home": "ಹೋಮ್‌ಗೆ ಹಿಂತಿರುಗಿ",
        "hero-title": "AI-ಶಕ್ತಿಯುತ ಬೆಳೆ ಬೆಲೆ ಊಹೆ",
        "hero-subtitle": "ಸುಧಾರಿತ AI ಅಲ್ಗಾರಿದಮ್ಗಳು ಮತ್ತು ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಡೇಟಾವನ್ನು ಬಳಸಿಕೊಂಡು ನಿಮ್ಮ ಬೆಳೆಗಳಿಗಾಗಿ ನಿಖರವಾದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಪಡೆಯಿರಿ. ನಿಮ್ಮ ಕಟಾವನ್ನು ಯೋಜಿಸಿ ಮತ್ತು ಲಾಭವನ್ನು ಹೆಚ್ಚಿಸಿಕೊಳ್ಳಿ."
    },
    
    ml: { // Malayalam
        "home": "ഹോം",
        "predict": "വില പ്രവചിക്കുക",
        "benefits": "പ്രയോജനങ്ങൾ",
        "how-it-works": "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
        "predict-now": "ഇപ്പോൾ പ്രവചിക്കുക",
        "back-home": "ഹോമിലേക്ക് മടങ്ങുക",
        "hero-title": "AI-പവർ ചെയ്ത വിള വില പ്രവചനം",
        "hero-subtitle": "നൂതനമായ AI അൽഗോരിതങ്ങളും റിയൽ-ടൈം മാർക്കറ്റ് ഡാറ്റയും ഉപയോഗിച്ച് നിങ്ങളുടെ വിളകൾക്കായി കൃത്യമായ വിപണി വില പ്രവചനങ്ങൾ നേടുക. നിങ്ങളുടെ വിളവെടുപ്പ് ആസൂത്രണം ചെയ്യുകയും ലാഭം വർദ്ധിപ്പിക്കുകയും ചെയ്യുക."
    }
};

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
    initializeTheme();
    initializeLanguage();
});

// Initialize settings dropdown
function initializeSettings() {
    const settingsBtn = document.querySelector('.settings-btn');
    const settingsDropdown = document.querySelector('.settings-dropdown');
    
    if (settingsBtn && settingsDropdown) {
        // Toggle dropdown on button click
        settingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsDropdown.classList.toggle('show');
            
            // Add animation
            if (settingsDropdown.classList.contains('show')) {
                settingsDropdown.style.animation = 'fadeInDown 0.3s ease';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
                settingsDropdown.classList.remove('show');
            }
        });
        
        // Prevent dropdown close when clicking inside
        settingsDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Apply language button
    const applyLanguageBtn = document.getElementById('applyLanguage');
    if (applyLanguageBtn) {
        applyLanguageBtn.addEventListener('click', function() {
            const selectedLang = document.getElementById('languageSelect').value;
            applyLanguage(selectedLang);
            showNotification('Language changed successfully!', 'success');
        });
    }
}

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check saved theme preference
    const savedTheme = localStorage.getItem('harvesthub-theme') || 'light';
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
        applyTheme(savedTheme);
        
        // Add event listener for theme toggle
        themeToggle.addEventListener('change', function() {
            const theme = this.checked ? 'dark' : 'light';
            applyTheme(theme);
            localStorage.setItem('harvesthub-theme', theme);
            showNotification(`${theme === 'dark' ? 'Dark' : 'Light'} theme applied`, 'info');
        });
    }
}

function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    
    // Update meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.content = theme === 'dark' ? '#1a252f' : '#2ecc71';
    }
}

// Language Management
function initializeLanguage() {
    const savedLang = localStorage.getItem('harvesthub-language') || 'en';
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        // Set saved language
        languageSelect.value = savedLang;
        
        // Apply saved language on page load
        applyLanguage(savedLang);
        
        // Update language when selection changes
        languageSelect.addEventListener('change', function() {
            const lang = this.value;
            applyLanguage(lang);
            localStorage.setItem('harvesthub-language', lang);
        });
    }
}

function applyLanguage(langCode) {
    const lang = translations[langCode] || translations.en;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (lang[key]) {
            element.textContent = lang[key];
        }
    });
    
    // Update placeholders for inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (lang[key]) {
            element.placeholder = lang[key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = langCode;
    
    // Store language preference
    localStorage.setItem('harvesthub-language', langCode);
    
    // Update settings button text
    const settingsText = document.querySelector('.settings-text');
    if (settingsText && lang['settings']) {
        settingsText.textContent = lang['settings'];
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add show class after a small delay
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for global access
window.HarvestHubSettings = {
    changeTheme: function(theme) {
        applyTheme(theme);
        localStorage.setItem('harvesthub-theme', theme);
    },
    changeLanguage: function(langCode) {
        applyLanguage(langCode);
        localStorage.setItem('harvesthub-language', langCode);
    },
    getCurrentLanguage: function() {
        return localStorage.getItem('harvesthub-language') || 'en';
    },
    getCurrentTheme: function() {
        return localStorage.getItem('harvesthub-theme') || 'light';
    }
};