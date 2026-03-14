export type ContentTrack = 'mern' | 'data-science' | 'cloud-devops'

export interface TrackPhase {
    id: string
    label: string
    weeks: string
    color: string
}

export interface ContentItem {
    slug: string
    title: string
    track: ContentTrack
    category?: string
    order?: number
    description: string
    file: string
    phase?: 'learn' | 'internship'
    week?: number
    tags?: string[]
    miniProject?: string
}

export interface ContentSection {
    id: string
    title: string
    slug: string
    description: string
    icon: string
    color: string
    items: ContentItem[]
    phases: TrackPhase[]
    capstones?: CapstoneProject[]
}

export interface CapstoneProject {
    title: string
    subtitle: string
    description: string
    icon: string
    tags: string[]
}

// ── MERN Track Content ──────────────────────────────
export const mernItems: ContentItem[] = [
    {
        slug: 'mern/overview',
        title: 'Programme Overview',
        track: 'mern',
        description: '12-week MERN Stack course & internship program overview.',
        file: 'mern/00-MASTER-OUTLINE.md',
        tags: ['overview', 'mern', 'fullstack'],
    },
    {
        slug: 'mern/week-01',
        title: 'Week 1: Portfolio Website & Git',
        track: 'mern',
        description: 'Build portfolio with HTML5, CSS3, GitHub Pages',
        file: 'mern/WEEK-01.md',
        phase: 'learn',
        week: 1,
        tags: ['html', 'css', 'git', 'portfolio'],
        miniProject: 'Personal Portfolio',
    },
    {
        slug: 'mern/week-02',
        title: 'Week 2: Advanced CSS & Design Systems',
        track: 'mern',
        description: 'Flexbox, Grid, animations, accessibility',
        file: 'mern/WEEK-02.md',
        phase: 'learn',
        week: 2,
        tags: ['css-grid', 'flexbox', 'design-systems'],
        miniProject: 'Landing Page Component',
    },
    {
        slug: 'mern/week-03-04',
        title: 'Weeks 3-4: JavaScript & TypeScript',
        track: 'mern',
        description: 'JS fundamentals, async/await, TypeScript types',
        file: 'mern/WEEK-03-04-JAVASCRIPT-TYPESCRIPT.md',
        phase: 'learn',
        week: 3,
        tags: ['javascript', 'typescript', 'async'],
        miniProject: 'Typed Quiz Engine',
    },
    {
        slug: 'mern/week-05-06',
        title: 'Weeks 5-6: React & Next.js',
        track: 'mern',
        description: 'React hooks, Next.js routing, NextAuth',
        file: 'mern/WEEK-05-06-REACT-NEXTJS.md',
        phase: 'learn',
        week: 5,
        tags: ['react', 'nextjs', 'tailwind-css'],
        miniProject: 'Interactive Dashboard',
    },
    {
        slug: 'mern/week-07-12',
        title: 'Weeks 7-12: Backend & Integration',
        track: 'mern',
        description: 'Node.js, NestJS, MongoDB, full-stack integration',
        file: 'mern/WEEK-07-12-BACKEND-INTEGRATION.md',
        phase: 'internship',
        week: 7,
        tags: ['nodejs', 'nestjs', 'mongodb', 'rest-api'],
    },
    {
        slug: 'mern/capstones',
        title: 'Capstone Projects Specifications',
        track: 'mern',
        description: 'Complete requirements for all 3 capstone projects',
        file: 'mern/CAPSTONE-PROJECTS.md',
        tags: ['capstone', 'projects', 'specs'],
    },
    {
        slug: 'mern/setup',
        title: 'Setup Guide',
        track: 'mern',
        description: 'Tools, project structure, environment',
        file: 'mern/SETUP-GUIDE.md',
        tags: ['setup', 'tools', 'guide'],
    },
    {
        slug: 'mern/diary',
        title: 'Daily Internship Diary',
        track: 'mern',
        description: 'Track daily learning and progress',
        file: 'mern/DAILY-INTERNSHIP-DIARY-GUIDE.md',
        tags: ['internship', 'diary', 'documentation'],
    },
    {
        slug: 'mern/best-practices',
        title: 'Best Practices & Patterns',
        track: 'mern',
        description: 'Git, TypeScript, NestJS, API design',
        file: 'mern/SUPPORTING-MATERIALS.md',
        tags: ['patterns', 'clean-code', 'architecture'],
    },
]

// ── DS Track Content ──────────────────────────────
export const dsItems: ContentItem[] = [
    {
        slug: 'data-science/overview',
        title: 'Programme Overview',
        track: 'data-science',
        description: '12-week Data Science & AI Internship — what you will build and how the programme works.',
        file: 'data-science/index.md',
        tags: ['overview', 'programme', 'data science'],
    },
    {
        slug: 'data-science/week-01',
        title: 'Week 1 — Python for Data Science',
        track: 'data-science',
        description: 'Data types, loops, functions, list comprehensions, file handling. Mini project: Expense Tracker.',
        file: 'data-science/week-01.md',
        phase: 'learn',
        week: 1,
        tags: ['python', 'colab', 'basics'],
        miniProject: 'Expense Tracker',
    },
    {
        slug: 'data-science/week-02',
        title: 'Week 2 — Data Wrangling with Pandas & NumPy',
        track: 'data-science',
        description: 'DataFrames, filtering, groupby, missing values, aggregation. Mini project: Student Dataset Analysis.',
        file: 'data-science/week-02.md',
        phase: 'learn',
        week: 2,
        tags: ['pandas', 'numpy', 'data wrangling'],
        miniProject: 'Student Dataset Analysis',
    },
    {
        slug: 'data-science/week-03',
        title: 'Week 3 — Data Visualization',
        track: 'data-science',
        description: 'Matplotlib, Seaborn, Plotly. Choosing the right chart for the right question.',
        file: 'data-science/week-03.md',
        phase: 'learn',
        week: 3,
        tags: ['matplotlib', 'seaborn', 'plotly', 'visualization'],
        miniProject: 'E-Commerce Sales Story',
    },
    {
        slug: 'data-science/week-04',
        title: 'Week 4 — Statistics & Probability',
        track: 'data-science',
        description: 'Descriptive stats, distributions, correlation, hypothesis testing. Mini project: Salary Analysis.',
        file: 'data-science/week-04.md',
        phase: 'learn',
        week: 4,
        tags: ['statistics', 'probability', 'scipy'],
        miniProject: 'Salary Analysis Report',
    },
    {
        slug: 'data-science/week-05',
        title: 'Week 5 — SQL + Exploratory Data Analysis',
        track: 'data-science',
        description: 'SQLite in Colab, JOINs, GROUP BY, full EDA framework with outlier detection.',
        file: 'data-science/week-05.md',
        phase: 'learn',
        week: 5,
        tags: ['sql', 'eda', 'sqlite'],
        miniProject: 'E-Commerce Customer EDA',
    },
    {
        slug: 'data-science/week-06',
        title: 'Week 6 — ML Fundamentals + Prompt Engineering',
        track: 'data-science',
        description: 'Linear Regression, Decision Tree, Random Forest. 5 core prompt engineering patterns.',
        file: 'data-science/week-06.md',
        phase: 'learn',
        week: 6,
        tags: ['machine learning', 'scikit-learn', 'prompt engineering'],
        miniProject: 'House Price Predictor',
    },
    {
        slug: 'data-science/week-07',
        title: 'Week 7 — ML in Practice + Capstone Kickoff',
        track: 'data-science',
        description: 'Imbalanced data, encoding, pipelines, cross-validation. Submit Project Proposal Document.',
        file: 'data-science/week-07.md',
        phase: 'internship',
        week: 7,
        tags: ['ml pipelines', 'imbalanced', 'capstone'],
    },
    {
        slug: 'data-science/week-08',
        title: 'Week 8 — Deep Learning Basics + NLP Intro',
        track: 'data-science',
        description: 'Keras, activation functions, TF-IDF vectorization, text classification pipeline.',
        file: 'data-science/week-08.md',
        phase: 'internship',
        week: 8,
        tags: ['deep learning', 'keras', 'nlp', 'tfidf'],
    },
    {
        slug: 'data-science/week-09',
        title: 'Week 9 — Capstone Sprint 1: Data Pipeline & EDA',
        track: 'data-science',
        description: 'Group work. Data loading, cleaning, 8+ charts, Data Story for all 3 capstone projects.',
        file: 'data-science/week-09.md',
        phase: 'internship',
        week: 9,
        tags: ['capstone', 'eda', 'group project', 'sprint 1'],
    },
    {
        slug: 'data-science/week-10',
        title: 'Week 10 — Capstone Sprint 2: Model Building',
        track: 'data-science',
        description: 'Train 3 models, compare with metrics table, tune best model, write Model Decision Document.',
        file: 'data-science/week-10.md',
        phase: 'internship',
        week: 10,
        tags: ['capstone', 'model building', 'evaluation', 'sprint 2'],
    },
    {
        slug: 'data-science/week-11',
        title: 'Week 11 — AI APIs + Advanced Prompt Engineering',
        track: 'data-science',
        description: 'Gemini/OpenAI in Colab. Chain-of-thought, self-critique, structured JSON outputs.',
        file: 'data-science/week-11.md',
        phase: 'internship',
        week: 11,
        tags: ['ai api', 'gemini', 'openai', 'advanced prompting'],
    },
    {
        slug: 'data-science/week-12',
        title: 'Week 12 — Capstone Polish + Demo Day',
        track: 'data-science',
        description: 'Production notebooks, 10-min presentation, GitHub repo structure, individual reflection.',
        file: 'data-science/week-12.md',
        phase: 'internship',
        week: 12,
        tags: ['demo day', 'presentation', 'github', 'capstone'],
    },
]

// ── Cloud & DevOps Track Content ────────────────────
export const cloudDevopsItems: ContentItem[] = [
    {
        slug: 'cloud-devops/overview',
        title: 'Programme Overview',
        track: 'cloud-devops',
        description: '12-week Cloud & DevOps Engineering course & internship program overview.',
        file: 'cloud-devops/index.md',
        tags: ['overview', 'devops', 'cloud'],
    },
    {
        slug: 'cloud-devops/week-01',
        title: 'Week 1 — Git & GitHub Essentials',
        track: 'cloud-devops',
        description: 'Learn version control and collaboration workflows used in real engineering teams.',
        file: 'cloud-devops/week-01-git-github.md',
        phase: 'learn',
        week: 1,
        tags: ['git', 'github', 'collaboration'],
        miniProject: 'DevOps Portfolio Repository',
    },
    {
        slug: 'cloud-devops/week-02',
        title: 'Week 2 — GitHub Advanced & Automation',
        track: 'cloud-devops',
        description: 'Understand collaboration governance and automation.',
        file: 'cloud-devops/week-02-github-automation.md',
        phase: 'learn',
        week: 2,
        tags: ['governance', 'automation', 'project-management'],
        miniProject: 'Open-Source Style Repository',
    },
    {
        slug: 'cloud-devops/week-03',
        title: 'Week 3 — CI/CD & GitHub Actions',
        track: 'cloud-devops',
        description: 'Learn Continuous Integration and Continuous Deployment with automation pipelines.',
        file: 'cloud-devops/week-03-cicd-github-actions.md',
        phase: 'learn',
        week: 3,
        tags: ['cicd', 'github-actions', 'automation'],
        miniProject: 'Node.js CI Pipeline',
    },
    {
        slug: 'cloud-devops/week-04',
        title: 'Week 4 — Docker Fundamentals',
        track: 'cloud-devops',
        description: 'Learn how to package applications using containers so they run consistently across environments.',
        file: 'cloud-devops/week-04-docker-fundamentals.md',
        phase: 'learn',
        week: 4,
        tags: ['docker', 'containers', 'virtualization'],
        miniProject: 'Node.js REST API Containerization',
    },
    {
        slug: 'cloud-devops/week-05',
        title: 'Week 5 — Docker Compose',
        track: 'cloud-devops',
        description: 'Learn how to run multi-container applications.',
        file: 'cloud-devops/week-05-docker-compose.md',
        phase: 'learn',
        week: 5,
        tags: ['docker-compose', 'microservices', 'networking'],
        miniProject: 'MERN Backend Stack Deployment',
    },
    {
        slug: 'cloud-devops/week-06',
        title: 'Week 6 — AWS Fundamentals',
        track: 'cloud-devops',
        description: 'Introduce cloud infrastructure using Amazon Web Services.',
        file: 'cloud-devops/week-06-aws-fundamentals.md',
        phase: 'learn',
        week: 6,
        tags: ['aws', 'cloud', 'ec2', 's3'],
        miniProject: 'Public API Deployment on EC2',
    },
    {
        slug: 'cloud-devops/week-07',
        title: 'Week 7 — Production Docker',
        track: 'cloud-devops',
        description: 'Learn how to build production-ready Docker containers used in real infrastructure.',
        file: 'cloud-devops/week-07-production-docker.md',
        phase: 'internship',
        week: 7,
        tags: ['production-docker', 'optimization', 'security'],
        miniProject: 'Optimized Multi-Stage Build',
    },
    {
        slug: 'cloud-devops/week-08',
        title: 'Week 8 — AWS Container Deployment',
        track: 'cloud-devops',
        description: 'Deploy Docker containers to AWS infrastructure.',
        file: 'cloud-devops/week-08-aws-deployment.md',
        phase: 'internship',
        week: 8,
        tags: ['ecs', 'orchestration', 'load-balancing'],
        miniProject: 'ECS Deployment with Load Balancer',
    },
    {
        slug: 'cloud-devops/week-09',
        title: 'Week 9 — CI/CD for Cloud Deployment',
        track: 'cloud-devops',
        description: 'Automate full deployment pipeline from GitHub to AWS.',
        file: 'cloud-devops/week-09-cicd-aws.md',
        phase: 'internship',
        week: 9,
        tags: ['cicd-automation', 'aws-deploy', 'pipelines'],
        miniProject: 'Full GitHub to ECS Pipeline',
    },
    {
        slug: 'cloud-devops/week-10',
        title: 'Week 10 — Monitoring & Observability',
        track: 'cloud-devops',
        description: 'Learn how to monitor production systems.',
        file: 'cloud-devops/week-10-monitoring-logging.md',
        phase: 'internship',
        week: 10,
        tags: ['cloudwatch', 'monitoring', 'logging', 'alerting'],
        miniProject: 'API Monitoring System',
    },
    {
        slug: 'cloud-devops/week-11',
        title: 'Week 11 — Capstone Project Planning',
        track: 'cloud-devops',
        description: 'Design a production DevOps system architecture.',
        file: 'cloud-devops/week-11-capstone-planning.md',
        phase: 'internship',
        week: 11,
        tags: ['architecture', 'design', 'planning'],
    },
    {
        slug: 'cloud-devops/week-12',
        title: 'Week 12 — Capstone Deployment',
        track: 'cloud-devops',
        description: 'Deploy full production system with CI/CD and monitoring.',
        file: 'cloud-devops/week-12-capstone-delivery.md',
        phase: 'internship',
        week: 12,
        tags: ['capstone', 'production-release', 'portfolios'],
    },
]

export const TRACK_SECTIONS: ContentSection[] = [
    {
        id: 'mern',
        title: 'MERN Stack Mastery',
        slug: 'mern',
        description: '12-week programme from web basics to advanced NestJS & MongoDB.',
        icon: '🚀',
        color: '#63b3ed',
        items: mernItems,
        phases: [
            { id: 'learn', label: 'Phase 1 — Learn', weeks: '1–6', color: '#63b3ed' },
            { id: 'internship', label: 'Phase 2 — Internship', weeks: '7–12', color: '#68d391' },
        ],
        capstones: [
            {
                title: 'E-Learning Platform',
                subtitle: 'Full-stack LMS',
                description: 'Build a robust learning management system with video streaming, progress tracking, and payments.',
                icon: '📚',
                tags: ['Next.js', 'NestJS', 'Stripe', 'AWS S3']
            },
            {
                title: 'AI Productivity Hub',
                subtitle: 'SaaS Dashboard',
                description: 'Create a multi-tenant dashboard integrating AI for content generation and workflow automation.',
                icon: '⚡',
                tags: ['OpenAI', 'NextAuth', 'Prisma', 'PostgreSQL']
            }
        ]
    },
    {
        id: 'data-science',
        title: 'Data Science & AI',
        slug: 'data-science',
        description: '12-week programme covering Python, ML models and AI APIs.',
        icon: '🧠',
        color: '#63b3ed',
        items: dsItems,
        phases: [
            { id: 'learn', label: 'Phase 1 — Learn', weeks: '1–6', color: '#63b3ed' },
            { id: 'internship', label: 'Phase 2 — Internship', weeks: '7–12', color: '#68d391' },
        ],
        capstones: [
            {
                title: 'Customer Churn Predictor',
                subtitle: 'ML Classification',
                description: 'Build an end-to-end pipeline to predict customer churn with 85%+ accuracy.',
                icon: '📉',
                tags: ['Scikit-learn', 'XGBoost', 'Feature Eng', 'SQL']
            },
            {
                title: 'Sentiment Analysis API',
                subtitle: 'NLP Pipeline',
                description: 'Analyze real-time social media sentiment using transformers and deploy as a microservice.',
                icon: '🎭',
                tags: ['PyTorch', 'HuggingFace', 'FastAPI', 'Docker']
            },
            {
                title: 'AI Document Assistant',
                subtitle: 'RAG Implementation',
                description: 'Build a RAG system that answers questions based on private PDF documents.',
                icon: '🤖',
                tags: ['LangChain', 'OpenAI', 'Vector DB', 'Streamlit']
            }
        ]
    },
    {
        id: 'cloud-devops',
        title: 'Cloud & DevOps',
        slug: 'cloud-devops',
        description: '12-week programme covering AWS, Docker, Kubernetes, and CI/CD.',
        icon: '☁️',
        color: '#f6ad55',
        items: cloudDevopsItems,
        phases: [
            { id: 'learn', label: 'Phase 1 — Foundations', weeks: '1-6', color: '#f6ad55' },
            { id: 'internship', label: 'Phase 2 — Production Systems', weeks: '7-12', color: '#fc8181' },
        ],
        capstones: [
            {
                title: 'High-Availability MERN Deployment',
                subtitle: 'Production Infrastructure',
                description: 'Deploy a MERN application with auto-scaling, load balancing, and automated CI/CD pipelines.',
                icon: '🚀',
                tags: ['AWS ECS', 'GitHub Actions', 'Docker', 'CloudWatch']
            },
            {
                title: 'MLOps Pipeline Deployment',
                subtitle: 'Data Engineering',
                description: 'Automate the deployment and monitoring of a machine learning API with production-grade logging.',
                icon: '📉',
                tags: ['AWS', 'Docker', 'Monitoring', 'CI/CD']
            },
            {
                title: 'SaaS Cloud Infrastructure',
                subtitle: 'System Architecture',
                description: 'Build a multi-tenant cloud architecture following DevOps best practices for scalability and security.',
                icon: '🏗️',
                tags: ['Infrastructure as Code', 'AWS', 'Security', 'Monitoring']
            }
        ]
    }
]

// All items flat flat manifest for routing and lookups
export const CONTENT_MANIFEST: ContentItem[] = [
    ...mernItems,
    ...dsItems,
    ...cloudDevopsItems,
]

// Helper functions
export const getSectionByTrack = (track: string): ContentSection | undefined => {
    return TRACK_SECTIONS.find(s => s.slug === track)
}

export const getContentByTrack = (track: ContentTrack): ContentItem[] => {
    return CONTENT_MANIFEST.filter(item => item.track === track)
}

export const getContentBySlug = (slug: string): ContentItem | undefined => {
    return CONTENT_MANIFEST.find((item) => item.slug === slug)
}

export const getAllSlugs = (): string[] => {
    return CONTENT_MANIFEST.map((item) => item.slug)
}
