# Week 10 — Capstone Sprint 2: Model Building

**Phase:** Internship | **Duration:** ~8 hours (group work)  
**AI Policy:** ✅ AI-assisted. Every model decision must be justified.

---

## 🎯 Week Goal

By end of this week, each group will deliver:
1. At least 3 trained and evaluated models
2. A model comparison table (metrics side-by-side)
3. Hyperparameter tuning on the best model
4. A written "Model Decision" — why did you choose your final model?

> The goal is not the highest accuracy. The goal is to make a **defensible, documented decision**.

---

## 📋 Sprint 2 Structure

Every team follows this sequence regardless of project type:

```
Day 1: Prepare features + baseline model
Day 2: Try 3 different models
Day 3: Evaluate properly (beyond accuracy)
Day 4: Tune best model + feature importance
Day 5: Write model report + peer review
```

---

## 🏗️ Sprint 2 by Project

---

### Project 1 Teams — Sales Intelligence Dashboard

**Sprint 2 Goal:** Build a revenue trend forecaster

```python
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# Load your cleaned data from Sprint 1
df = pd.read_csv("superstore_clean.csv")
df["Order Date"] = pd.to_datetime(df["Order Date"])

# Aggregate to monthly revenue
monthly = df.groupby(["Year", "Month"]).agg(
    Revenue=("Sales", "sum"),
    Orders=("Order ID", "nunique"),
    Profit=("Profit", "sum")
).reset_index()

monthly["YearMonth"] = monthly["Year"] * 12 + monthly["Month"]
monthly = monthly.sort_values("YearMonth")

# Feature engineering for time series regression
monthly["lag_1"] = monthly["Revenue"].shift(1)  # Last month's revenue
monthly["lag_2"] = monthly["Revenue"].shift(2)  # 2 months ago
monthly["rolling_3"] = monthly["Revenue"].rolling(3).mean()  # 3-month average
monthly["month_sin"] = np.sin(2 * np.pi * monthly["Month"] / 12)  # Seasonality
monthly["month_cos"] = np.cos(2 * np.pi * monthly["Month"] / 12)

monthly_clean = monthly.dropna()

features = ["lag_1", "lag_2", "rolling_3", "month_sin", "month_cos", "Orders"]
X = monthly_clean[features]
y = monthly_clean["Revenue"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)  # Time series: no shuffle!

# Model comparison
models = {
    "Linear Regression": LinearRegression(),
    "Random Forest": RandomForestRegressor(n_estimators=100, random_state=42),
    "Gradient Boosting": GradientBoostingRegressor(n_estimators=100, random_state=42)
}

results = []
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    results.append({
        "Model": name,
        "RMSE": np.sqrt(mean_squared_error(y_test, y_pred)),
        "MAE": mean_absolute_error(y_test, y_pred),
        "R²": r2_score(y_test, y_pred)
    })

results_df = pd.DataFrame(results).round(2)
print(results_df)
```

```python
# Forecast next 3 months
best_model = models["Gradient Boosting"]  # or whichever won

# Generate forecast iteratively
def forecast_next_months(model, last_data, n_months=3):
    forecasts = []
    current = last_data.copy()
    
    for i in range(n_months):
        pred = model.predict([current])[0]
        forecasts.append(pred)
        # Slide the window forward
        current[0] = pred           # lag_1 becomes this prediction
        current[1] = current[0]     # lag_2 becomes old lag_1
        # etc.
    
    return forecasts

last_known = X_test.iloc[-1].values.copy()
predictions = forecast_next_months(best_model, last_known)

print("3-Month Revenue Forecast:")
for i, pred in enumerate(predictions, 1):
    print(f"Month +{i}: ₹{pred:,.0f}")
```

---

### Project 2 Teams — Sentiment Analyzer Tool

**Sprint 2 Goal:** Train and optimize a text classifier

```python
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Load your cleaned data from Sprint 1
df = pd.read_csv("reviews_clean.csv")
df = df.dropna(subset=["cleaned_text", "Sentiment"])

# For 3-class: Positive, Negative, Neutral
X = df["cleaned_text"]
y = df["Sentiment"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

print(f"Train: {len(X_train)}, Test: {len(X_test)}")
print(f"Class balance:\n{y_train.value_counts()}")
```

```python
# --- Model Comparison ---
pipelines = {
    "Logistic Regression": Pipeline([
        ("tfidf", TfidfVectorizer(max_features=5000, ngram_range=(1, 2), stop_words="english")),
        ("clf", LogisticRegression(max_iter=1000, class_weight="balanced"))
    ]),
    "Naive Bayes": Pipeline([
        ("tfidf", TfidfVectorizer(max_features=5000, ngram_range=(1, 2), stop_words="english")),
        ("clf", MultinomialNB())
    ]),
    "Linear SVM": Pipeline([
        ("tfidf", TfidfVectorizer(max_features=5000, ngram_range=(1, 2), stop_words="english")),
        ("clf", LinearSVC(class_weight="balanced", max_iter=2000))
    ]),
}

results = []
for name, pipeline in pipelines.items():
    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)
    
    from sklearn.metrics import accuracy_score, f1_score
    results.append({
        "Model": name,
        "Accuracy": accuracy_score(y_test, y_pred),
        "F1 (macro)": f1_score(y_test, y_pred, average="macro"),
        "F1 (weighted)": f1_score(y_test, y_pred, average="weighted"),
    })

results_df = pd.DataFrame(results).round(3)
print(results_df)
```

```python
# Best model — detailed evaluation
best_pipeline = pipelines["Linear SVM"]  # or whichever won
y_pred_best = best_pipeline.predict(X_test)

print(classification_report(y_test, y_pred_best))

# Confusion matrix
cm = confusion_matrix(y_test, y_pred_best)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=best_pipeline.classes_,
            yticklabels=best_pipeline.classes_)
plt.title("Confusion Matrix — Best Model")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()

# Live demo function
def predict_sentiment(text):
    prediction = best_pipeline.predict([text])[0]
    return prediction

# Test it
test_reviews = [
    "This is the most amazing product I have ever used!",
    "Absolute garbage. Broke within a week. Total waste.",
    "It's fine, does what it says. Nothing extraordinary.",
]
for review in test_reviews:
    print(f"{predict_sentiment(review):10} | {review}")
```

---

### Project 3 Teams — Student Performance Predictor

**Sprint 2 Goal:** Build a pass/fail classifier with interpretable results

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import classification_report, roc_auc_score, roc_curve
import matplotlib.pyplot as plt

# Load your encoded data from Sprint 1
df_encoded = pd.read_csv("students_encoded.csv")

# Features and target
drop_cols = ["passed", "G3", "G2", "G1"]  # Don't leak G3 or use G1/G2 directly without care
X = df_encoded.drop([col for col in drop_cols if col in df_encoded.columns], axis=1)
y = df_encoded["passed"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Scale
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

# Model comparison
models = {
    "Logistic Regression": LogisticRegression(random_state=42, max_iter=1000),
    "Decision Tree": DecisionTreeClassifier(max_depth=5, random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "Gradient Boosting": GradientBoostingClassifier(random_state=42),
}

results = []
for name, model in models.items():
    # Use cross-validation for reliable estimates
    cv_scores = cross_val_score(model, X_train_s, y_train, cv=5, scoring="f1")
    model.fit(X_train_s, y_train)
    y_pred = model.predict(X_test_s)
    y_prob = model.predict_proba(X_test_s)[:, 1] if hasattr(model, "predict_proba") else None
    
    from sklearn.metrics import accuracy_score, f1_score
    results.append({
        "Model": name,
        "CV F1 (mean)": cv_scores.mean(),
        "CV F1 (std)": cv_scores.std(),
        "Test Accuracy": accuracy_score(y_test, y_pred),
        "Test F1": f1_score(y_test, y_pred),
        "ROC-AUC": roc_auc_score(y_test, y_prob) if y_prob is not None else "-"
    })

print(pd.DataFrame(results).round(3))
```

```python
# Feature importance — for the school administrator report
best_model = models["Random Forest"]  # or your best
best_model.fit(X_train_s, y_train)

feature_imp = pd.DataFrame({
    "Feature": X.columns,
    "Importance": best_model.feature_importances_
}).sort_values("Importance", ascending=False).head(15)

plt.figure(figsize=(10, 6))
plt.barh(feature_imp["Feature"], feature_imp["Importance"], color="#7C3AED")
plt.title("Top 15 Features Predicting Student Pass/Fail")
plt.xlabel("Importance Score")
plt.gca().invert_yaxis()
plt.tight_layout()
plt.show()

# At-risk prediction demo
def predict_student_risk(student_features):
    """
    Given a student's features, predict pass/fail probability.
    """
    scaled = scaler.transform([student_features])
    prob = best_model.predict_proba(scaled)[0]
    return {
        "prediction": "PASS" if prob[1] > 0.5 else "AT RISK",
        "confidence": f"{max(prob)*100:.1f}%",
        "pass_probability": f"{prob[1]*100:.1f}%"
    }
```

---

## 📊 Model Decision Document

Each team writes this at the end of Sprint 2.

```markdown
# Model Decision Document — [Project Name]

## Models Evaluated
| Model | Key Metric | Notes |
|-------|-----------|-------|
| ...   | ...        | ...   |

## Chosen Model: [Name]
**Why:** [2–3 sentences — technical reason + business reason]

## What It Does Well
- ...

## Where It Falls Short
- ...

## Metric We Prioritized and Why
We prioritized [precision/recall/F1/RMSE] because...
[Connect to business context: e.g., "In fraud detection, missing a fraud case (low recall) 
is more costly than a false alarm (low precision)"]

## Next Steps to Improve
1. ...
2. ...
```

---

## 📝 Week 10 Deliverables

- [ ] `notebooks/02_model_[project_type].ipynb` — complete and running
- [ ] 3+ models trained and compared in a table
- [ ] Best model tuned with cross-validation
- [ ] Model Decision Document in `docs/model_decision.md`
- [ ] Demo function working (predict on new input)
- [ ] Code review of teammate's Sprint 1 notebook closed (Issue resolved)

---

## 💬 Reflection Prompt

> *"Your Random Forest has F1=0.86 and your Logistic Regression has F1=0.83. The LR model trains in 0.1 seconds and the RF takes 3 minutes. Which would you deploy? Does your answer change if you knew the model would run 10,000 times per day?"*

---

**Next week:** You add AI APIs and advanced prompt engineering to your capstone — this is what makes your project stand out.

---

*← [Week 9](./week-09.md) | [Programme Index](./index.md) | [Week 11 →](./week-11.md)*
