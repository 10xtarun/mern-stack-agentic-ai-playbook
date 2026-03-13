# Week 6 — Machine Learning Fundamentals + Prompt Engineering

**Phase:** Learn → Transition | **Duration:** ~6 hours across the week  
**AI Policy:** ✅ AI is now your collaborator. Use it to accelerate, not to skip.

---

## 🎯 Week Goal

By end of this week, you will:
- Understand the ML workflow from data → model → prediction
- Train your first 3 ML models (Linear Regression, Decision Tree, Random Forest)
- Evaluate models using proper metrics (not just accuracy)
- Master the core AI prompt engineering patterns
- Complete your mini project: **House Price Predictor**

> This is the most important week in Phase 1. Everything you learned in weeks 1–5 feeds into this.

---

## 📖 Day 1 — The Machine Learning Workflow

### The 5-Step ML Pipeline

```
1. Understand the problem → Regression? Classification? Clustering?
2. Prepare the data → Clean, encode, scale
3. Train the model → Fit on training data
4. Evaluate the model → Test on unseen data
5. Improve + Deploy → Tune, explain, productionize
```

### Types of ML Problems

| Type | Question | Example |
|---|---|---|
| Regression | "How much?" | Predict house price |
| Classification | "Which category?" | Spam or not spam? |
| Clustering | "Which groups exist?" | Customer segments |

---

## 📖 Day 2 — Linear Regression

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler

# --- Create a house price dataset ---
np.random.seed(42)
n = 300

size = np.random.randint(500, 3500, n)        # Square feet
bedrooms = np.random.randint(1, 6, n)
age = np.random.randint(0, 40, n)
distance = np.random.uniform(1, 30, n)         # km from city center

# Price with some noise
price = (
    size * 120
    + bedrooms * 50000
    - age * 8000
    - distance * 15000
    + np.random.normal(0, 200000, n)
)

df = pd.DataFrame({
    "size_sqft": size,
    "bedrooms": bedrooms,
    "age_years": age,
    "distance_km": distance,
    "price": price
})

# Step 1: Split data
X = df.drop("price", axis=1)
y = df["price"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Train: {X_train.shape}, Test: {X_test.shape}")

# Step 2: Scale features (important for linear models)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 3: Train
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Step 4: Predict + Evaluate
y_pred = model.predict(X_test_scaled)

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"\nModel Performance:")
print(f"RMSE: ₹{rmse:,.0f}")
print(f"R² Score: {r2:.3f}  ({r2*100:.1f}% of variance explained)")

# Feature importance (coefficients)
coef_df = pd.DataFrame({
    "Feature": X.columns,
    "Coefficient": model.coef_
}).sort_values("Coefficient", key=abs, ascending=False)
print("\nFeature Impact:")
print(coef_df)
```

```python
# Visualize: Actual vs Predicted
plt.figure(figsize=(8, 6))
plt.scatter(y_test, y_pred, alpha=0.5, color="#7C3AED")
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()],
         "r--", lw=2, label="Perfect prediction")
plt.xlabel("Actual Price (₹)")
plt.ylabel("Predicted Price (₹)")
plt.title(f"Actual vs Predicted House Prices (R²={r2:.3f})")
plt.legend()
plt.tight_layout()
plt.show()
```

---

## 📖 Day 3 — Classification: Decision Trees & Random Forest

```python
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import seaborn as sns

# --- Create a loan approval dataset ---
np.random.seed(42)
n = 500

income = np.random.randint(20000, 200000, n)
credit_score = np.random.randint(300, 850, n)
loan_amount = np.random.randint(50000, 1000000, n)
employment_years = np.random.randint(0, 20, n)
debt_ratio = np.random.uniform(0.1, 0.8, n)

# Rule: Approve if high income, good credit, low debt
approved = (
    (income > 60000) &
    (credit_score > 600) &
    (debt_ratio < 0.5)
).astype(int)

# Add noise
noise_idx = np.random.choice(n, size=50, replace=False)
approved[noise_idx] = 1 - approved[noise_idx]

loan_df = pd.DataFrame({
    "income": income,
    "credit_score": credit_score,
    "loan_amount": loan_amount,
    "employment_years": employment_years,
    "debt_ratio": debt_ratio,
    "approved": approved
})

X = loan_df.drop("approved", axis=1)
y = loan_df["approved"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- Decision Tree ---
dt = DecisionTreeClassifier(max_depth=4, random_state=42)
dt.fit(X_train, y_train)
dt_pred = dt.predict(X_test)

print("=== Decision Tree ===")
print(f"Accuracy: {accuracy_score(y_test, dt_pred):.3f}")
print(classification_report(y_test, dt_pred, target_names=["Rejected", "Approved"]))

# --- Random Forest ---
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)

print("=== Random Forest ===")
print(f"Accuracy: {accuracy_score(y_test, rf_pred):.3f}")
print(classification_report(y_test, rf_pred, target_names=["Rejected", "Approved"]))
```

```python
# Confusion Matrix
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

for ax, pred, title in zip(axes, [dt_pred, rf_pred], ["Decision Tree", "Random Forest"]):
    cm = confusion_matrix(y_test, pred)
    sns.heatmap(cm, annot=True, fmt="d", ax=ax, cmap="Blues",
                xticklabels=["Rejected", "Approved"],
                yticklabels=["Rejected", "Approved"])
    ax.set_title(f"{title} Confusion Matrix")
    ax.set_xlabel("Predicted")
    ax.set_ylabel("Actual")

plt.tight_layout()
plt.show()

# Feature Importance (Random Forest)
importance_df = pd.DataFrame({
    "Feature": X.columns,
    "Importance": rf.feature_importances_
}).sort_values("Importance", ascending=False)

plt.figure(figsize=(8, 4))
plt.barh(importance_df["Feature"], importance_df["Importance"], color="#059669")
plt.title("Random Forest — Feature Importance")
plt.xlabel("Importance Score")
plt.tight_layout()
plt.show()
```

---

## 📖 Day 4 — AI Prompt Engineering

Welcome to the skill that amplifies everything else you know.

### What Is Prompt Engineering?

Prompt engineering is the practice of writing precise instructions to get high-quality, reliable outputs from AI models like ChatGPT, Gemini, or Claude.

### Core Prompt Patterns

#### 1. Role + Context + Task

```
❌ Weak:
"Explain machine learning"

✅ Strong:
"You are a data science mentor teaching engineering students.
Explain linear regression using a real-world example that a 
20-year-old can understand. Keep it under 150 words."
```

#### 2. Few-Shot Prompting

```
Show the AI examples of what you want before asking it to do yours.

"Here are two examples of how to write a data insight:

Example 1:
Data: Sales dropped 23% in Q3.
Insight: The Q3 sales dip likely stems from seasonal factors and
reduced marketing spend — not product issues.

Example 2:
Data: Average order value increased by ₹450 after bundle pricing.
Insight: Bundle pricing successfully drove higher spend per transaction,
up 18% month-over-month.

Now write an insight for:
Data: Customer churn rate spiked from 3.2% to 8.7% after the price increase."
```

#### 3. Chain of Thought (Step-by-Step)

```
"Think step by step:
1. What is the business problem?
2. What data would you need?
3. What analysis would you run?
4. What would success look like?

Problem: A food delivery app is seeing fewer repeat orders from users 
who joined in the last 90 days."
```

#### 4. Output Format Control

```
"Analyze this sales data and respond ONLY in JSON format:
{
  'top_category': '...',
  'growth_percentage': ...,
  'recommendation': '...',
  'confidence': 'High/Medium/Low'
}

Data: Electronics ₹85K, Clothing ₹30K, Books ₹12K (vs last month:
Electronics ₹70K, Clothing ₹32K, Books ₹15K)"
```

#### 5. Iterative Refinement Pattern

```
Round 1: "Explain overfitting in machine learning."
Round 2: "Make it more visual. Use an analogy."
Round 3: "Now write it as a 3-tweet thread for a student audience."
Round 4: "Add one concrete Python example of overfitting."
```

### Prompts for Data Science Work

```python
# Paste these into ChatGPT / Gemini when you need them

PROMPT_EDA_INSIGHT = """
I have a dataset with these columns: {columns}
I ran df.describe() and got: {describe_output}

Identify the 3 most important patterns or anomalies I should 
investigate further. Format as numbered list with a brief 
"why it matters" for each.
"""

PROMPT_DEBUG_CODE = """
I'm learning Python/Pandas for data science. Here is my code and 
the error I'm seeing. Do NOT just give me the fix — explain what 
went wrong so I can learn:

Code:
{my_code}

Error:
{error_message}
"""

PROMPT_EXPLAIN_CONCEPT = """
I'm an engineering student learning {concept}. I understand 
{what_i_know}. Explain {concept} using an analogy to 
{something_i_know_well}. Then give me one practical Python 
example under 10 lines.
"""
```

> **The golden rule of prompt engineering:**  
> The more context you give the AI about who you are, what you know, and exactly what format you want — the better the output.

---

## 📖 Day 5 — Mini Project Day

### 🛠️ Mini Project: House Price Predictor

**Dataset:** [Kaggle — Housing Prices](https://www.kaggle.com/datasets/camnugent/california-housing-prices)

```python
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing(as_frame=True)
df = housing.frame
df.head()
```

**Build a complete ML pipeline:**

```python
# Step 1: EDA (use your EDA template from Week 5)

# Step 2: Feature engineering
# - Create: rooms_per_household = AveRooms / HouseAge
# - Create: population_density = Population / AveOccup

# Step 3: Train 3 models:
# - Linear Regression
# - Decision Tree (max_depth=6)
# - Random Forest (n_estimators=100)

# Step 4: Compare models in a clean table
results = pd.DataFrame({
    "Model": ["Linear Regression", "Decision Tree", "Random Forest"],
    "RMSE": [rmse_lr, rmse_dt, rmse_rf],
    "R2": [r2_lr, r2_dt, r2_rf]
})
print(results)

# Step 5: Use prompt engineering!
# Ask ChatGPT/Gemini: "My Random Forest has R²=0.81 on California housing.
# What are 3 things I could try to improve it? I'm a beginner."
# Implement ONE suggestion and compare results.

# Step 6: Write a 5-sentence "Model Report" in a markdown cell
```

**Submission:** `week6_house_predictor.ipynb` → GitHub

---

## 📝 Week 6 Checklist

- [ ] Trained and evaluated Linear Regression, Decision Tree, and Random Forest
- [ ] Can explain precision vs recall vs accuracy (when each matters)
- [ ] Practised all 5 prompt engineering patterns
- [ ] Mini project: House Price Predictor with model comparison
- [ ] Used AI to help improve your model (document the prompt you used!)
- [ ] Phase 1 reflection written: "What was hardest? What clicked?"

---

## 🔗 Resources

- [Scikit-learn Getting Started](https://scikit-learn.org/stable/getting_started.html)
- [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
- [Andrej Karpathy — Introduction to Neural Networks (YouTube)](https://www.youtube.com/watch?v=VMj-3S1tku0)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

---

## 💬 Reflection Prompt

> *"You trained a model with 99% accuracy on training data but only 61% on test data. What is happening? What would you do to fix it?"*

---

**You have completed Phase 1.** From here, you are not a student anymore — you are an intern. Phase 2 starts with real-world ML application and group project work.

---

*← [Week 5](./week-05.md) | [Programme Index](./index.md) | [Week 7 →](./week-07.md)*
