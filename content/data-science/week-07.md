# Week 7 — ML in Practice + Capstone Project Kickoff

**Phase:** Internship | **Duration:** ~6 hours across the week  
**AI Policy:** ✅ AI is your collaborator. Use it daily. Document your prompts.

---

## 🎯 Week Goal

By end of this week, you will:
- Handle real-world ML challenges: imbalanced data, categorical encoding, pipelines
- Choose your capstone project and form your group
- Submit a complete Project Proposal Document (PPD)
- Understand what makes an internship-quality deliverable vs a student submission

> **This week you switch modes.** You are no longer doing exercises. You are doing work.

---

## 📖 Day 1 — Real-World ML Challenges

### Challenge 1: Handling Imbalanced Data

```python
import pandas as pd
import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Create imbalanced dataset (fraud detection scenario)
# 97% normal transactions, 3% fraud
X, y = make_classification(
    n_samples=5000,
    n_features=10,
    weights=[0.97, 0.03],  # 97/3 split
    random_state=42
)

print(f"Class distribution: {np.bincount(y)}")
# [4850, 150] — only 150 fraud cases!

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Naive model — what happens with default settings?
rf_naive = RandomForestClassifier(random_state=42)
rf_naive.fit(X_train, y_train)
y_pred_naive = rf_naive.predict(X_test)

print("\n=== Naive Model ===")
print(classification_report(y_test, y_pred_naive))
# High accuracy (say 97%) but terrible recall on fraud class — dangerous!
```

```python
# Solution 1: Class weights (tell the model fraud matters more)
rf_weighted = RandomForestClassifier(class_weight="balanced", random_state=42)
rf_weighted.fit(X_train, y_train)
y_pred_weighted = rf_weighted.predict(X_test)

print("=== Balanced Weights ===")
print(classification_report(y_test, y_pred_weighted))

# Solution 2: Oversample the minority class
from imblearn.over_sampling import SMOTE

try:
    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
    print(f"\nAfter SMOTE: {np.bincount(y_resampled)}")
    
    rf_smote = RandomForestClassifier(random_state=42)
    rf_smote.fit(X_resampled, y_resampled)
    y_pred_smote = rf_smote.predict(X_test)
    
    print("=== SMOTE Oversampling ===")
    print(classification_report(y_test, y_pred_smote))
except ImportError:
    print("Run: !pip install imbalanced-learn")
```

### Challenge 2: Encoding Categorical Data

```python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Sample HR data
hr_data = pd.DataFrame({
    "department": ["Engineering", "Marketing", "Sales", "Engineering", "HR", "Marketing"],
    "education": ["Masters", "Bachelors", "Bachelors", "PhD", "Masters", "Bachelors"],
    "city_tier": [1, 2, 3, 1, 2, 1],
    "experience": [3, 5, 2, 8, 4, 6],
    "salary": [80000, 65000, 50000, 120000, 70000, 72000]
})

# One-Hot Encoding (for nominal categories — no order)
dept_encoded = pd.get_dummies(hr_data["department"], prefix="dept")
print(dept_encoded)

# Label Encoding (for ordinal categories — with order)
education_order = {"Bachelors": 0, "Masters": 1, "PhD": 2}
hr_data["education_encoded"] = hr_data["education"].map(education_order)
print(hr_data[["education", "education_encoded"]])
```

### Challenge 3: ML Pipelines

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

# Pipeline = chain preprocessing + model in one object
pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),  # Handle missing
    ("scaler", StandardScaler()),                    # Scale features
    ("model", RandomForestClassifier(random_state=42))  # Train model
])

# Fit once — applies all steps automatically
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

print(classification_report(y_test, y_pred))
# Now you can also save this entire pipeline with pickle
```

---

## 📖 Day 2 — Cross Validation and Model Tuning

```python
from sklearn.model_selection import cross_val_score, GridSearchCV

# Cross-validation — more reliable than single train/test split
cv_scores = cross_val_score(
    RandomForestClassifier(random_state=42),
    X, y,
    cv=5,         # 5-fold
    scoring="f1"
)
print(f"CV F1 scores: {cv_scores}")
print(f"Mean: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# GridSearchCV — find the best hyperparameters
param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth": [3, 5, 10, None],
    "min_samples_split": [2, 5]
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=3,
    scoring="f1",
    n_jobs=-1  # Use all CPU cores
)
grid_search.fit(X_train, y_train)

print(f"\nBest params: {grid_search.best_params_}")
print(f"Best F1: {grid_search.best_score_:.3f}")
```

---

## 📖 Day 3 — Capstone Project Introduction

### The 3 Capstone Projects

---

#### 🏆 Project 1 — Sales Intelligence Dashboard

**Team size:** 3–4 students  
**Focus:** EDA + Visualization + Trend Forecasting

**Problem:**
A regional retail chain has 3 years of sales data across 5 product categories and 8 cities. The management team does not have a clear picture of:
- Which products/cities are growing vs declining
- Seasonal patterns
- Which customer segments drive profit

**Your deliverable:**
A Google Colab notebook that functions as an analysis report — data cleaned, insights surfaced, 8+ visualizations, and a simple 3-month revenue forecast using Linear Regression or a trend model.

**Dataset:** [Superstore Sales (Kaggle)](https://www.kaggle.com/datasets/vivek468/superstore-dataset-final)

---

#### 🏆 Project 2 — Sentiment Analyzer Tool

**Team size:** 3–4 students  
**Focus:** NLP + Classification

**Problem:**
A startup collects thousands of product reviews monthly but reads them manually. They want a model that automatically classifies reviews as Positive, Negative, or Neutral with a confidence score.

**Your deliverable:**
A trained text classifier (Logistic Regression or Naive Bayes) + a Colab notebook that can take a new review as input and output the predicted sentiment + confidence score.

**Dataset:** [Amazon Product Reviews (Kaggle)](https://www.kaggle.com/datasets/snap/amazon-fine-food-reviews)

---

#### 🏆 Project 3 — Student Performance Predictor

**Team size:** 3–4 students  
**Focus:** ML Pipeline + Data Storytelling

**Problem:**
An institution wants to identify students at risk of failing before exams — so counsellors can intervene early. They have attendance, grades, submission records, and behavioural flags.

**Your deliverable:**
A binary classifier (Pass/At-Risk) with feature importance analysis, model evaluation, and a written report explaining findings to a non-technical school administrator.

**Dataset:** [Student Performance Dataset (UCI)](https://www.kaggle.com/datasets/whenamancodes/student-performance)

---

## 📖 Day 4 — Project Proposal Document (PPD)

Every group submits a PPD this week. This is your internship contract.

### PPD Template

```markdown
# Capstone Project Proposal

## Team
- Team Name:
- Members (name + GitHub username):
- Project: (Project 1 / 2 / 3)

## Problem Statement
In 2-3 sentences: What problem are you solving? Who is the end user?

## Dataset
- Source + link
- Number of rows and columns
- Key features you will use

## Approach
- What ML technique will you use? Why?
- How will you evaluate success?

## Weekly Milestones
| Week | Deliverable |
|------|------------|
| Week 9 | Data loaded, cleaned, EDA complete |
| Week 10 | Model trained, evaluated, improved |
| Week 11 | AI integration + final features |
| Week 12 | Polished notebook + demo |

## Risks
- What could go wrong?
- How will you handle it?

## Team Roles
| Member | Role |
|--------|------|
| Name | Data cleaning + EDA |
| Name | Model building |
| Name | Visualizations + Report |
| Name | AI integration + Final demo |
```

---

## 📖 Day 5 — Internship Standards

### What Makes an Internship-Quality Notebook?

```
❌ Student notebook:
- Code with no comments
- No markdown between sections
- Raw outputs with no interpretation
- No consistent naming convention
- Errors ignored or hidden

✅ Internship notebook:
- Every section has a markdown header explaining purpose
- Every output is followed by a 1-2 line interpretation
- Code is clean, commented, reusable
- A "Key Findings" section at the top (write it last)
- Reproducible: anyone can run it top-to-bottom without errors
```

### Internship Week Rhythm

```
Monday     → Stand-up (async message): "What I'm working on this week"
Wednesday  → Mid-week check-in: "What I've done, what's blocking me"
Friday     → PR / notebook push to GitHub + peer review
Sunday     → Reflection note in diary (what worked, what didn't)
```

---

## 📝 Week 7 Checklist

- [ ] Completed ML challenges (imbalanced data, encoding, pipelines)
- [ ] Group formed and project selected
- [ ] PPD submitted (in the team GitHub repo, under `/docs/proposal.md`)
- [ ] Dataset downloaded and loaded successfully in Colab
- [ ] First peer review of someone else's week 6 project

---

## 💬 Reflection Prompt

> *"Your model has 95% accuracy on fraud detection. Your manager asks: 'Is the model ready to go live?' What do you say, and what additional information do you need to answer confidently?"*

---

**Next week:** Deep Learning basics and NLP. You will start building the foundations for the Sentiment Analyzer project.

---

*← [Week 6](./week-06.md) | [Programme Index](./index.md) | [Week 8 →](./week-08.md)*
