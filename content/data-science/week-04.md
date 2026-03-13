# Week 4 — Statistics & Probability for Data Science

**Phase:** Learn | **Duration:** ~5 hours across the week  
**AI Policy:** 🚫 No AI this week. Calculate before you automate.

---

## 🎯 Week Goal

By end of this week, you will:
- Understand the statistics that every data science interview asks about
- Calculate distributions, correlations, and probabilities in Python
- Perform a basic hypothesis test with real data
- Complete your mini project: **Salary Analysis Report**

> You do not need to become a statistician. You need to know enough to **ask the right questions** from data and **not be fooled** by it.

---

## 📖 Day 1 — Descriptive Statistics

### The Five Numbers Every Dataset Needs

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Sample salary data
np.random.seed(42)
salaries = np.concatenate([
    np.random.normal(45000, 8000, 200),   # Junior employees
    np.random.normal(90000, 15000, 100),  # Senior employees
    np.random.normal(200000, 30000, 20)   # Executives
])

# The five summary numbers
print(f"Mean:    ₹{np.mean(salaries):,.0f}")
print(f"Median:  ₹{np.median(salaries):,.0f}")
print(f"Std Dev: ₹{np.std(salaries):,.0f}")
print(f"Min:     ₹{np.min(salaries):,.0f}")
print(f"Max:     ₹{np.max(salaries):,.0f}")
```

### Mean vs Median — Why It Matters

```python
# The "average salary" trap
regular_salaries = [40000, 42000, 45000, 48000, 50000]
ceo_salary = 2000000

all_salaries = regular_salaries + [ceo_salary]

mean_sal = np.mean(all_salaries)
median_sal = np.median(all_salaries)

print(f"Mean salary:   ₹{mean_sal:,.0f}")    # ₹369,166 — misleading!
print(f"Median salary: ₹{median_sal:,.0f}")  # ₹46,500 — more honest

# Lesson: Use median when data has outliers. Mean is easily distorted.
```

### Spread: Variance and Standard Deviation

```python
# Standard deviation = "typical distance from the mean"
scores_class_a = [70, 72, 68, 71, 69, 73, 70]  # Very consistent
scores_class_b = [45, 90, 30, 88, 55, 95, 42]  # High variation

print(f"Class A - Mean: {np.mean(scores_class_a):.1f}, Std: {np.std(scores_class_a):.1f}")
print(f"Class B - Mean: {np.mean(scores_class_b):.1f}, Std: {np.std(scores_class_b):.1f}")

# Both classes might have the same mean, but very different variability
# As a teacher, which class concerns you more?
```

---

## 📖 Day 2 — Distributions

### The Normal Distribution

```python
from scipy import stats

# Generate normal distribution data
mu, sigma = 70, 10  # mean=70, std=10
data = np.random.normal(mu, sigma, 1000)

# Plot
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Histogram
axes[0].hist(data, bins=30, color="#7C3AED", edgecolor="white", alpha=0.8, density=True)
x = np.linspace(data.min(), data.max(), 100)
axes[0].plot(x, stats.norm.pdf(x, mu, sigma), "r-", lw=2, label="Normal curve")
axes[0].set_title("Normal Distribution of Exam Scores")
axes[0].set_xlabel("Score")
axes[0].legend()

# Box Plot
axes[1].boxplot(data, vert=True, patch_artist=True,
                boxprops=dict(facecolor="#7C3AED", alpha=0.7))
axes[1].set_title("Box Plot — Spot Outliers Instantly")
axes[1].set_ylabel("Score")

plt.tight_layout()
plt.show()
```

### The 68-95-99.7 Rule (Empirical Rule)

```python
# For a normal distribution:
# 68% of data falls within 1 standard deviation of the mean
# 95% within 2 standard deviations
# 99.7% within 3 standard deviations

mean_val = np.mean(data)
std_val = np.std(data)

within_1std = np.sum(np.abs(data - mean_val) <= std_val) / len(data) * 100
within_2std = np.sum(np.abs(data - mean_val) <= 2*std_val) / len(data) * 100
within_3std = np.sum(np.abs(data - mean_val) <= 3*std_val) / len(data) * 100

print(f"Within 1 std: {within_1std:.1f}% (expected ~68%)")
print(f"Within 2 std: {within_2std:.1f}% (expected ~95%)")
print(f"Within 3 std: {within_3std:.1f}% (expected ~99.7%)")
```

### Skewness — When Data Is Not Symmetric

```python
# Right-skewed (positive skew) — common with incomes, house prices
right_skewed = np.random.exponential(scale=20000, size=1000) + 30000

# Left-skewed (negative skew)
left_skewed = -np.random.exponential(scale=20000, size=1000) + 100000

fig, axes = plt.subplots(1, 2, figsize=(14, 4))

axes[0].hist(right_skewed, bins=30, color="#059669", edgecolor="white", alpha=0.8)
axes[0].axvline(np.mean(right_skewed), color="red", linestyle="--", label="Mean")
axes[0].axvline(np.median(right_skewed), color="blue", linestyle="-", label="Median")
axes[0].set_title("Right-Skewed (like Income Distribution)")
axes[0].legend()

axes[1].hist(left_skewed, bins=30, color="#D97706", edgecolor="white", alpha=0.8)
axes[1].axvline(np.mean(left_skewed), color="red", linestyle="--", label="Mean")
axes[1].axvline(np.median(left_skewed), color="blue", linestyle="-", label="Median")
axes[1].set_title("Left-Skewed (like Test Scores in Easy Exam)")
axes[1].legend()

plt.tight_layout()
plt.show()

# Key insight: In a right-skewed distribution, mean > median
# Mean is pulled toward the tail. Median is more robust.
```

---

## 📖 Day 3 — Correlation and Relationships

### Pearson Correlation Coefficient

```python
# Correlation: -1 (perfect negative) to +1 (perfect positive), 0 = no linear relationship

# Create data
study_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
exam_scores = [40, 45, 50, 60, 62, 70, 78, 82, 88, 95]
sleep_hours = [8, 7, 8, 6, 7, 5, 6, 5, 5, 4]

df = pd.DataFrame({
    "study_hours": study_hours,
    "exam_score": exam_scores,
    "sleep_hours": sleep_hours
})

# Correlation matrix
corr = df.corr()
print(corr)

# Visualize
sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1, fmt=".2f")
plt.title("Correlation Matrix")
plt.show()

# Interpretation:
# study_hours vs exam_score: ~0.99 (strong positive)
# study_hours vs sleep_hours: negative (study more → sleep less)
```

> ⚠️ **Correlation ≠ Causation**  
> Ice cream sales and drowning rates are correlated (both rise in summer). That does not mean ice cream causes drowning. Always look for the hidden variable.

---

## 📖 Day 4 — Probability and Hypothesis Testing

### Basic Probability

```python
# P(Event) = Favorable outcomes / Total outcomes

# Dice example
outcomes = list(range(1, 7))  # [1, 2, 3, 4, 5, 6]

# P(rolling a 4)
p_four = 1 / len(outcomes)
print(f"P(4) = {p_four:.3f}")  # 0.167

# P(rolling even number)
evens = [2, 4, 6]
p_even = len(evens) / len(outcomes)
print(f"P(even) = {p_even:.3f}")  # 0.5

# Simulate 10,000 dice rolls — verify probability experimentally
np.random.seed(42)
rolls = np.random.randint(1, 7, size=10000)
print(f"\nSimulated P(4): {np.sum(rolls==4)/len(rolls):.3f}")  # Should be close to 0.167
print(f"Simulated P(even): {np.sum(rolls%2==0)/len(rolls):.3f}")  # Close to 0.5
```

### Hypothesis Testing (Practical Intro)

**Business Question:** "Does the new website design increase time-on-site?"

```python
from scipy import stats

# Old design: time on site (minutes) — 50 users
np.random.seed(42)
old_design = np.random.normal(loc=4.2, scale=1.1, size=50)

# New design: time on site (minutes) — 50 users
new_design = np.random.normal(loc=4.8, scale=1.2, size=50)

print(f"Old design — Mean: {np.mean(old_design):.2f} min, Std: {np.std(old_design):.2f}")
print(f"New design — Mean: {np.mean(new_design):.2f} min, Std: {np.std(new_design):.2f}")

# T-Test: Is the difference statistically significant or just chance?
t_stat, p_value = stats.ttest_ind(old_design, new_design)

print(f"\nt-statistic: {t_stat:.4f}")
print(f"p-value: {p_value:.4f}")

alpha = 0.05  # Significance threshold (5%)
if p_value < alpha:
    print(f"\n✅ p={p_value:.4f} < {alpha}. Result IS significant.")
    print("The new design likely causes more time-on-site. Consider rolling it out.")
else:
    print(f"\n❌ p={p_value:.4f} >= {alpha}. Result is NOT significant.")
    print("Difference could be due to chance. Need more data or a better design.")
```

> **Simple rule for interviews:**  
> - p-value < 0.05 → reject the null hypothesis → result is statistically significant  
> - p-value ≥ 0.05 → fail to reject → not enough evidence

---

## 📖 Day 5 — Mini Project Day

### 🛠️ Mini Project: Salary Analysis Report

**Dataset:** [Kaggle — Data Science Job Salaries](https://www.kaggle.com/datasets/ruchi798/data-science-job-salaries)

```python
url = "https://raw.githubusercontent.com/dsrscientist/dataset1/master/ds_salaries.csv"
df = pd.read_csv(url)
df.head()
```

**Your Analysis (7 questions):**

```python
# Q1: What is the average, median, and std dev of salaries?
# → When would you report median instead of mean for this dataset?

# Q2: Plot the salary distribution. Is it normally distributed or skewed?
# → Use histogram + describe the shape.

# Q3: Which job titles have the highest median salary?
# → Group + median + horizontal bar chart (top 10)

# Q4: Does company size affect salary?
# → Box plot: salary by company size (S, M, L)

# Q5: Is there a salary difference between experience levels?
# → Box plot: salary by experience_level

# Q6: Which countries pay the most for data scientists?
# → Top 10 countries by median salary

# Q7: Hypothesis test — Do fully remote workers earn more than non-remote?
# → Use t-test, state your null and alternative hypothesis first
```

**Submission:** `week4_salary_analysis.ipynb` → GitHub

---

## 📝 Week 4 Checklist

- [ ] Can explain mean vs median in your own words with an example
- [ ] Understand what a p-value means (no formula needed, just the concept)
- [ ] Can identify skewness from a histogram
- [ ] Mini project: Salary Analysis complete with written interpretations
- [ ] Peer review done

---

## 🔗 Resources

- [Khan Academy Statistics](https://www.khanacademy.org/math/statistics-probability) — if you want deeper math
- [StatQuest YouTube](https://www.youtube.com/c/joshstarmer) — best video explanations of stats for ML
- [Scipy Stats Documentation](https://docs.scipy.org/doc/scipy/reference/stats.html)
- [Seeing Theory](https://seeing-theory.brown.edu/) — visual probability primer

---

## 💬 Reflection Prompt

> *"A company says their average customer satisfaction score is 8.2/10. Is that enough information to trust that claim? What else would you want to know?"*

---

**Next week:** SQL + Exploratory Data Analysis (EDA). You will combine everything from weeks 1–4 into a full end-to-end analysis workflow.

---

*← [Week 3](./week-03.md) | [Programme Index](./index.md) | [Week 5 →](./week-05.md)*
