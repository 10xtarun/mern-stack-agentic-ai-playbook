# Week 5 — SQL + Exploratory Data Analysis (EDA)

**Phase:** Learn | **Duration:** ~5–6 hours across the week  
**AI Policy:** 🚫 No AI this week. Write every SQL query yourself.

---

## 🎯 Week Goal

By end of this week, you will:
- Write SQL queries to slice, group, and join data like a data analyst
- Run a complete EDA workflow from raw data to insights
- Build an EDA template you can reuse on any new dataset
- Complete your mini project: **E-Commerce Customer EDA**

---

## 📖 Day 1 — SQL Fundamentals in Colab

We can run SQL in Colab using SQLite and the `sqlite3` library — no database server needed.

### Setup

```python
import sqlite3
import pandas as pd
import numpy as np

# Create an in-memory SQLite database
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

# Create a sample table
cursor.execute("""
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    product TEXT,
    category TEXT,
    quantity INTEGER,
    unit_price REAL,
    order_date TEXT,
    city TEXT,
    region TEXT
)
""")

# Insert sample data
import random
random.seed(42)
categories = {"Electronics": [500, 5000], "Clothing": [200, 2000], "Books": [100, 800], "Home": [300, 3000]}
cities = [("Mumbai", "West"), ("Delhi", "North"), ("Bangalore", "South"), ("Chennai", "South"), ("Kolkata", "East")]

for i in range(1, 201):
    cat = random.choice(list(categories.keys()))
    low, high = categories[cat]
    city, region = random.choice(cities)
    cursor.execute("INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", (
        i,
        random.randint(1001, 1050),
        f"{cat} Item {random.randint(1,10)}",
        cat,
        random.randint(1, 5),
        round(random.uniform(low, high), 2),
        f"2024-{random.randint(1,12):02d}-{random.randint(1,28):02d}",
        city,
        region
    ))
conn.commit()
print("Database ready with 200 orders.")
```

### Core SQL Queries

```python
# Helper: Run SQL and return DataFrame
def sql(query):
    return pd.read_sql_query(query, conn)

# --- SELECT & WHERE ---
sql("SELECT * FROM orders WHERE category = 'Electronics' LIMIT 5")

# --- Calculated columns ---
sql("""
SELECT 
    order_id,
    product,
    quantity,
    unit_price,
    quantity * unit_price AS total_value
FROM orders
ORDER BY total_value DESC
LIMIT 10
""")

# --- Aggregate functions ---
sql("""
SELECT
    COUNT(*) AS total_orders,
    SUM(quantity * unit_price) AS total_revenue,
    AVG(unit_price) AS avg_price,
    MIN(unit_price) AS min_price,
    MAX(unit_price) AS max_price
FROM orders
""")
```

---

## 📖 Day 2 — GROUP BY, HAVING, and Sorting

```python
# --- Revenue by category ---
sql("""
SELECT 
    category,
    COUNT(*) AS num_orders,
    SUM(quantity * unit_price) AS total_revenue,
    ROUND(AVG(unit_price), 2) AS avg_price
FROM orders
GROUP BY category
ORDER BY total_revenue DESC
""")

# --- HAVING: filter after aggregation (not WHERE) ---
# Customers with more than 5 orders
sql("""
SELECT 
    customer_id,
    COUNT(*) AS order_count,
    SUM(quantity * unit_price) AS total_spent
FROM orders
GROUP BY customer_id
HAVING order_count > 5
ORDER BY total_spent DESC
LIMIT 10
""")

# --- Regional performance ---
sql("""
SELECT 
    region,
    city,
    COUNT(*) AS orders,
    ROUND(SUM(quantity * unit_price), 2) AS revenue
FROM orders
GROUP BY region, city
ORDER BY region, revenue DESC
""")
```

---

## 📖 Day 3 — JOINs and Subqueries

```python
# Create a customers table
cursor.execute("""
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    membership TEXT
)
""")

memberships = ["Silver", "Gold", "Platinum"]
for cid in range(1001, 1051):
    cursor.execute("INSERT INTO customers VALUES (?, ?, ?, ?)", (
        cid,
        f"Customer {cid - 1000}",
        random.randint(22, 60),
        random.choice(memberships)
    ))
conn.commit()

# --- INNER JOIN ---
sql("""
SELECT 
    c.name,
    c.membership,
    COUNT(o.order_id) AS orders,
    ROUND(SUM(o.quantity * o.unit_price), 2) AS total_spent
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total_spent DESC
LIMIT 10
""")

# --- Subquery: customers who spent above average ---
sql("""
SELECT c.name, c.membership, totals.total_spent
FROM customers c
JOIN (
    SELECT customer_id, ROUND(SUM(quantity * unit_price), 2) AS total_spent
    FROM orders
    GROUP BY customer_id
) AS totals ON c.customer_id = totals.customer_id
WHERE totals.total_spent > (
    SELECT AVG(quantity * unit_price) * 10 FROM orders
)
ORDER BY total_spent DESC
""")
```

---

## 📖 Day 4 — Exploratory Data Analysis (EDA) Framework

EDA is the structured process of understanding a new dataset. Use this framework on every dataset you encounter.

### The EDA Checklist

```python
# STEP 1: Load and Shape
df = pd.read_csv("your_data.csv")
print(f"Shape: {df.shape}")
print(f"Columns: {list(df.columns)}")

# STEP 2: Data Types + Missing Values
print(df.dtypes)
print("\nMissing values:")
missing = df.isnull().sum()
missing_pct = (df.isnull().sum() / len(df) * 100).round(2)
missing_report = pd.DataFrame({"count": missing, "percent": missing_pct})
print(missing_report[missing_report["count"] > 0])

# STEP 3: Statistical Summary
print(df.describe())

# STEP 4: Categorical columns — value counts
for col in df.select_dtypes(include="object").columns:
    print(f"\n{col} ({df[col].nunique()} unique):")
    print(df[col].value_counts().head(5))

# STEP 5: Distribution of key numeric columns
numeric_cols = df.select_dtypes(include=np.number).columns
df[numeric_cols].hist(bins=20, figsize=(14, 8))
plt.suptitle("Distribution of Numeric Variables")
plt.tight_layout()
plt.show()

# STEP 6: Outlier detection using IQR
def find_outliers(series):
    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    outliers = series[(series < lower) | (series > upper)]
    return len(outliers), lower, upper

for col in numeric_cols:
    n_out, lo, hi = find_outliers(df[col])
    if n_out > 0:
        print(f"{col}: {n_out} outliers (expected range: {lo:.2f} – {hi:.2f})")

# STEP 7: Correlation heatmap
plt.figure(figsize=(10, 8))
sns.heatmap(df[numeric_cols].corr(), annot=True, cmap="coolwarm", fmt=".2f", center=0)
plt.title("Correlation Matrix")
plt.show()
```

---

## 📖 Day 5 — Mini Project Day

### 🛠️ Mini Project: E-Commerce Customer EDA

**Dataset:** [E-Commerce Customers Dataset](https://www.kaggle.com/datasets/srolka/ecommerce-customers)

```python
url = "https://raw.githubusercontent.com/dsrscientist/dataset1/master/Ecommerce_Customers.csv"
df = pd.read_csv(url)
df.head()
```

**Run the full EDA framework, then answer these 6 business questions:**

```python
# Q1: What does the average customer look like?
# → Age, session length, time on app vs website, membership length

# Q2: Which factors are most correlated with yearly spending?
# → Correlation heatmap + written interpretation

# Q3: Does time spent on the app predict more spending than time on the website?
# → Scatter plots for both, compare correlation coefficients

# Q4: Who are the top 10% spenders? What do they have in common?
# → Filter top 10%, compare their averages to the rest

# Q5: How does membership length affect yearly spending?
# → Scatter plot + trend line

# Q6: What should the business focus on — improving the app or the website?
# → Data-backed recommendation in a markdown cell (3–4 sentences)
```

**Submission:** `week5_customer_eda.ipynb` → GitHub

---

## 📝 Week 5 Checklist

- [ ] Can write SELECT, WHERE, GROUP BY, HAVING, and JOIN queries
- [ ] EDA template saved in your GitHub as a reusable notebook
- [ ] Mini project: E-Commerce EDA complete with business recommendations
- [ ] Each insight is written in plain English in a markdown cell
- [ ] Peer review done

---

## 🔗 Resources

- [SQLBolt — Interactive SQL Tutorial](https://sqlbolt.com/)
- [Mode SQL Tutorial](https://mode.com/sql-tutorial/)
- [Pandas + SQL Comparison](https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html)
- [Towards Data Science — EDA Guide](https://towardsdatascience.com/exploratory-data-analysis-8fc1cb20fd15)

---

## 💬 Reflection Prompt

> *"You are given a new dataset about hospital patient data. Walk me through your EDA process, step by step, before writing a single line of code. What are the first five questions you would ask?"*

---

**Next week:** The big one — Machine Learning fundamentals. Plus, your first taste of AI Prompt Engineering. This is the bridge between data analysis and data science.

---

*← [Week 4](./week-04.md) | [Programme Index](./index.md) | [Week 6 →](./week-06.md)*
