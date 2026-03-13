# Week 11 — AI APIs + Advanced Prompt Engineering

**Phase:** Internship | **Duration:** ~6 hours  
**AI Policy:** ✅ This week IS about AI. Master it.

---

## 🎯 Week Goal

By end of this week, you will:
- Call the OpenAI/Gemini API from a Colab notebook
- Use AI to generate data insights, summaries, and reports
- Apply advanced prompt engineering techniques (CoT, self-critique, RAG patterns)
- Integrate one AI-powered feature into your capstone project

---

## 📖 Day 1 — Calling AI APIs in Colab

### Setting Up API Access (Free Tier)

```python
# Option 1: Google Gemini (free tier available)
# Get API key: https://aistudio.google.com/app/apikey
# Install: !pip install google-generativeai

import google.generativeai as genai
from google.colab import userdata

# Store key securely in Colab secrets (not hardcoded!)
# Colab → click 🔑 icon on left sidebar → add GEMINI_API_KEY
API_KEY = userdata.get("GEMINI_API_KEY")

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Simple test
response = model.generate_content("What are the 3 most important metrics for evaluating a classification model? Be concise.")
print(response.text)
```

```python
# Option 2: OpenAI (if you have access)
# !pip install openai

import openai
from google.colab import userdata

client = openai.OpenAI(api_key=userdata.get("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a data science expert. Be concise and practical."},
        {"role": "user", "content": "Explain overfitting in 3 sentences for a beginner."}
    ],
    max_tokens=200
)
print(response.choices[0].message.content)
```

### Safe API Usage Patterns

```python
import time

def safe_api_call(prompt, model, retries=3, delay=2):
    """
    Call AI API with retry logic and error handling.
    """
    for attempt in range(retries):
        try:
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Attempt {attempt+1} failed: {e}")
            if attempt < retries - 1:
                time.sleep(delay * (attempt + 1))  # Exponential backoff
    return None

result = safe_api_call("Explain the difference between precision and recall", model)
print(result)
```

---

## 📖 Day 2 — Advanced Prompt Engineering

### Technique 1: Chain of Thought (CoT)

Force the model to reason step-by-step before giving an answer.

```python
def analyze_with_cot(data_summary):
    prompt = f"""
You are a senior data analyst reviewing a project report.

Think step by step:
1. First, identify what type of business problem this is
2. Then, evaluate if the metrics reported are appropriate for this problem
3. Then, identify the single most important finding
4. Finally, give one concrete recommendation

Data Summary:
{data_summary}

Format your response as:
STEP 1 (Problem Type): ...
STEP 2 (Metrics Check): ...
STEP 3 (Key Finding): ...
RECOMMENDATION: ...
"""
    return safe_api_call(prompt, model)

# Test with your project data
sales_summary = """
- Dataset: 3 years of retail sales data, 9,994 transactions
- Total Revenue: ₹2.3M, Total Profit: ₹286K (profit margin: 12.4%)
- Discount correlation with profit: -0.22 (moderate negative)
- Furniture category: highest revenue (₹742K) but lowest profit margin (2.1%)
- Technology category: second-highest revenue (₹836K), highest margin (17.4%)
- Top performing region: West (₹725K revenue)
- Best year: 2017 (32% growth over 2015)
"""

result = analyze_with_cot(sales_summary)
print(result)
```

### Technique 2: Self-Critique Pattern

Have the AI review its own output.

```python
def generate_and_critique(prompt, model):
    """
    Generate an answer, then ask the AI to critique and improve it.
    """
    # Round 1: Initial response
    initial = safe_api_call(prompt, model)
    
    # Round 2: Self-critique
    critique_prompt = f"""
Here is a data science explanation I wrote:

{initial}

Please critique this for:
1. Accuracy — is anything technically wrong?
2. Clarity — would a beginner understand it?
3. Completeness — is anything important missing?

Then provide an improved version.
"""
    improved = safe_api_call(critique_prompt, model)
    return initial, improved

initial, improved = generate_and_critique(
    "Explain why we should use cross-validation instead of a simple train/test split",
    model
)

print("=== INITIAL ===\n", initial)
print("\n=== IMPROVED ===\n", improved)
```

### Technique 3: Structured Output (JSON Mode)

```python
import json

def get_structured_insight(data_description):
    prompt = f"""
Analyze this data and respond ONLY in valid JSON format. No explanation, no markdown.

Data:
{data_description}

JSON structure to return:
{{
  "key_finding": "The single most important thing to know",
  "risk": "The biggest concern in this data",
  "opportunity": "The best growth opportunity identified",
  "recommended_action": "One specific action the business should take",
  "confidence": "High / Medium / Low",
  "confidence_reason": "Why you rated confidence this way"
}}
"""
    response = safe_api_call(prompt, model)
    
    # Clean and parse JSON
    clean = response.strip()
    if clean.startswith("```"):
        clean = clean.split("```")[1]
        if clean.startswith("json"):
            clean = clean[4:]
    
    try:
        return json.loads(clean)
    except json.JSONDecodeError:
        return {"error": "Failed to parse JSON", "raw": clean}

insight = get_structured_insight(sales_summary)
print(json.dumps(insight, indent=2))
```

### Technique 4: Role + Audience Targeting

```python
def explain_for_audience(concept, audience):
    """
    Same concept, different explanations for different audiences.
    """
    prompt = f"""
Explain "{concept}" for this specific audience: {audience}

Rules:
- Match vocabulary to their background
- Use one relevant analogy they would understand
- Keep it under 100 words
- End with one actionable takeaway for them
"""
    return safe_api_call(prompt, model)

audiences = [
    "a school principal with no tech background",
    "a Python developer switching to data science",
    "an investor evaluating a data startup"
]

for audience in audiences:
    print(f"\n--- For: {audience} ---")
    print(explain_for_audience("machine learning model overfitting", audience))
```

---

## 📖 Day 3 — AI-Powered Data Insight Generator

Build a reusable function that auto-generates insights from any DataFrame.

```python
def generate_df_insights(df, context="", model=model):
    """
    Automatically generate insights from a DataFrame using AI.
    
    Args:
        df: Pandas DataFrame
        context: Business context (what is this data about?)
        model: AI model to use
    
    Returns:
        dict with insights
    """
    # Prepare data summary
    stats = df.describe().round(2).to_string()
    nulls = df.isnull().sum()[df.isnull().sum() > 0].to_string()
    dtypes = df.dtypes.to_string()
    shape = df.shape
    sample = df.head(3).to_string()
    
    prompt = f"""
You are a senior data scientist reviewing a dataset.
Context: {context if context else "General business data"}

Dataset Overview:
- Shape: {shape[0]} rows × {shape[1]} columns
- Data types:\n{dtypes}
- Missing values:\n{nulls if nulls else "None"}

Statistical Summary:
{stats}

Sample rows:
{sample}

Provide exactly 5 insights in this format:
1. [FINDING]: One observation from the data
   [WHY IT MATTERS]: Business impact in one sentence

2. ...
(continue for all 5)

Also add:
BIGGEST_DATA_QUALITY_ISSUE: ...
MOST_PROMISING_FEATURE_FOR_ML: ...
"""
    return safe_api_call(prompt, model)

# Test with your project data
import pandas as pd
df = pd.read_csv("your_project_data.csv")  # Replace with your actual file
insights = generate_df_insights(df, context="Retail sales data from an e-commerce platform")
print(insights)
```

---

## 📖 Day 4 — Integrating AI into Your Capstone

### For Project 1 (Sales Dashboard)

```python
# Auto-generate executive summary
def generate_executive_summary(monthly_df, top_products, regional_data):
    prompt = f"""
Write a 200-word executive summary for a board presentation.
Use this data:

Monthly Revenue: {monthly_df[['Month', 'Revenue']].tail(6).to_string()}
Top Products: {top_products.head(5).to_string()}
Regional Performance: {regional_data.to_string()}

Format:
HEADLINE: (one powerful sentence)
PERFORMANCE: (what went well)
CONCERNS: (what needs attention)
RECOMMENDATION: (what to do next quarter)
"""
    return safe_api_call(prompt, model)
```

### For Project 2 (Sentiment Analyzer)

```python
# AI-powered sentiment explanation
def explain_sentiment_decision(review_text, model_prediction):
    prompt = f"""
A machine learning model predicted: {model_prediction}
For this customer review: "{review_text}"

Explain in 2 sentences:
1. What key words/phrases drove this sentiment classification?
2. Is this prediction likely correct? If not, what might the model be missing?

Be concise and direct.
"""
    return safe_api_call(prompt, model)

# Use in demo loop
sample_reviews = [
    ("The battery lasts 2 days. Super happy with this!", "Positive"),
    ("Arrived damaged. Not worth the hassle.", "Negative"),
]
for review, pred in sample_reviews:
    explanation = explain_sentiment_decision(review, pred)
    print(f"\nReview: {review}")
    print(f"Prediction: {pred}")
    print(f"Explanation: {explanation}")
```

### For Project 3 (Student Predictor)

```python
# Generate counsellor-friendly report
def generate_student_report(student_data, prediction, feature_importance):
    prompt = f"""
Write a student counselling report (150 words max) for a school administrator.

Student Profile:
{student_data}

Model Prediction: {prediction['prediction']} ({prediction['pass_probability']} pass probability)
Key Risk Factors (from model): {feature_importance}

Write in plain English. No jargon.
Format:
SUMMARY: (one sentence)
KEY RISK FACTORS: (bullet list of 3)
SUGGESTED INTERVENTIONS: (bullet list of 2 specific actions)
URGENCY LEVEL: Low / Medium / High
"""
    return safe_api_call(prompt, model)
```

---

## 📖 Day 5 — Capstone Integration + Polish

Each team's task this week:

```
✅ One AI-powered feature added to your project
   Project 1: Auto-generated executive summary from data
   Project 2: Sentiment explanation for each prediction
   Project 3: Counsellor report generation for at-risk students

✅ All notebooks clean and documented
   - Markdown headers for every section
   - No dead/unused code cells
   - Top-to-bottom runnable without errors

✅ README.md updated with:
   - Project description
   - How to run it
   - Sample outputs
   - Team credits
```

---

## 📝 Week 11 Deliverables

- [ ] AI API integrated and working in Colab notebook
- [ ] One AI-powered feature added to capstone
- [ ] `notebooks/03_ai_integration.ipynb` complete
- [ ] README.md updated in team repo
- [ ] Each team member can demo the AI feature live
- [ ] Draft presentation outline submitted

---

## 💬 Reflection Prompt

> *"You used AI to generate an 'executive summary' of your data. Your manager says: 'Can we trust this summary for the board meeting?' How do you verify it? What risks exist when AI summarises data for business decisions?"*

---

**Next week is the final stretch.** Polish your project, prepare your demo, and present like a professional.

---

*← [Week 10](./week-10.md) | [Programme Index](./index.md) | [Week 12 →](./week-12.md)*
