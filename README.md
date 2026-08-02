# MindPulse - Student Mental Health & Habit Predictor 🧠📊

MindPulse is a machine learning web application designed to analyze student lifestyle habits—such as social media usage, phone unlocks, sleep patterns, physical activity, and academic stress—and predict their overall mental health impact score.

The system features a **FastAPI backend** powered by a pre-trained **Scikit-Learn Random Forest Regressor pipeline** alongside an interactive, modern **web dashboard**.

---

## 🌟 Key Features

- **Interactive Web Interface**: Sleek, responsive dark-mode dashboard built with HTML5, CSS3, and JavaScript.
- **Real-Time Prediction**: Instant scoring against the trained ML pipeline (`POST /predict`).
- **Visual Impact Breakdown**: Displays score progress, risk classification (Low, Moderate, Elevated, High Risk), and specific factor flags (Screen Burden, Sleep Quality, Activity Level, Stress).
- **Personalized Recommendations**: Dynamic action steps tailored to each student's habits to help reduce digital fatigue and burnout.
- **One-Click Presets**: Pre-configured profiles ("High Digital Strain", "Balanced Lifestyle", "Academic Crunch") for quick testing.

---

## 🔬 Machine Learning Architecture

The model was trained on a dataset of **5,000 student records** (`Student Social Media And Mental Health Impact.csv`) assessing digital consumption and personal wellbeing.

### Feature Pipeline
The pipeline handles feature transformations seamlessly:
1. **Log Transformation & Standard Scaling**: Applied to skewed numeric features like `Study_Hours`.
2. **Standard Scaling**: Applied to continuous numerical inputs (`Age`, `Avg_Daily_Usage_Hours`, `Daily_Unlocks`, `Physical_Activity_Hours`, `Sleep_Hours_Per_Night`).
3. **Ordinal Encoding**: Encodes ordered levels for `Stress_Level` (`Low`, `Medium`, `High`, `Very High`).
4. **One-Hot Encoding**: One-hot encodes nominal categorical variables (`Gender`, `Academic_Level`, `Most_Used_Platform`, `Purpose_Of_Use`, `Grouped_Countries`).

### Model Comparison & Performance Metrics

| Model | Testing $R^2$ | Training $R^2$ | MAE | RMSE |
| :--- | :---: | :---: | :---: | :---: |
| Linear Regression | 0.7398 | 0.7237 | 0.5362 | 0.6760 |
| **Random Forest Regressor (Tuned)** | **0.8641** | **0.9551** | **0.3684** | **0.4885** |

---

## 📂 Project Structure

```text
Mental Health Prediction - Project/
├── index.html                               # Web application HTML structure
├── style.css                                # Dashboard CSS design system
├── app.js                                   # Frontend event logic & API fetch handler
├── main.py                                  # FastAPI application & model prediction route
├── Mental_Health_Prediction.pkl             # Serialized Scikit-Learn Pipeline
├── Mental_Health_Prediction.ipynb           # Model training & EDA Jupyter Notebook
├── Student Social Media And Mental Health Impact.csv # Dataset
├── requirements.txt                         # Python package dependencies
├── README.md                                # Project documentation
└── .gitignore                               # Ignored git files
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.9+
- Web browser (Chrome, Safari, Firefox, Edge)

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/balledasivavaraprasad-create/Mental_Health_Prediction.git
cd Mental_Health_Prediction
pip install -r requirements.txt
```

### 2. Start the Backend API
Run the FastAPI server using Uvicorn:
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The API will be live at `http://127.0.0.1:8000`. You can inspect the Swagger API docs at `http://127.0.0.1:8000/docs`.

### 3. Launch the Web Frontend
Open `index.html` directly in your browser or run a simple local web server:
```bash
python3 -m http.server 8080
```
Navigate to `http://127.0.0.1:8080` in your web browser.

---

## 📡 API Endpoint Reference

### `POST /predict`

**Request Headers:** `Content-Type: application/json`

**Sample Request Body:**
```json
{
  "Age": 21,
  "Gender": "Female",
  "Country": "India",
  "Academic_Level": "Undergraduate",
  "Most_Used_Platform": "Instagram",
  "Purpose_Of_Use": "Entertainment",
  "Avg_Daily_Usage_Hours": 5.5,
  "Daily_Unlocks": 85,
  "Study_Hours": 4.0,
  "Physical_Activity_Hours": 1.0,
  "Sleep_Hours_Per_Night": 6.5,
  "Stress_Level": "High"
}
```

**Sample Response:**
```json
{
  "predicted_mental_health_score": 5.74,
  "risk_level": "Moderate Risk",
  "status": "success"
}
```

---

## 📄 License
This project is open-source under the MIT License.
