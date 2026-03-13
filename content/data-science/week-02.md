# Week 2 — Data Wrangling with Pandas & NumPy

**Phase:** Learn | **Duration:** ~5 hours across the week  
**AI Policy:** 🚫 No AI assistance this week. Wrestle with the data yourself.

---

## 🎯 Week Goal

By end of this week, you will:
- Load, inspect, and clean real-world datasets using Pandas
- Perform aggregations, groupings, and filters like a data analyst
- Understand NumPy arrays and why they matter
- Complete your mini project: **Student Dataset Analysis**

---

## 📖 Day 1 — Introduction to Pandas

Pandas is the most important library in data science for working with tabular data. Think of it as Excel, but programmable.

### Installing / Importing

```python
# Colab already has Pandas. Just import it.
import pandas as pd
import numpy as np

print(pd.__version__)
```

### Creating a DataFrame

```python
# From a dictionary
data = {
    "name": ["Arjun", "Priya", "Karan", "Sneha", "Ravi"],
    "age": [21, 22, 20, 21, 23],
    "marks": [85, 91, 78, 88, 72],
    "city": ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
    "passed": [True, True, True, True, False]
}

df = pd.DataFrame(data)
print(df)
```

### Essential Inspection Methods

```python
df.shape        # (rows, columns) → (5, 5)
df.dtypes       # Data type of each column
df.head(3)      # First 3 rows
df.tail(2)      # Last 2 rows
df.info()       # Summary: types, non-null counts
df.describe()   # Stats: mean, std, min, max, quartiles
df.columns      # Column names
df.index        # Row index
```

---

## 📖 Day 2 — Selecting, Filtering, and Slicing

### Selecting Columns

```python
# Single column → returns a Series
print(df["name"])

# Multiple columns → returns a DataFrame
print(df[["name", "marks"]])
```

### Filtering Rows

```python
# Students with marks > 80
top_students = df[df["marks"] > 80]
print(top_students)

# Multiple conditions
# AND: use &   OR: use |   NOT: use ~
mumbai_toppers = df[(df["city"] == "Mumbai") & (df["marks"] > 80)]

# Students who failed
failed = df[df["passed"] == False]
```

### loc vs iloc

```python
# loc — label-based (use column names)
df.loc[0, "name"]           # First row, name column
df.loc[0:2, ["name", "marks"]]  # Rows 0 to 2, selected columns

# iloc — position-based (use numbers)
df.iloc[0, 0]               # Row 0, Column 0
df.iloc[0:3, 0:2]           # First 3 rows, first 2 columns
```

---

## 📖 Day 3 — Cleaning Messy Data

Real-world data is dirty. Cleaning it is 60–70% of every data job.

### Working with Missing Values

```python
# Create messy data
messy_data = {
    "name": ["Arjun", "Priya", None, "Sneha", "Ravi"],
    "age": [21, None, 20, 21, 23],
    "marks": [85, 91, 78, None, 72],
    "city": ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"]
}

df2 = pd.DataFrame(messy_data)

# Detect missing values
print(df2.isnull())        # Boolean DataFrame
print(df2.isnull().sum())  # Count per column
print(f"Total missing: {df2.isnull().sum().sum()}")
```

```python
# Strategy 1: Drop rows with any missing value
df_dropped = df2.dropna()

# Strategy 2: Fill missing with a value
df_filled = df2.fillna({
    "name": "Unknown",
    "age": df2["age"].mean(),      # Fill numeric with mean
    "marks": df2["marks"].median() # Fill with median
})

# Strategy 3: Forward fill (for time series)
df_ffill = df2.fillna(method="ffill")
```

### Removing Duplicates

```python
# Create data with duplicates
df3 = pd.DataFrame({
    "name": ["Arjun", "Priya", "Arjun", "Karan"],
    "marks": [85, 91, 85, 78]
})

print(df3.duplicated())    # Which rows are duplicates
df_clean = df3.drop_duplicates()
```

### Fixing Data Types

```python
# Marks stored as strings? Convert them.
df4 = pd.DataFrame({"marks": ["85", "91", "78", "88"]})
df4["marks"] = df4["marks"].astype(int)

# String to datetime
df5 = pd.DataFrame({"date": ["2025-01-15", "2025-01-16"]})
df5["date"] = pd.to_datetime(df5["date"])
print(df5.dtypes)
```

---

## 📖 Day 4 — Aggregation, GroupBy, and NumPy

### GroupBy — The Most Powerful Pandas Tool

```python
# Use the original student DataFrame
data = {
    "name": ["Arjun", "Priya", "Karan", "Sneha", "Ravi", "Meera", "Dev"],
    "city": ["Delhi", "Mumbai", "Delhi", "Chennai", "Mumbai", "Delhi", "Chennai"],
    "marks": [85, 91, 78, 88, 72, 95, 80],
    "subject": ["Math", "Python", "Math", "Stats", "Python", "Stats", "Math"]
}
df = pd.DataFrame(data)

# Average marks by city
city_avg = df.groupby("city")["marks"].mean()
print(city_avg)

# Multiple aggregations at once
city_stats = df.groupby("city")["marks"].agg(["mean", "max", "min", "count"])
print(city_stats)

# Group by multiple columns
subject_city = df.groupby(["city", "subject"])["marks"].mean()
print(subject_city)
```

### Sorting and Ranking

```python
# Sort by marks descending
df_sorted = df.sort_values("marks", ascending=False)

# Get top 3
top3 = df.nlargest(3, "marks")

# Add a rank column
df["rank"] = df["marks"].rank(ascending=False).astype(int)
```

### NumPy — Fast Math on Arrays

```python
import numpy as np

# NumPy array vs Python list
python_list = [1, 2, 3, 4, 5]
np_array = np.array([1, 2, 3, 4, 5])

# Operations on entire array (no loop needed)
print(np_array * 2)          # [2 4 6 8 10]
print(np_array ** 2)         # [1 4 9 16 25]
print(np.sqrt(np_array))     # [1.0 1.41 1.73 2.0 2.23]

# Statistical functions
marks = np.array([85, 91, 78, 88, 72, 95, 80])
print(f"Mean: {np.mean(marks):.2f}")
print(f"Median: {np.median(marks):.2f}")
print(f"Std Dev: {np.std(marks):.2f}")
print(f"Min: {np.min(marks)}, Max: {np.max(marks)}")
```

---

## 📖 Day 5 — Mini Project Day

### 🛠️ Mini Project: Student Dataset Analysis

**Dataset:** Download from [Kaggle — Students Performance Dataset](https://www.kaggle.com/datasets/spscientist/students-performance-in-exams)

Or use this quick loader in Colab:

```python
# Quick way to get the dataset in Colab
url = "https://raw.githubusercontent.com/dsrscientist/dataset1/master/StudentsPerformance.csv"
df = pd.read_csv(url)
df.head()
```

**Your Tasks (answer each as a markdown cell + code):**

```python
# Task 1: Basic Inspection
# - How many students are in the dataset?
# - What columns exist? What data types?
# - Are there any missing values?

# Task 2: Top Performers
# - Who are the top 10 students by math score?
# - What is the average score for each subject?

# Task 3: Group Analysis
# - Does parental education level affect average scores?
# - Compare average scores: students who completed test prep vs those who didn't

# Task 4: New Columns
# - Add a column "total_score" = sum of all 3 subject scores
# - Add a column "grade" = A (>85), B (70-85), C (55-70), F (<55) based on total_score

# Task 5: Save clean data
df_clean.to_csv("students_clean.csv", index=False)
print("Saved!")
```

**Submission:** `week2_student_analysis.ipynb` → push to GitHub

---

## 📝 Week 2 Checklist

- [ ] Completed all Pandas practice exercises
- [ ] Understand missing value strategies (when to drop vs fill)
- [ ] Mini project: Student Dataset Analysis complete
- [ ] Notebook is clean with markdown explanations between code cells
- [ ] Peer review done

---

## 🔗 Resources

- [Pandas Official Docs](https://pandas.pydata.org/docs/)
- [Pandas Cheat Sheet (PDF)](https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf)
- [NumPy Quickstart](https://numpy.org/doc/stable/user/quickstart.html)
- [Kaggle Pandas Course (Free)](https://www.kaggle.com/learn/pandas)

---

## 💬 Reflection Prompt

> *"You have a dataset where 30% of the 'salary' column is missing. Would you drop those rows or fill them? What would you fill with — mean, median, or a fixed value? Why does it matter?"*

---

**Next week:** Your data becomes a picture. We learn how to visualise data to find patterns that numbers alone cannot tell you.

---

*← [Week 1](./week-01.md) | [Programme Index](./index.md) | [Week 3 →](./week-03.md)*
