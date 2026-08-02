document.addEventListener('DOMContentLoaded', () => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const customBackend = localStorage.getItem('CUSTOM_API_URL');
    const BACKEND_BASE = customBackend || (isLocal ? 'http://127.0.0.1:8000' : 'https://mental-health-prediction-api.onrender.com');
    const API_URL = `${BACKEND_BASE.replace(/\/$/, '')}/predict`;
    const HEALTH_CHECK_URL = `${BACKEND_BASE.replace(/\/$/, '')}/`;

    const form = document.getElementById('prediction-form');
    const btnSubmit = document.getElementById('btn-submit');
    const btnText = btnSubmit.querySelector('.btn-text');
    const btnSpinner = btnSubmit.querySelector('.btn-spinner');
    
    const resultsPlaceholder = document.getElementById('results-placeholder');
    const resultsDisplay = document.getElementById('results-display');
    const scoreVal = document.getElementById('score-val');
    const riskBadge = document.getElementById('risk-badge');
    const meterFill = document.getElementById('meter-fill');

    const descScreen = document.getElementById('desc-screen');
    const descSleep = document.getElementById('desc-sleep');
    const descActivity = document.getElementById('desc-activity');
    const descStress = document.getElementById('desc-stress');
    const recommendationsList = document.getElementById('recommendations-list');
    const apiStatusText = document.getElementById('api-status-text');

    const presets = {
        heavy: {
            Age: 20,
            Gender: 'Female',
            Country: 'USA',
            Academic_Level: 'Undergraduate',
            Most_Used_Platform: 'TikTok',
            Purpose_Of_Use: 'Entertainment',
            Avg_Daily_Usage_Hours: 9.5,
            Daily_Unlocks: 140,
            Study_Hours: 2.5,
            Physical_Activity_Hours: 0.5,
            Sleep_Hours_Per_Night: 5.0,
            Stress_Level: 'Very High'
        },
        balanced: {
            Age: 22,
            Gender: 'Male',
            Country: 'Canada',
            Academic_Level: 'Undergraduate',
            Most_Used_Platform: 'LinkedIn',
            Purpose_Of_Use: 'Networking',
            Avg_Daily_Usage_Hours: 2.5,
            Daily_Unlocks: 45,
            Study_Hours: 6.0,
            Physical_Activity_Hours: 2.0,
            Sleep_Hours_Per_Night: 8.0,
            Stress_Level: 'Low'
        },
        academic: {
            Age: 23,
            Gender: 'Female',
            Country: 'India',
            Academic_Level: 'Graduate',
            Most_Used_Platform: 'YouTube',
            Purpose_Of_Use: 'Education',
            Avg_Daily_Usage_Hours: 4.5,
            Daily_Unlocks: 70,
            Study_Hours: 9.5,
            Physical_Activity_Hours: 1.0,
            Sleep_Hours_Per_Night: 6.0,
            Stress_Level: 'High'
        }
    };

    const sliders = [
        { input: 'Avg_Daily_Usage_Hours', label: 'usage-val' },
        { input: 'Study_Hours', label: 'study-val' },
        { input: 'Physical_Activity_Hours', label: 'physical-val' },
        { input: 'Sleep_Hours_Per_Night', label: 'sleep-val' }
    ];

    sliders.forEach(({ input, label }) => {
        const inputElem = document.getElementById(input);
        const labelElem = document.getElementById(label);
        if (inputElem && labelElem) {
            inputElem.addEventListener('input', (e) => {
                labelElem.textContent = parseFloat(e.target.value).toFixed(1);
            });
        }
    });

    document.querySelectorAll('.btn-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-preset');
            if (presets[key]) {
                applyPreset(presets[key]);
            }
        });
    });

    function applyPreset(data) {
        Object.keys(data).forEach(field => {
            const elem = document.getElementById(field);
            if (elem) {
                elem.value = data[field];
                elem.dispatchEvent(new Event('input'));
            }
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = {
            Age: parseInt(document.getElementById('Age').value, 10),
            Gender: document.getElementById('Gender').value,
            Country: document.getElementById('Country').value,
            Academic_Level: document.getElementById('Academic_Level').value,
            Most_Used_Platform: document.getElementById('Most_Used_Platform').value,
            Purpose_Of_Use: document.getElementById('Purpose_Of_Use').value,
            Avg_Daily_Usage_Hours: parseFloat(document.getElementById('Avg_Daily_Usage_Hours').value),
            Daily_Unlocks: parseInt(document.getElementById('Daily_Unlocks').value, 10),
            Study_Hours: parseFloat(document.getElementById('Study_Hours').value),
            Physical_Activity_Hours: parseFloat(document.getElementById('Physical_Activity_Hours').value),
            Sleep_Hours_Per_Night: parseFloat(document.getElementById('Sleep_Hours_Per_Night').value),
            Stress_Level: document.getElementById('Stress_Level').value
        };

        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Failed to generate prediction');
            }

            const data = await response.json();
            renderResults(data, payload);
        } catch (error) {
            console.warn("API Error, utilizing local fallback predictor for demo:", error);
            const fallbackScore = calculateLocalFallbackScore(payload);
            renderResults({
                predicted_mental_health_score: fallbackScore,
                risk_level: getRiskLabel(fallbackScore)
            }, payload);
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        if (isLoading) {
            btnText.textContent = "Analyzing Habits...";
            btnSpinner.classList.remove('hidden');
            btnSubmit.disabled = true;
        } else {
            btnText.textContent = "Generate Prediction";
            btnSpinner.classList.add('hidden');
            btnSubmit.disabled = false;
        }
    }

    function renderResults(result, payload) {
        const score = result.predicted_mental_health_score;
        const risk = result.risk_level || getRiskLabel(score);

        resultsPlaceholder.classList.add('hidden');
        resultsDisplay.classList.remove('hidden');

        animateValue(scoreVal, 0, score, 600);

        riskBadge.textContent = risk;
        riskBadge.className = 'risk-badge ' + getRiskClass(score);

        const percentage = Math.min(Math.max(((score - 1.0) / 9.0) * 100, 0), 100);
        meterFill.style.width = `${percentage}%`;

        descScreen.textContent = payload.Avg_Daily_Usage_Hours > 7 ? 'High Burden' : payload.Avg_Daily_Usage_Hours > 4 ? 'Moderate' : 'Low Burden';
        descSleep.textContent = payload.Sleep_Hours_Per_Night < 6 ? 'Deficient' : payload.Sleep_Hours_Per_Night > 7 ? 'Healthy' : 'Fair';
        descActivity.textContent = payload.Physical_Activity_Hours < 0.8 ? 'Low' : payload.Physical_Activity_Hours > 2 ? 'Active' : 'Moderate';
        descStress.textContent = payload.Stress_Level;

        generateRecommendations(payload, score);
    }

    function animateValue(elem, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = (progress * (end - start) + start).toFixed(2);
            elem.textContent = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function getRiskLabel(score) {
        if (score < 5.0) return "Low Risk";
        if (score < 6.5) return "Moderate Risk";
        if (score < 7.5) return "Elevated Risk";
        return "High Risk";
    }

    function getRiskClass(score) {
        if (score < 5.0) return "risk-low";
        if (score < 6.5) return "risk-moderate";
        if (score < 7.5) return "risk-elevated";
        return "risk-high";
    }

    function generateRecommendations(payload, score) {
        const tips = [];

        if (payload.Avg_Daily_Usage_Hours > 5.0) {
            tips.push(`Reduce screen time on ${payload.Most_Used_Platform} from ${payload.Avg_Daily_Usage_Hours}h down to < 3h per day to reduce fatigue.`);
        }
        if (payload.Sleep_Hours_Per_Night < 7.0) {
            tips.push(`Increase nightly sleep by at least ${(7.0 - payload.Sleep_Hours_Per_Night).toFixed(1)} hours for optimal recovery.`);
        }
        if (payload.Physical_Activity_Hours < 1.5) {
            tips.push("Incorporate 30 minutes of light exercise or walking to relieve tension.");
        }
        if (payload.Daily_Unlocks > 80) {
            tips.push("Enable app notification limits to minimize frequent context switching throughout the day.");
        }
        if (tips.length === 0 || score < 5.0) {
            tips.push("Great job! Your current digital habits and daily sleep balance support healthy wellbeing.");
            tips.push("Maintain your current physical activity and structured study routine.");
        }

        recommendationsList.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
    }

    function calculateLocalFallbackScore(payload) {
        let base = 5.0;
        base += (payload.Avg_Daily_Usage_Hours - 4.0) * 0.25;
        base += (7.0 - payload.Sleep_Hours_Per_Night) * 0.3;
        base -= (payload.Physical_Activity_Hours - 1.0) * 0.2;
        if (payload.Stress_Level === 'High') base += 0.8;
        if (payload.Stress_Level === 'Very High') base += 1.5;
        if (payload.Stress_Level === 'Low') base -= 0.5;
        return Math.min(Math.max(parseFloat(base.toFixed(2)), 1.0), 10.0);
    }
});
