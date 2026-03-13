# Week 3 — Data Visualization

**Phase:** Learn | **Duration:** ~5 hours across the week  
**AI Policy:** 🚫 No AI this week. Choose chart types by thinking, not by asking.

---

## 🎯 Week Goal

By end of this week, you will:
- Choose the right chart for the right question
- Build clean, readable charts using Matplotlib and Seaborn
- Create an interactive chart with Plotly
- Complete your mini project: **E-Commerce Sales Story**

---

## 📖 Day 1 — Choosing the Right Chart

Before writing a single line of code, ask: **"What question am I answering?"**

| Question Type | Best Chart |
|---|---|
| Distribution of one variable | Histogram, Box Plot |
| Comparison between categories | Bar Chart, Horizontal Bar |
| Trend over time | Line Chart |
| Relationship between two variables | Scatter Plot |
| Part of a whole | Pie Chart (use sparingly!) |
| Correlation matrix | Heatmap |

> **Rule:** Every chart needs a title that states the *finding*, not just the topic.  
> ❌ "Sales by Region"  
> ✅ "North Region Leads in Sales, Contributing 42% of Total Revenue"

---

## 📖 Day 2 — Matplotlib (The Foundation)

```python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# --- 1. Line Chart: Sales Trend ---
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
sales = [45000, 52000, 48000, 61000, 58000, 71000]

plt.figure(figsize=(10, 5))
plt.plot(months, sales, marker="o", color="#2563EB", linewidth=2, markersize=8)
plt.fill_between(months, sales, alpha=0.1, color="#2563EB")
plt.title("Monthly Sales Show a Strong Upward Trend (Jan–Jun)", fontsize=14)
plt.xlabel("Month")
plt.ylabel("Sales (₹)")
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()
plt.show()
```

```python
# --- 2. Bar Chart: Sales by Category ---
categories = ["Electronics", "Clothing", "Books", "Home", "Sports"]
sales = [85000, 62000, 23000, 47000, 38000]
colors = ["#2563EB", "#7C3AED", "#DB2777", "#D97706", "#059669"]

plt.figure(figsize=(10, 5))
bars = plt.bar(categories, sales, color=colors, edgecolor="white", linewidth=0.8)

# Add value labels on bars
for bar, value in zip(bars, sales):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 500,
             f"₹{value:,}", ha="center", va="bottom", fontweight="bold")

plt.title("Electronics Dominate Sales — 3.4x Higher Than Sports", fontsize=14)
plt.ylabel("Sales (₹)")
plt.tight_layout()
plt.show()
```

```python
# --- 3. Histogram: Distribution of Order Values ---
np.random.seed(42)
order_values = np.concatenate([
    np.random.normal(500, 150, 300),
    np.random.normal(1200, 300, 100)
])

plt.figure(figsize=(10, 5))
plt.hist(order_values, bins=30, color="#7C3AED", edgecolor="white", alpha=0.8)
plt.axvline(np.mean(order_values), color="red", linestyle="--", label=f"Mean: ₹{np.mean(order_values):.0f}")
plt.title("Most Orders Cluster Around ₹500, with a Premium Segment at ₹1200", fontsize=13)
plt.xlabel("Order Value (₹)")
plt.ylabel("Number of Orders")
plt.legend()
plt.tight_layout()
plt.show()
```

---

## 📖 Day 3 — Seaborn (Statistical Visualizations)

Seaborn builds on Matplotlib. It is designed for statistical charts and handles DataFrames natively.

```python
import seaborn as sns

# Load a built-in dataset
tips = sns.load_dataset("tips")
print(tips.head())
print(tips.shape)  # (244, 7)
```

```python
# --- Box Plot: Distribution by Category ---
plt.figure(figsize=(10, 5))
sns.boxplot(
    data=tips,
    x="day",
    y="total_bill",
    palette="Set2",
    order=["Thur", "Fri", "Sat", "Sun"]
)
plt.title("Weekend Bills Are Higher and More Variable Than Weekday Bills", fontsize=13)
plt.xlabel("Day of Week")
plt.ylabel("Total Bill ($)")
plt.tight_layout()
plt.show()
```

```python
# --- Scatter Plot with Regression Line ---
plt.figure(figsize=(9, 6))
sns.scatterplot(data=tips, x="total_bill", y="tip", hue="sex", alpha=0.7, s=80)
sns.regplot(data=tips, x="total_bill", y="tip", scatter=False, color="black", line_kws={"lw": 2})
plt.title("Tip Amount Increases Linearly with Total Bill Size", fontsize=13)
plt.tight_layout()
plt.show()
```

```python
# --- Heatmap: Correlation Matrix ---
# Use only numeric columns
numeric_df = tips.select_dtypes(include=[np.number])
corr_matrix = numeric_df.corr()

plt.figure(figsize=(8, 6))
sns.heatmap(
    corr_matrix,
    annot=True,
    fmt=".2f",
    cmap="coolwarm",
    center=0,
    square=True,
    linewidths=0.5
)
plt.title("Correlation Heatmap — Total Bill Has Strongest Correlation with Tip", fontsize=13)
plt.tight_layout()
plt.show()
```

```python
# --- Pair Plot: Explore All Relationships at Once ---
sns.pairplot(tips, hue="sex", diag_kind="hist", plot_kws={"alpha": 0.6})
plt.suptitle("Pairwise Relationships in Tips Dataset", y=1.02)
plt.show()
```

---

## 📖 Day 4 — Plotly (Interactive Charts)

Plotly charts let users hover, zoom, and filter. Great for presentations and dashboards.

```python
import plotly.express as px
import plotly.graph_objects as go

# Load a dataset
df = px.data.gapminder()

# --- Interactive Scatter ---
fig = px.scatter(
    df[df["year"] == 2007],
    x="gdpPercap",
    y="lifeExp",
    size="pop",
    color="continent",
    hover_name="country",
    log_x=True,
    title="Wealthier Countries Live Longer — Global Health vs Wealth (2007)",
    labels={"gdpPercap": "GDP per Capita (log scale)", "lifeExp": "Life Expectancy (years)"}
)
fig.show()
```

```python
# --- Animated Chart Over Time ---
fig = px.scatter(
    df,
    x="gdpPercap",
    y="lifeExp",
    size="pop",
    color="continent",
    hover_name="country",
    animation_frame="year",
    log_x=True,
    range_x=[200, 100000],
    range_y=[25, 90],
    title="Life Expectancy & Wealth Have Grown Together Since 1952"
)
fig.show()
```

```python
# --- Interactive Bar Chart ---
india_data = df[df["country"] == "India"]

fig = px.bar(
    india_data,
    x="year",
    y="gdpPercap",
    title="India's GDP Per Capita Growth (1952–2007)",
    color="gdpPercap",
    color_continuous_scale="Blues"
)
fig.show()
```

---

## 📖 Day 5 — Mini Project Day

### 🛠️ Mini Project: E-Commerce Sales Story

**Dataset:** [Superstore Sales Dataset on Kaggle](https://www.kaggle.com/datasets/vivek468/superstore-dataset-final)

Or load directly:

```python
url = "https://raw.githubusercontent.com/dsrscientist/dataset1/master/superstore.csv"
df = pd.read_csv(url, encoding="latin-1")
df["Order Date"] = pd.to_datetime(df["Order Date"])
df.head()
```

**Your task is to build a visual story — a sequence of 6 charts that answers one business question each.**

```python
# Chart 1: Which product categories generate the most profit?
# → Use a horizontal bar chart. Sort by profit descending.

# Chart 2: How has monthly revenue trended over the years?
# → Extract month-year, group by it, line chart.

# Chart 3: Which states are underperforming? (High sales, low profit)
# → Scatter plot: Sales vs Profit, colored by Region.

# Chart 4: What is the distribution of discount rates?
# → Histogram. Mark the average discount line.

# Chart 5: Do higher discounts kill profit? (Answer with data)
# → Scatter: Discount vs Profit + regression line.

# Chart 6: Heatmap — Profit by Category and Region
# → Pivot table → sns.heatmap
```

Add a **markdown title cell** before each chart explaining what it reveals.

**Submission:** `week3_sales_story.ipynb` → push to GitHub

---

## 📝 Week 3 Checklist

- [ ] Can name the right chart type for 5 different question types
- [ ] Completed Matplotlib, Seaborn, and Plotly exercises
- [ ] Mini project: Sales Story complete (6 charts + written insights)
- [ ] Every chart has a descriptive title, labelled axes, and a 1-line insight below it
- [ ] Peer review done

---

## 🔗 Resources

- [Seaborn Gallery](https://seaborn.pydata.org/examples/index.html)
- [Plotly Express Documentation](https://plotly.com/python/plotly-express/)
- [The Data Visualisation Catalogue](https://datavizcatalogue.com/) — when to use which chart
- [Kaggle Data Visualization Course](https://www.kaggle.com/learn/data-visualization)

---

## 💬 Reflection Prompt

> *"Your manager asks you: 'Show me which city has the most revenue.' You have 15 cities in your dataset. Would you use a pie chart or a bar chart? Why? When does a pie chart ever make sense?"*

---

**Next week:** We move into statistics — the mathematical backbone of all data science. Don't worry, we keep it applied and practical.

---

*← [Week 2](./week-02.md) | [Programme Index](./index.md) | [Week 4 →](./week-04.md)*
