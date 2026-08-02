# Student Mental Health Prediction

This project is a machine learning web application built to predict a student's mental health impact score based on their daily screen time, social media habits, and lifestyle routines.

The goal of the project is to analyze how factors like daily phone unlocks, primary social media platform, sleep hours, physical activity, study time, and stress levels relate to overall student mental health.

---

## Tech Stack

- **Machine Learning & Data**: Python, Scikit-Learn, Pandas, Joblib, Jupyter Notebook
- **Backend API**: FastAPI, Uvicorn, Pydantic
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)

---

## Dataset & Feature Engineering

The model was trained on the `Student Social Media And Mental Health Impact.csv` dataset, which captures demographic details, digital usage metrics, and self-reported lifestyle indicators.

The feature preprocessing pipeline includes:
- **Numerical Features**: `Age`, `Avg_Daily_Usage_Hours`, `Daily_Unlocks`, `Physical_Activity_Hours`, and `Sleep_Hours_Per_Night` scaled using `StandardScaler`.
- **Skewed Features**: `Study_Hours` transformed using `log1p` prior to standard scaling.
- **Ordinal Features**: `Stress_Level` mapped ordinally (`Low`, `Medium`, `High`, `Very High`).
- **Categorical Features**: `Gender`, `Academic_Level`, `Most_Used_Platform`, `Purpose_Of_Use`, and `Grouped_Countries` encoded using `OneHotEncoder`.

---

## Machine Learning Model

- **Algorithm**: `RandomForestRegressor`
- **Pipeline**: Scikit-Learn `Pipeline` combined with a `ColumnTransformer` to handle feature transformation and model prediction in a single execution step.
- **Model Output**: Predicts a continuous mental health impact score (on a 1 to 10 scale).

The trained pipeline is serialized into `Mental_Health_Prediction.pkl` for fast inference in the API backend.

---

## Project Structure

```text
Mental_Health_Prediction/
├── main.py                                  # FastAPI backend handling model loading & API endpoints
├── Mental_Health_Prediction.pkl             # Serialized Scikit-Learn Pipeline
├── Mental_Health_Prediction.ipynb           # Notebook containing data cleaning, EDA & model training
├── Student Social Media And Mental Health Impact.csv # Dataset used for model training
├── requirements.txt                         # Python dependencies
└── frontend/                                # Web application interface
    ├── index.html                           # Main web page layout
    ├── style.css                            # Styling and responsive UI design
    └── app.js                               # Form submission, API requests & dynamic feedback logic
```

---

## How It Works

1. **User Input**: The web UI collects student details including demographics, platform preferences, daily usage, phone unlocks, sleep duration, study hours, physical activity, and stress level.
2. **Prediction Request**: The frontend sends a JSON payload to the FastAPI backend (`POST /predict`).
3. **Backend Processing**: FastAPI formats the incoming payload into a Pandas DataFrame, passes it through the loaded `RandomForestRegressor` pipeline, and computes the predicted score.
4. **Risk Categorization**: The backend maps the raw score into a risk level:
   - Below 5.0: Low Risk
   - 5.0 - 6.49: Moderate Risk
   - 6.5 - 7.49: Elevated Risk
   - 7.5 and above: High Risk
5. **Dynamic Feedback**: The UI displays the score with an animated counter, risk level indicator, and personalized habit suggestions based on the submitted data.

