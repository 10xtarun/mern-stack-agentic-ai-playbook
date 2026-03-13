# Week 8 — Deep Learning Basics + NLP Introduction

**Phase:** Internship | **Duration:** ~6 hours across the week  
**AI Policy:** ✅ Use AI actively. Prompt it to explain concepts, then verify by coding.

---

## 🎯 Week Goal

By end of this week, you will:
- Understand what neural networks are and how they learn
- Build a simple neural network using TensorFlow/Keras
- Process text data for NLP tasks (tokenization, vectorization)
- Train a basic text classifier (foundation for Project 2)

---

## 📖 Day 1 — Neural Networks: The Big Picture

### From Decision Trees to Neural Networks

```
Linear Regression:  y = w₁x₁ + w₂x₂ + b
                    One layer, no hidden complexity

Neural Network:     Input Layer → Hidden Layer(s) → Output Layer
                    Multiple transformations, learns patterns automatically
```

### How a Neural Network Learns

```python
# The core idea — simplified
import numpy as np

# A single "neuron" (perceptron)
def neuron(inputs, weights, bias):
    weighted_sum = np.dot(inputs, weights) + bias
    # Activation function (sigmoid: squashes to 0–1)
    output = 1 / (1 + np.exp(-weighted_sum))
    return output

# Example: Will this customer buy? (income, age, past_purchases)
inputs = np.array([0.8, 0.3, 0.9])  # normalized values
weights = np.array([0.5, -0.2, 0.7])
bias = -0.1

output = neuron(inputs, weights, bias)
print(f"Probability of purchase: {output:.3f}")
```

### Activation Functions (Why They Matter)

```python
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 100)

# ReLU (most common in hidden layers)
relu = np.maximum(0, x)

# Sigmoid (binary classification output)
sigmoid = 1 / (1 + np.exp(-x))

# Tanh
tanh = np.tanh(x)

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

for ax, y, name, color in zip(axes, [relu, sigmoid, tanh],
                               ["ReLU", "Sigmoid", "Tanh"],
                               ["#7C3AED", "#059669", "#D97706"]):
    ax.plot(x, y, color=color, lw=2.5)
    ax.set_title(f"{name} Activation Function")
    ax.axhline(0, color="gray", lw=0.5)
    ax.axvline(0, color="gray", lw=0.5)
    ax.grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

---

## 📖 Day 2 — Building a Neural Network with Keras

```python
import tensorflow as tf
from tensorflow import keras
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Check version
print(f"TensorFlow: {tf.__version__}")

# --- Load breast cancer classification dataset ---
data = load_breast_cancer()
X, y = data.data, data.target

print(f"Features: {data.feature_names[:5]}...")
print(f"Classes: {data.target_names}")  # [malignant, benign]
print(f"Shape: {X.shape}")  # (569, 30)

# Scale features
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

```python
# --- Build the model ---
model = keras.Sequential([
    keras.layers.Dense(32, activation="relu", input_shape=(X_train.shape[1],)),
    keras.layers.Dropout(0.3),        # Prevent overfitting
    keras.layers.Dense(16, activation="relu"),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(1, activation="sigmoid")  # Binary output
])

model.summary()

# Compile
model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)
```

```python
# --- Train ---
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# Evaluate
test_loss, test_accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f"\nTest Accuracy: {test_accuracy:.3f}")
```

```python
# --- Plot training history ---
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

axes[0].plot(history.history["accuracy"], label="Train")
axes[0].plot(history.history["val_accuracy"], label="Validation")
axes[0].set_title("Model Accuracy Over Epochs")
axes[0].set_xlabel("Epoch")
axes[0].legend()

axes[1].plot(history.history["loss"], label="Train")
axes[1].plot(history.history["val_loss"], label="Validation")
axes[1].set_title("Model Loss Over Epochs")
axes[1].set_xlabel("Epoch")
axes[1].legend()

plt.tight_layout()
plt.show()
```

---

## 📖 Day 3 — Introduction to Natural Language Processing (NLP)

NLP = teaching machines to understand human language.

### Step 1: Text Preprocessing

```python
import re
import string
from collections import Counter

# Raw text sample
reviews = [
    "This product is absolutely AMAZING! Best purchase ever :)",
    "Terrible quality. Broke after 2 days. DO NOT BUY!!",
    "It's okay, nothing special. Average product for the price.",
    "Loved it! Fast shipping and great customer service 5/5",
    "Waste of money... very disappointed with this garbage."
]

def preprocess_text(text):
    """Clean text for ML processing."""
    # 1. Lowercase
    text = text.lower()
    # 2. Remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))
    # 3. Remove numbers
    text = re.sub(r"\d+", "", text)
    # 4. Remove extra whitespace
    text = " ".join(text.split())
    return text

cleaned = [preprocess_text(r) for r in reviews]
for original, clean in zip(reviews, cleaned):
    print(f"Original: {original}")
    print(f"Cleaned:  {clean}\n")
```

### Step 2: TF-IDF Vectorization

```python
from sklearn.feature_extraction.text import TfidfVectorizer

# More reviews
reviews_large = [
    "This product is amazing excellent quality highly recommend",
    "Terrible quality waste of money do not buy",
    "Great product fast shipping would buy again",
    "Broken on arrival worst purchase ever terrible",
    "Average product nothing special okay for the price",
    "Love it perfect gift excellent excellent quality",
    "Disappointed very poor quality not worth it terrible",
    "Super happy with this purchase great value amazing",
]
labels = [1, 0, 1, 0, 1, 1, 0, 1]  # 1=Positive, 0=Negative

# TF-IDF: Term Frequency × Inverse Document Frequency
# Gives high weight to important words, low weight to common words
vectorizer = TfidfVectorizer(
    max_features=20,
    ngram_range=(1, 2),  # Include single words and 2-word phrases
    stop_words="english"
)

X = vectorizer.fit_transform(reviews_large)
feature_names = vectorizer.get_feature_names_out()

print("TF-IDF Matrix shape:", X.shape)
print("Top features:", feature_names[:10])

# View as DataFrame
tfidf_df = pd.DataFrame(X.toarray(), columns=feature_names)
print(tfidf_df.head())
```

### Step 3: Train a Text Classifier

```python
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# Use scikit-learn pipeline for clean flow
from sklearn.pipeline import Pipeline

text_pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(max_features=500, ngram_range=(1, 2), stop_words="english")),
    ("classifier", LogisticRegression(max_iter=1000))
])

# With more data (load from CSV/Kaggle in real project)
X_texts = reviews_large
y_labels = labels

# Split
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X_texts, y_labels, test_size=0.3, random_state=42)

text_pipeline.fit(X_train, y_train)
y_pred = text_pipeline.predict(X_test)

# Test with new reviews
new_reviews = [
    "This is the best thing I've ever bought!",
    "Complete garbage, broke immediately.",
    "Pretty decent, nothing outstanding."
]

predictions = text_pipeline.predict(new_reviews)
for review, pred in zip(new_reviews, predictions):
    sentiment = "✅ Positive" if pred == 1 else "❌ Negative"
    print(f"{sentiment} | {review}")
```

---

## 📖 Day 4 — NLP with Larger Datasets

```python
# Working with the Amazon Reviews dataset (Project 2 foundation)
# Load a sample (full dataset is large — use first 10,000 rows)

try:
    df = pd.read_csv("/content/Reviews.csv", nrows=10000)
except FileNotFoundError:
    # Synthetic version for practice
    np.random.seed(42)
    sentiments = ["POSITIVE", "NEGATIVE", "NEUTRAL"]
    positive_phrases = ["great product", "love it", "excellent quality", "highly recommend", "best purchase"]
    negative_phrases = ["terrible", "broken", "waste of money", "do not buy", "disappointed"]
    neutral_phrases = ["okay", "average", "nothing special", "does the job", "as expected"]
    
    texts, labels = [], []
    for _ in range(1000):
        sent = np.random.choice(sentiments, p=[0.5, 0.3, 0.2])
        if sent == "POSITIVE":
            phrase = np.random.choice(positive_phrases)
        elif sent == "NEGATIVE":
            phrase = np.random.choice(negative_phrases)
        else:
            phrase = np.random.choice(neutral_phrases)
        texts.append(f"Product review: {phrase} overall")
        labels.append(sent)
    
    df = pd.DataFrame({"Text": texts, "Sentiment": labels})

print(df.head())
print(f"\nClass distribution:\n{df['Sentiment'].value_counts()}")
```

---

## 📖 Day 5 — Capstone Group Work Session

This is your first dedicated group work block. By end of this week:

### Deliverables for All Groups

```
✅ GitHub repo set up with proper structure:
   capstone-project-name/
   ├── README.md
   ├── data/
   │   └── raw/          (gitignore large files)
   ├── notebooks/
   │   ├── 01_eda.ipynb
   │   └── 02_model.ipynb
   ├── docs/
   │   └── proposal.md
   └── requirements.txt

✅ Dataset loaded and initial EDA run
✅ At least 5 observations noted from EDA
✅ Each team member has pushed at least one commit
```

### Group Stand-Up Format

Post this in your WhatsApp group every Monday:

```
[WEEK 8 STAND-UP — Team Name]
✅ Done: ...
🔄 In Progress: ...
⛔ Blocked by: ...
🎯 This week's goal: ...
```

---

## 📝 Week 8 Checklist

- [ ] Neural network built and trained on breast cancer dataset
- [ ] Text preprocessing pipeline implemented
- [ ] TF-IDF vectorizer understood and tested
- [ ] Text classifier working with demo predictions
- [ ] Capstone GitHub repo created with proper structure
- [ ] Week 8 stand-up posted in group

---

## 🔗 Resources

- [TensorFlow/Keras Getting Started](https://www.tensorflow.org/tutorials)
- [Scikit-learn Text Feature Extraction](https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction)
- [Practical NLP for Python — free chapters](https://www.nltk.org/book/)
- [Fast.ai NLP Course (free)](https://course.fast.ai/)

---

## 💬 Reflection Prompt

> *"Your sentiment classifier gets 85% accuracy. Your manager says 'sounds good, let's ship it.' What questions do you ask before agreeing? What could go wrong in production?"*

---

**Next week:** Capstone Sprint 1 — your group builds the data pipeline and completes the EDA phase of your project.

---

*← [Week 7](./week-07.md) | [Programme Index](./index.md) | [Week 9 →](./week-09.md)*
