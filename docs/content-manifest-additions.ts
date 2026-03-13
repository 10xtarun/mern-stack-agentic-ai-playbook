// ─────────────────────────────────────────────────────────────
// lib/content.ts  — ADD this block to your existing manifest
//
// This registers the Data Science & AI Internship track.
// Drop the 13 markdown files into:  content/ds/
//
// Then add the dsInternship export below into your existing
// ContentManifest type and allContent array.
// ─────────────────────────────────────────────────────────────

import type { ContentItem, ContentSection } from './content-types' // adjust to your types

// ── DS Internship content items ──────────────────────────────
export const dsInternshipItems: ContentItem[] = [
  {
    slug: 'ds/index',
    title: 'Programme Overview',
    description: '12-week Data Science & AI Internship — what you will build and how the programme works.',
    filePath: 'content/ds/index.md',
    tags: ['overview', 'programme', 'data science'],
  },
  {
    slug: 'ds/week-01',
    title: 'Week 1 — Python for Data Science + Colab Setup',
    description: 'Data types, loops, functions, list comprehensions, file handling. Mini project: Expense Tracker.',
    filePath: 'content/ds/week-01.md',
    tags: ['python', 'colab', 'basics'],
    phase: 'learn',
    week: 1,
    miniProject: 'Expense Tracker',
  },
  {
    slug: 'ds/week-02',
    title: 'Week 2 — Data Wrangling with Pandas & NumPy',
    description: 'DataFrames, filtering, groupby, missing values, aggregation. Mini project: Student Dataset Analysis.',
    filePath: 'content/ds/week-02.md',
    tags: ['pandas', 'numpy', 'data wrangling'],
    phase: 'learn',
    week: 2,
    miniProject: 'Student Dataset Analysis',
  },
  {
    slug: 'ds/week-03',
    title: 'Week 3 — Data Visualization',
    description: 'Matplotlib, Seaborn, Plotly. Choosing the right chart for the right question.',
    filePath: 'content/ds/week-03.md',
    tags: ['matplotlib', 'seaborn', 'plotly', 'visualization'],
    phase: 'learn',
    week: 3,
    miniProject: 'E-Commerce Sales Story',
  },
  {
    slug: 'ds/week-04',
    title: 'Week 4 — Statistics & Probability',
    description: 'Descriptive stats, distributions, correlation, hypothesis testing. Mini project: Salary Analysis.',
    filePath: 'content/ds/week-04.md',
    tags: ['statistics', 'probability', 'scipy'],
    phase: 'learn',
    week: 4,
    miniProject: 'Salary Analysis Report',
  },
  {
    slug: 'ds/week-05',
    title: 'Week 5 — SQL + Exploratory Data Analysis',
    description: 'SQLite in Colab, JOINs, GROUP BY, full EDA framework with outlier detection.',
    filePath: 'content/ds/week-05.md',
    tags: ['sql', 'eda', 'sqlite'],
    phase: 'learn',
    week: 5,
    miniProject: 'E-Commerce Customer EDA',
  },
  {
    slug: 'ds/week-06',
    title: 'Week 6 — ML Fundamentals + Prompt Engineering',
    description: 'Linear Regression, Decision Tree, Random Forest. 5 core prompt engineering patterns.',
    filePath: 'content/ds/week-06.md',
    tags: ['machine learning', 'scikit-learn', 'prompt engineering'],
    phase: 'learn',
    week: 6,
    miniProject: 'House Price Predictor',
  },
  {
    slug: 'ds/week-07',
    title: 'Week 7 — ML in Practice + Capstone Kickoff',
    description: 'Imbalanced data, encoding, pipelines, cross-validation. Submit Project Proposal Document.',
    filePath: 'content/ds/week-07.md',
    tags: ['ml pipelines', 'imbalanced', 'capstone'],
    phase: 'internship',
    week: 7,
  },
  {
    slug: 'ds/week-08',
    title: 'Week 8 — Deep Learning Basics + NLP Intro',
    description: 'Keras, activation functions, TF-IDF vectorization, text classification pipeline.',
    filePath: 'content/ds/week-08.md',
    tags: ['deep learning', 'keras', 'nlp', 'tfidf'],
    phase: 'internship',
    week: 8,
  },
  {
    slug: 'ds/week-09',
    title: 'Week 9 — Capstone Sprint 1: Data Pipeline & EDA',
    description: 'Group work. Data loading, cleaning, 8+ charts, Data Story for all 3 capstone projects.',
    filePath: 'content/ds/week-09.md',
    tags: ['capstone', 'eda', 'group project', 'sprint 1'],
    phase: 'internship',
    week: 9,
  },
  {
    slug: 'ds/week-10',
    title: 'Week 10 — Capstone Sprint 2: Model Building',
    description: 'Train 3 models, compare with metrics table, tune best model, write Model Decision Document.',
    filePath: 'content/ds/week-10.md',
    tags: ['capstone', 'model building', 'evaluation', 'sprint 2'],
    phase: 'internship',
    week: 10,
  },
  {
    slug: 'ds/week-11',
    title: 'Week 11 — AI APIs + Advanced Prompt Engineering',
    description: 'Gemini/OpenAI in Colab. Chain-of-thought, self-critique, structured JSON outputs.',
    filePath: 'content/ds/week-11.md',
    tags: ['ai api', 'gemini', 'openai', 'advanced prompting'],
    phase: 'internship',
    week: 11,
  },
  {
    slug: 'ds/week-12',
    title: 'Week 12 — Capstone Polish + Demo Day',
    description: 'Production notebooks, 10-min presentation, GitHub repo structure, individual reflection.',
    filePath: 'content/ds/week-12.md',
    tags: ['demo day', 'presentation', 'github', 'capstone'],
    phase: 'internship',
    week: 12,
  },
]

// ── DS Internship section definition ────────────────────────
export const dsInternship: ContentSection = {
  id: 'data-science',
  title: 'Data Science & AI Internship',
  slug: 'data-science',
  description: '12-week programme from Python basics to ML models and AI APIs. Group capstone projects. Runs entirely on Google Colab.',
  icon: '🧠',
  color: '#63b3ed',           // matches the accent in data-science.html
  items: dsInternshipItems,
  phases: [
    {
      id: 'learn',
      label: 'Phase 1 — Learn',
      weeks: '1–6',
      color: '#63b3ed',
    },
    {
      id: 'internship',
      label: 'Phase 2 — Internship',
      weeks: '7–12',
      color: '#68d391',
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// HOW TO USE
//
// In your existing lib/content.ts, find where you build
// allContent or allSections, and add dsInternship to it:
//
//   export const allSections: ContentSection[] = [
//     mernStack,        // existing
//     dsInternship,     // ← ADD THIS
//   ]
//
// In your sidebar component, the DS section will automatically
// appear as a second top-level group because you're using
// allSections to drive it.
// ─────────────────────────────────────────────────────────────
