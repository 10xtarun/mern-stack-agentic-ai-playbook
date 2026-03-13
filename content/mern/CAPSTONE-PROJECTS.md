# Capstone Projects: Complete Specifications

## 📌 Overview

**Duration**: 6 weeks (Weeks 7-12)  
**Format**: Group projects (4-5 students)  
**Stack**: Next.js + TS (Frontend) | NestJS + TS (Backend) | MongoDB

---

## Project 1: Internship Platform

### 📋 Purpose
Connect organizations with students. Organizations post internships; students apply and track status.

### 🎯 MVP Features

**Students:**
- Authentication (email/password)
- Complete profile (skills, resume, location)
- Browse & filter internships
- Apply to internships
- Track application status
- Save favorites

**Organizations:**
- Company authentication & verification
- Post internship listings
- View applications & applicants
- Update application status
- Simple analytics

**Admin:**
- Manage users & organizations
- Monitor platform activity

### 📊 Database Schema

```
Student {
  _id, email, passwordHash, firstName, lastName,
  profileImage, skills[], resume, location, bio,
  applications[], favorites[], createdAt
}

Organization {
  _id, email, passwordHash, companyName, industry,
  location, website, logo, description, verified,
  internships[], createdAt
}

Internship {
  _id, organizationId, title, description,
  requiredSkills[], location, duration, stipend,
  applicationDeadline, postedDate, status
}

Application {
  _id, internshipId, studentId, organizationId,
  status (applied|shortlisted|rejected|accepted),
  appliedDate, feedback
}
```

### 🔌 Key API Endpoints

```
Auth:
  POST /api/auth/register
  POST /api/auth/login
  POST /api/auth/logout

Internships:
  GET  /api/internships (with filters)
  GET  /api/internships/:id
  POST /api/internships (org only)
  PATCH /api/internships/:id (org only)

Applications:
  POST /api/applications
  GET  /api/applications/me
  PATCH /api/applications/:id

Profile:
  GET  /api/profile/me
  PATCH /api/profile/me
```

### ✅ Week-by-Week Breakdown

**Week 7**: Backend setup, Auth, DB schema  
**Week 8**: Student & Organization routes, filtering  
**Week 9**: Frontend pages (list, detail, apply)  
**Week 10**: Profile management, favorites  
**Week 11**: Admin dashboard, notifications  
**Week 12**: Testing, deployment prep, documentation

---

## Project 2: Assignment Tracking System

### 📋 Purpose
Organizations/admins post assignments; students submit files and track progress with scoring.

### 🎯 MVP Features

**Students:**
- View assigned assignments
- Submit file (one per assignment)
- Track submission status
- View grades & feedback
- View leaderboard

**Organizations/Admin:**
- Create assignments with deadlines
- View submissions
- Grade submissions (0-100)
- Provide feedback
- Generate reports

### 📊 Database Schema

```
User {
  _id, email, passwordHash, firstName, lastName,
  role (student|admin|organization),
  createdAt
}

Assignment {
  _id, organizationId (or admin), title,
  description, instructions, maxScore,
  deadline, createdDate, submissions[]
}

Submission {
  _id, assignmentId, studentId,
  fileUrl, submittedDate,
  score, feedback, status (submitted|graded)
}

Leaderboard {
  _id, assignmentId, entries[] {
    studentId, score, rank
  }
}
```

### 🔌 Key API Endpoints

```
Assignments:
  GET  /api/assignments
  GET  /api/assignments/:id
  POST /api/assignments (admin)
  PATCH /api/assignments/:id (admin)

Submissions:
  POST /api/submissions (file upload)
  GET  /api/submissions/:assignmentId
  PATCH /api/submissions/:id/grade (admin)

Leaderboard:
  GET  /api/leaderboard/:assignmentId
```

### ✅ Evaluation Criteria

- File upload validation (type, size)
- Score calculation & ranking
- Deadline tracking
- Feedback system

---

## Project 3: College Dashboard

### 📋 Purpose
Track student profiles, internship/placement status, analytics for colleges.

### 🎯 MVP Features

**Students:**
- Update profile (skills, resume, placement status)
- View internship/placement status
- Track applications & offers
- Access placement guidelines

**Admins/Coordinators:**
- View all student profiles with filters
- Update placement status (active, placed, waitlist)
- Upload bulk data (CSV)
- View analytics (placement rate, average salary)
- Generate reports

### 📊 Database Schema

```
StudentProfile {
  _id, rollNumber, email, firstName, lastName,
  phoneNumber, branch, batch, cgpa, skills[],
  resume, profileImage, placementStatus,
  appliedCompanies[], offers[], createdAt
}

PlacementStatus {
  _id, studentId, status (active|placed|waitlist),
  offeredCompany, offeredPackage, offeredRole,
  offerDate, acceptedDate
}

Analytics {
  _id, batchYear, totalStudents, placedStudents,
  avgPackage, highestPackage, placementRate
}
```

### 🔌 Key API Endpoints

```
Students:
  GET  /api/students (admin - with filters)
  GET  /api/students/:id
  PATCH /api/students/:id/profile (student)
  PATCH /api/students/:id/placement (admin)

Analytics:
  GET  /api/analytics/placement-stats
  GET  /api/analytics/batch/:batch
  GET  /api/analytics/branch/:branch

Bulk Upload:
  POST /api/bulk/students/upload (CSV)
```

---

## 🏗️ Tech Stack Requirements

### Frontend (Next.js)
- Routing with App Router
- Server & Client Components
- TypeScript throughout
- NextAuth for authentication
- Form validation (React Hook Form)
- State management (Zustand or Context)
- Tailwind CSS for styling

### Backend (NestJS)
- Controllers, Services, Modules architecture
- TypeORM or Mongoose with TypeScript
- JWT authentication
- Input validation (class-validator)
- Error handling middleware
- CORS configured
- Environment variables

### Database (MongoDB)
- Proper schema design
- Indexes for query optimization
- Validation at DB level
- Relationships (references/populations)

---

## 📋 Assessment Rubric (100 points)

### Code Quality (25 points)
- TypeScript properly used (8 pts)
- SOLID principles followed (8 pts)
- DRY code, no duplication (5 pts)
- Proper error handling (4 pts)

### Feature Completeness (25 points)
- All MVP features implemented (20 pts)
- Proper validation (3 pts)
- Edge cases handled (2 pts)

### Git & Collaboration (15 points)
- Regular commits with good messages (7 pts)
- Proper branching (feature/fix) (5 pts)
- Code review process followed (3 pts)

### Documentation (15 points)
- README with setup instructions (5 pts)
- API documentation (Swagger/Postman) (5 pts)
- Database schema documented (3 pts)
- Inline code comments where needed (2 pts)

### Testing & Quality (10 points)
- Input validation implemented (5 pts)
- Error messages user-friendly (3 pts)
- No console errors on demo (2 pts)

### Presentation (10 points)
- Live demo works smoothly (5 pts)
- Technical explanation clear (3 pts)
- Q&A handling (2 pts)

---

## 🚀 Deployment Notes

**NOT REQUIRED** for this course, but structure code for deployment:
- Environment variables configured
- Database connection string flexible
- CORS properly configured
- Ready for Vercel (frontend) & Railway (backend)

---

## 📚 Resources

[^1]: NestJS Docs - https://docs.nestjs.com
[^2]: Next.js Docs - https://nextjs.org/docs
[^3]: MongoDB Docs - https://docs.mongodb.com
[^4]: NextAuth.js - https://next-auth.js.org
[^5]: Mongoose - https://mongoosejs.com

---

## 📝 Deliverables (Due Week 12)

1. ✅ GitHub repository with proper history
2. ✅ Complete frontend application
3. ✅ Complete backend API
4. ✅ MongoDB schema with sample data
5. ✅ README with setup instructions
6. ✅ API documentation (Postman/Swagger)
7. ✅ Live demo video (5 min)
8. ✅ Presentation slides

---

## ⚡ Success Criteria

- [ ] App runs without errors on reviewer's machine
- [ ] All MVP features working
- [ ] Proper TypeScript usage
- [ ] Clean, readable code
- [ ] Good Git commit history
- [ ] Documentation complete
- [ ] Team demonstrates understanding during presentation
