# Week 1 — Python for Data Science + Colab Setup

**Phase:** Learn | **Duration:** ~4–5 hours across the week  
**AI Policy:** 🚫 No AI assistance this week. Build the muscle yourself.

---

## 🎯 Week Goal

By end of this week, you will:
- Have Google Colab set up and running
- Understand Python data types, loops, and functions well enough to manipulate data
- Write your first data analysis script
- Complete your mini project: **Personal Expense Tracker (Python)**

---

## 📖 Day 1 — Google Colab + Python Refresher

### Setting Up Google Colab

Google Colab is a free, browser-based Jupyter notebook. No installation needed.

1. Go to [colab.research.google.com](https://colab.research.google.com)
2. Sign in with your Google account
3. Click **New Notebook**
4. Rename it to `week1_basics.ipynb`

**Key Colab shortcuts:**
- `Shift + Enter` — Run a cell
- `Ctrl + M B` — Add a cell below
- `Ctrl + M D` — Delete a cell

### Python Data Types Review

```python
# Numbers
age = 22          # int
gpa = 8.5         # float

# Strings
name = "Riya"
course = "Data Science"

# Boolean
is_enrolled = True

# Type check
print(type(age))       # <class 'int'>
print(type(gpa))       # <class 'float'>
```

### Lists and Dictionaries — The Data Science Workhorses

```python
# Lists — ordered, changeable
marks = [82, 76, 91, 88, 79]
print(marks[0])       # 82
print(marks[-1])      # 79 (last item)
print(marks[1:4])     # [76, 91, 88]

# Average
average = sum(marks) / len(marks)
print(f"Average: {average:.2f}")

# Dictionary — key-value pairs (like a row of data)
student = {
    "name": "Riya",
    "age": 21,
    "marks": [82, 76, 91],
    "city": "Mumbai"
}

print(student["name"])    # Riya
print(student.get("age")) # 21
```

---

## 📖 Day 2 — Loops, Functions, and List Comprehensions

### Loops

```python
# For loop over a list
subjects = ["Math", "Python", "Stats", "SQL"]
for subject in subjects:
    print(f"Learning: {subject}")

# Range-based loop
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# While loop
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1
```

### Functions

```python
# Define a function
def calculate_grade(marks):
    avg = sum(marks) / len(marks)
    if avg >= 90:
        return "A"
    elif avg >= 75:
        return "B"
    elif avg >= 60:
        return "C"
    else:
        return "F"

# Call it
my_marks = [88, 92, 79, 85]
grade = calculate_grade(my_marks)
print(f"Grade: {grade}")   # Grade: B
```

### List Comprehensions — One-Line Loops

```python
# Traditional loop
squared = []
for n in range(1, 6):
    squared.append(n ** 2)

# List comprehension (same result, cleaner)
squared = [n ** 2 for n in range(1, 6)]
print(squared)  # [1, 4, 9, 16, 25]

# With condition
even_nums = [n for n in range(20) if n % 2 == 0]
print(even_nums)
```

---

## 📖 Day 3 — File Handling + Working with CSV Data

### Reading a CSV File (Pure Python — No Libraries Yet)

```python
# Create a sample CSV first (run this cell)
csv_content = """name,age,marks,city
Arjun,21,85,Delhi
Priya,22,91,Mumbai
Karan,20,78,Bangalore
Sneha,21,88,Chennai
Ravi,23,72,Hyderabad"""

with open("students.csv", "w") as f:
    f.write(csv_content)

print("File created!")
```

```python
# Read the CSV
import csv

students = []
with open("students.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        students.append(row)

# Print first student
print(students[0])
# {'name': 'Arjun', 'age': '21', 'marks': '85', 'city': 'Delhi'}

# Get all names
names = [s["name"] for s in students]
print(names)

# Average marks (note: marks is a string, convert to int)
marks_list = [int(s["marks"]) for s in students]
avg = sum(marks_list) / len(marks_list)
print(f"Class average: {avg:.1f}")
```

---

## 📖 Day 4 — Error Handling + Clean Code Habits

### Try-Except Blocks

```python
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"
    except TypeError:
        return "Error: Inputs must be numbers"

print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # Error: Cannot divide by zero
print(safe_divide(10, "x"))  # Error: Inputs must be numbers
```

### Clean Code Habits (Internship Standard)

```python
# ❌ Bad — unclear, no comments
def p(x):
    return sum(x)/len(x)

# ✅ Good — clear name, docstring, handles edge case
def calculate_average(numbers: list) -> float:
    """
    Calculate the arithmetic mean of a list of numbers.
    
    Args:
        numbers: List of numeric values
        
    Returns:
        Float representing the average
    """
    if not numbers:
        raise ValueError("Cannot calculate average of empty list")
    return sum(numbers) / len(numbers)
```

> **Internship Rule:** Write code for the person who reads it next, not just to make it run.

---

## 📖 Day 5 — Mini Project Day

### 🛠️ Mini Project: Personal Expense Tracker

**Goal:** Build a command-line expense tracker using pure Python.

**Features to build:**
1. Add expenses (category, amount, date)
2. View all expenses
3. Calculate total spent per category
4. Find highest and lowest expense

```python
# Starter scaffold — complete the TODOs

expenses = []

def add_expense(category, amount, date):
    """Add a new expense entry."""
    expense = {
        "category": category,
        "amount": float(amount),
        "date": date
    }
    expenses.append(expense)
    print(f"✅ Added: {category} - ₹{amount}")

def view_expenses():
    """Print all expenses in a readable format."""
    if not expenses:
        print("No expenses yet.")
        return
    print("\n--- Your Expenses ---")
    for i, exp in enumerate(expenses, 1):
        print(f"{i}. [{exp['date']}] {exp['category']}: ₹{exp['amount']}")

def total_by_category():
    """TODO: Calculate and print total spent per category."""
    # Hint: Use a dictionary to accumulate totals
    pass

def expense_summary():
    """TODO: Print highest, lowest, and overall total."""
    pass

# Test your tracker
add_expense("Food", 250, "2025-01-15")
add_expense("Transport", 80, "2025-01-15")
add_expense("Food", 320, "2025-01-16")
add_expense("Books", 450, "2025-01-16")
add_expense("Entertainment", 600, "2025-01-17")

view_expenses()
total_by_category()
expense_summary()
```

**Submission:** Save your completed notebook as `week1_expense_tracker.ipynb` and push to GitHub.

---

## 📝 Week 1 Checklist

- [ ] Google Colab account set up
- [ ] GitHub repo created: `ds-internship-yourname`
- [ ] Completed all 4 practice notebooks
- [ ] Mini project: Expense Tracker complete and submitted
- [ ] Peer review: Reviewed at least one teammate's notebook

---

## 🔗 Resources

- [Google Colab Getting Started](https://colab.research.google.com/notebooks/intro.ipynb)
- [Python Official Docs](https://docs.python.org/3/tutorial/)
- [Kaggle Python Course (Free)](https://www.kaggle.com/learn/python)
- Dataset used this week: None (we created our own data)

---

## 💬 Reflection Prompt

Answer this in your notebook as a markdown cell:

> *"What is the difference between a list and a dictionary in Python? When would you use each for data work?"*

---

**Next week:** We bring in Pandas and NumPy — the real engines of data science. Your expense tracker data becomes a proper DataFrame.

---

*← [Programme Index](./index.md) | [Week 2 →](./week-02.md)*
