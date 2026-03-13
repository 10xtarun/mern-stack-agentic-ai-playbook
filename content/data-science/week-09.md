# Week 9 — Capstone Sprint 1: Data Pipeline + EDA

**Phase:** Internship | **Duration:** ~8 hours (group work)  
**AI Policy:** ✅ Use AI aggressively. But justify every decision in writing.

---

## 🎯 Week Goal

This is a **pure build week**. You and your team are in sprint mode.

By end of this week, each group will deliver:
1. A clean, reproducible data loading and preprocessing pipeline
2. A complete EDA notebook with 8+ meaningful visualizations
3. A written "Data Story" — 5+ key findings from your EDA
4. At least one team code review completed

> No new concepts to learn this week. Apply everything from weeks 1–8.

---

## 🏗️ Sprint Goals by Project

---

### Project 1 Teams — Sales Intelligence Dashboard

**Sprint 1 Deliverable:** `01_eda_sales.ipynb`

```python
# ===== DATA LOADING =====
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# Load Superstore data
df = pd.read_csv("superstore.csv", encoding="latin-1")
df["Order Date"] = pd.to_datetime(df["Order Date"])
df["Ship Date"] = pd.to_datetime(df["Ship Date"])

# Engineered columns
df["Revenue"] = df["Sales"]
df["Year"] = df["Order Date"].dt.year
df["Month"] = df["Order Date"].dt.month
df["Month_Name"] = df["Order Date"].dt.strftime("%b")
df["Days_to_Ship"] = (df["Ship Date"] - df["Order Date"]).dt.days

print(f"Dataset: {df.shape[0]} orders, {df.shape[1]} columns")
print(f"Date range: {df['Order Date'].min().date()} to {df['Order Date'].max().date()}")
print(f"\nMissing values:\n{df.isnull().sum()[df.isnull().sum() > 0]}")
```

**8 Required Charts + Business Question Each Answers:**

```python
# Chart 1: Revenue trend over time (line chart)
# Q: Is the business growing year-over-year?

monthly_revenue = df.groupby(["Year", "Month"])["Revenue"].sum().reset_index()
# ... (your code here)

# Chart 2: Revenue vs Profit by Category (scatter)
# Q: Are high-revenue categories actually profitable?

# Chart 3: Top 10 and Bottom 10 products by profit
# Q: What should we stop selling?

# Chart 4: Profit margin by sub-category (horizontal bar)
# Q: Which sub-categories have thin or negative margins?

# Chart 5: Regional performance heatmap
# Q: Which region × category combinations are performing?

# Chart 6: Customer segment analysis
# Q: Who are our most valuable customers?

# Chart 7: Discount vs Profit correlation
# Q: Are our discounts hurting profitability?

# Chart 8: Shipping mode analysis
# Q: Are expensive shipping options worth it?
```

**Data Story Template:**

```markdown
## Key Findings — Sales Intelligence Dashboard

### Finding 1: [Title]
[2-3 sentences explaining what you found and why it matters to the business]
Chart: [reference chart number]

### Finding 2: [Title]
...

### Finding 3: [Title]
...

### Finding 4: [Title]
...

### Finding 5: [Title]
...

## Recommendations
1. ...
2. ...
3. ...
```

---

### Project 2 Teams — Sentiment Analyzer Tool

**Sprint 1 Deliverable:** `01_eda_sentiment.ipynb`

```python
# ===== DATA LOADING =====
# Using Amazon Fine Food Reviews or similar
# Subsample to 20,000 rows for speed

df = pd.read_csv("Reviews.csv", nrows=20000)
# Or from URL

# Map scores to sentiment
# Score 1-2 → Negative, 3 → Neutral, 4-5 → Positive
def map_sentiment(score):
    if score <= 2:
        return "Negative"
    elif score == 3:
        return "Neutral"
    else:
        return "Positive"

df["Sentiment"] = df["Score"].apply(map_sentiment)

print(f"Dataset: {df.shape}")
print(f"\nSentiment distribution:\n{df['Sentiment'].value_counts()}")
print(f"Sentiment %:\n{df['Sentiment'].value_counts(normalize=True)*100:.1f}")
```

**8 Required Charts + Analysis:**

```python
# Chart 1: Sentiment distribution (bar chart)
# Q: Is the dataset balanced? Do we have an imbalance problem?

# Chart 2: Review length distribution by sentiment
# Q: Do negative reviews tend to be longer?
df["text_length"] = df["Text"].str.len()
df["word_count"] = df["Text"].str.split().str.len()

# Chart 3: Word clouds (positive vs negative)
# Q: What are the most common positive/negative words?
# from wordcloud import WordCloud  (install if needed)

# Chart 4: Most common bigrams (2-word phrases) per sentiment
# Q: What phrases characterize each sentiment class?

# Chart 5: Helpfulness score by sentiment
# Q: Are negative reviews more helpful to readers?

# Chart 6: Score distribution
# Q: Is it really bimodal (mostly 1s and 5s)?

# Chart 7: Top 20 most frequent words after removing stopwords
# Q: What are the core vocabulary signals?

# Chart 8: Review volume over time
# Q: Are there spikes that indicate external events?
```

```python
# Text cleaning pipeline (your preprocessing code)
import re, string
from nltk.corpus import stopwords
import nltk

nltk.download("stopwords", quiet=True)
stop_words = set(stopwords.words("english"))

def clean_text(text):
    if pd.isna(text):
        return ""
    text = str(text).lower()
    text = re.sub(r"<.*?>", "", text)         # Remove HTML
    text = re.sub(r"http\S+", "", text)       # Remove URLs
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\d+", "", text)
    tokens = text.split()
    tokens = [t for t in tokens if t not in stop_words and len(t) > 2]
    return " ".join(tokens)

df["cleaned_text"] = df["Text"].apply(clean_text)
df["cleaned_length"] = df["cleaned_text"].str.split().str.len()

print("Sample cleaned review:")
print(df[["Text", "cleaned_text"]].head(2).to_string())
```

---

### Project 3 Teams — Student Performance Predictor

**Sprint 1 Deliverable:** `01_eda_students.ipynb`

```python
# ===== DATA LOADING =====
# UCI Student Performance Dataset
url_mat = "https://raw.githubusercontent.com/dsrscientist/dataset1/master/student-mat.csv"
df = pd.read_csv(url_mat, sep=";")

# Target variable: Will the student pass? (G3 >= 10)
df["passed"] = (df["G3"] >= 10).astype(int)

print(f"Dataset: {df.shape}")
print(f"Pass rate: {df['passed'].mean()*100:.1f}%")
print(f"\nColumns:\n{list(df.columns)}")
```

**8 Required Charts + Analysis:**

```python
# Chart 1: Final grade distribution
# Q: What does the overall performance look like?

# Chart 2: Pass/Fail by study time
# Q: Does more study time reliably lead to passing?

# Chart 3: Impact of parent education on grades
# Q: Is there a socioeconomic pattern?

# Chart 4: Absences vs Final Grade (scatter)
# Q: How strongly do absences predict failure?

# Chart 5: Family support vs performance
# Q: Does home support matter?

# Chart 6: G1, G2, G3 correlation heatmap
# Q: Is G1 a good predictor of G3?

# Chart 7: Failures history vs current grade
# Q: Do students who failed before fail again?

# Chart 8: Internet access vs performance
# Q: Digital divide — does internet access affect outcomes?
```

```python
# Feature engineering for Project 3
# Create useful derived features
df["total_grades"] = df["G1"] + df["G2"]
df["avg_grade_history"] = df["total_grades"] / 2
df["high_absence"] = (df["absences"] > df["absences"].median()).astype(int)
df["highly_educated_parent"] = (
    (df["Medu"] >= 3) | (df["Fedu"] >= 3)
).astype(int)

# Encode categorical features
cat_cols = df.select_dtypes(include="object").columns.tolist()
df_encoded = pd.get_dummies(df, columns=cat_cols, drop_first=True)

print(f"After encoding: {df_encoded.shape[1]} features")
```

---

## 🔄 Code Review Guide

At end of Sprint 1, each team member reviews one teammate's notebook.

### What to Review

```
✅ Structure: Is the notebook readable top-to-bottom?
✅ Completeness: Are all 8 charts present with titles and insights?
✅ Code quality: Are there clear comments? No redundant cells?
✅ Reproducibility: Does it run cell-by-cell without errors?
✅ Insight quality: Are findings written for a non-technical reader?
```

### How to Leave a Review

Open a GitHub Issue on the teammate's repo titled `Sprint 1 Review — [Your Name]` with feedback on each point above (2–3 sentences each, be constructive).

---

## 📝 Week 9 Deliverables

All items pushed to your team's GitHub repo by Sunday:

- [ ] `notebooks/01_eda_[project_type].ipynb` — complete, runs top-to-bottom
- [ ] 8 charts with proper titles, labels, and 1-line insights
- [ ] Data Story section (5+ findings written in plain English)
- [ ] Preprocessing pipeline code (clean, reusable)
- [ ] Each team member has at least 2 commits in the repo
- [ ] GitHub Issue left on one teammate's notebook (code review)

---

## 💬 Reflection Prompt (Individual)

> *"Describe one surprise you found in your dataset during EDA — something you did not expect. How does it change what you thought the model should predict or what features matter most?"*

Write this as a markdown cell at the end of your EDA notebook.

---

**Next week:** You move from data understanding to model building. Sprint 2 begins.

---

*← [Week 8](./week-08.md) | [Programme Index](./index.md) | [Week 10 →](./week-10.md)*
