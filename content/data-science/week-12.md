# Week 12 — Capstone Polish + Demo Day

**Phase:** Internship | **Duration:** ~8 hours across the week  
**AI Policy:** ✅ Use AI for writing, summarizing, and slide content.

---

## 🎯 Week Goal

This is your final week. You are not learning new concepts — you are **shipping**.

By end of this week, every team delivers:
1. A polished, complete capstone notebook (production quality)
2. A 10-minute demo presentation (slides + live walkthrough)
3. Individual reflection report
4. GitHub repo that you can share on LinkedIn and your resume

> **You are not just done with a course. You have completed a 3-month data internship.**

---

## 📋 Final Deliverable Checklist

### Capstone Notebook (Production Quality)

```markdown
Your final notebook must have this structure:

# [Project Name] — Team [Name]

## Executive Summary
(3-4 sentences — what problem, what you did, what you found, what you recommend)

## Team & Roles
| Member | Role | Notebooks Contributed |

## 1. Problem Statement
Why does this matter? Who benefits?

## 2. Dataset Overview
- Source, size, date range
- Key columns and their meaning

## 3. Data Cleaning & Preprocessing
- What issues did you find?
- What decisions did you make and why?

## 4. Exploratory Data Analysis
- 8+ visualizations
- Each with a title stating the finding
- Written insight after each chart

## 5. Model Development
- Models tried
- Evaluation metrics
- Why you chose the final model

## 6. Results & Key Findings
- Top 3-5 findings stated in plain English
- For business, not for data scientists

## 7. AI Integration
- What AI feature was added?
- Show it working

## 8. Limitations & What We Would Do Next
- Honest about what didn't work
- What would improve the model with more time/data?

## 9. Conclusion
- What did you learn?
- What would you do differently?
```

---

## 📊 Presentation Structure (10 Minutes)

### Slide Deck (8–10 slides)

```
Slide 1: Title + Team + Project Name
Slide 2: Problem Statement (why this matters)
Slide 3: Dataset Overview + Key EDA Finding
Slide 4: 2–3 most impactful visualizations
Slide 5: Model Approach (which models, which metric, which won)
Slide 6: Model Results (confusion matrix / RMSE chart)
Slide 7: AI Integration Demo (live or screenshot)
Slide 8: Top 3 Findings + Recommendations
Slide 9: Limitations + What We Would Do Next
Slide 10: Team + GitHub Link + Q&A
```

### Timing

```
0:00–0:30  Team intro + problem statement
0:30–2:00  EDA highlights (3 charts, no more)
2:00–4:00  Model approach and results
4:00–6:00  Live demo (run the prediction function)
6:00–8:00  AI integration feature demo
8:00–9:30  Findings + recommendations
9:30–10:00 Limitations + Q&A
```

---

## 🧹 Code Polish Checklist

Before finalizing:

```python
# Run this checklist on every notebook

# 1. Clear all outputs, then Run All
# Kernel → Restart and Run All → must work without errors

# 2. No hardcoded paths
# ❌ df = pd.read_csv("/Users/yourname/Downloads/data.csv")
# ✅ df = pd.read_csv("data/superstore.csv")

# 3. No API keys in code
# ❌ API_KEY = "sk-..."
# ✅ API_KEY = userdata.get("GEMINI_API_KEY")

# 4. Every function has a docstring
def predict_revenue(features):
    """
    Predict next month's revenue given lag features.
    
    Args:
        features: array of [lag_1, lag_2, rolling_3, month_sin, month_cos]
    Returns:
        float: predicted revenue in INR
    """
    return best_model.predict([features])[0]

# 5. No unused imports at the top
# Remove any import that isn't used in the notebook

# 6. Consistent variable naming
# Use snake_case throughout: my_variable, not myVariable or MyVariable
```

---

## 📝 Individual Reflection Report

Every team member submits this personally (not group work).

```markdown
# Internship Reflection — [Your Name]
**Programme:** Data Science & AI Internship — 12 Weeks
**Project:** [Project Name]
**Date:** [Today's Date]

---

## 1. What I Built
[2-3 sentences describing your contribution to the capstone]

## 2. The Hardest Part
[Describe one technical or collaboration challenge you faced]
[How did you resolve it?]

## 3. What Actually Surprised Me
[One thing you discovered about data science that was different from what you expected]

## 4. The Prompt That Helped Me Most
[Share one prompt you used in an AI tool that gave you a breakthrough]
[What did you ask? What did you learn from the response?]

## 5. My Biggest Mistake (and What I Learned)
[Be honest. The most valuable learning often comes from failure]

## 6. What I Would Tell Someone Starting Week 1
[One piece of advice]

## 7. What I Want to Learn Next
[Where do you want to go from here — ML engineering, analytics, AI, NLP, etc.]

---
**GitHub:** [link to your repo]
**LinkedIn post:** [link if you shared your project]
```

---

## 🏆 Demo Day Format

### How Demo Day Works

1. Each group presents for 10 minutes
2. 5 minutes of Q&A from other groups
3. Groups vote on the most impactful project (not best model — most useful)
4. Instructor gives individual feedback

### Q&A Tips — How to Handle Hard Questions

```
Q: "Why didn't you try XGBoost?"
A: "We considered it — it was in our backlog. We prioritized [model] because [reason]. 
    Given more time, XGBoost with tuning would be our next step."

Q: "How confident are you in the forecast accuracy?"
A: "Our RMSE was ₹X, which is about Y% of the average monthly revenue. 
    The model performs well on recent months but would need retraining with new data every quarter."

Q: "What happens if the model is wrong in production?"
A: "Great question. We built in a confidence score threshold — any prediction below 70% 
    confidence would be flagged for human review rather than acted on automatically."
```

---

## 🗂️ GitHub Repository Final Structure

```
team-capstone-[project-name]/
├── README.md                    ← Project overview + how to run
├── requirements.txt             ← pip install -r requirements.txt
├── data/
│   ├── README.md                ← Dataset source + license
│   └── sample.csv               ← Small sample only (not full dataset)
├── notebooks/
│   ├── 01_eda.ipynb             ← Data loading + EDA
│   ├── 02_model.ipynb           ← Model training + evaluation
│   ├── 03_ai_integration.ipynb  ← AI API features
│   └── 04_demo.ipynb            ← Final clean demo notebook
├── docs/
│   ├── proposal.md              ← Week 7 PPD
│   ├── model_decision.md        ← Week 10 model decision
│   └── final_report.md          ← Final write-up
└── presentation/
    └── slides.pdf               ← Export your slide deck
```

---

## 🎖️ What You Have Earned

After 12 weeks, you can honestly say:

```
✅ Cleaned and analyzed real-world datasets with Pandas
✅ Built EDA pipelines that surface business-relevant insights
✅ Trained and evaluated ML models (regression + classification)
✅ Applied NLP techniques for text classification
✅ Integrated AI APIs into a data workflow
✅ Worked in a team using GitHub for version control
✅ Presented findings to a technical and non-technical audience
✅ Wrote code that others can read and run
```

### What to Add to Your Resume

```
Data Science Internship (Self-Paced Programme)
10xTarun — 12-Week Data Science & AI Programme
[Month Year] – [Month Year]

• Built [Project Name]: [one sentence describing what it does and the outcome]
• Trained ML models achieving [X% accuracy / ₹X RMSE] using Scikit-learn
• Processed [N] records using Pandas, Matplotlib, and Seaborn
• Integrated Gemini/OpenAI API for automated [insight generation / sentiment explanation]
• Collaborated with a team of [N] using GitHub for version control

GitHub: github.com/yourusername/capstone-project
```

---

## 📝 Final Submission

By end of Week 12, submit:

- [ ] Final capstone notebook: `04_demo.ipynb` → runs top-to-bottom, no errors
- [ ] All charts saved as `.png` in `/presentation/images/`
- [ ] Slide deck as PDF in `/presentation/slides.pdf`
- [ ] Individual Reflection Report in `/docs/reflection_yourname.md`
- [ ] README.md complete with setup instructions and sample output
- [ ] LinkedIn post: share your project (optional but highly recommended)

---

## 💬 Final Reflection Prompt

> *"Describe your project in one sentence to:*
> *(a) A friend who has never heard of machine learning*
> *(b) A recruiter reviewing your resume*
> *(c) A senior data scientist interviewing you*
>
> *All three sentences should be different — and all three should be true."*

---

## 🏁 What Comes Next

You have the foundation. Here are the next steps depending on where you want to go:

| Goal | Next Step |
|---|---|
| Data Analyst role | Deep dive into SQL, Tableau, Power BI |
| ML Engineer role | Learn MLflow, Docker, FastAPI for model serving |
| AI/NLP Engineer | Study transformers, HuggingFace, fine-tuning LLMs |
| Data Scientist at a startup | Learn A/B testing, product analytics, experiment design |
| Research direction | Study advanced statistics, deep learning theory |

---

> *"You came in knowing Python loops. You leave knowing how to find a pattern in 10,000 rows of data, build a model to predict outcomes, and explain your findings to someone who has never seen code. That is a data scientist."*

---

*← [Week 11](./week-11.md) | [Programme Index](./index.md)*

---

**🎉 Congratulations on completing the Data Science & AI Internship Programme.**
