# Project Instructions: Website Security Analysis & Uptime Monitoring

## 📌 Project Overview
This project is a web-based platform that provides two major features:

1️⃣ **Uptime & Downtime Monitoring** → Website owners can register their domains to get notified whenever their site goes down and receive periodic health reports.

2️⃣ **Website Detection & Security Analysis** → Any user can check if a website URL is phishing, malicious, or safe. The system will generate a report with security parameters, similar to VirusTotal.

Additionally, we plan to build a **browser extension** for easier access to these features.

---
## 🚀 Features & Implementation Plan

### ✅ Features Completed So Far
- **User Model (Industry-Level)**: Secure schema with encryption, failed login tracking, and session management.
- **Database Connection**: MongoDB connected successfully.
- **Logging System**: Winston & Morgan configured for request logging.
- **Error Handling Utilities**: Centralized error-handling middleware and response wrappers.
- **Authentication System**:
  - Google OAuth planned but not yet implemented.
- **Project Folder Structure Defined**: Server & Client structured properly.

---
### 🔨 Features To Implement
#### **Core Features**
🔲 **Token-Based Authentication & Authorization**

🔲 **Google OAuth for Login (Passport.js)**

🔲 **Rate Limiter** to prevent abuse & bot attacks

🔲 **API Endpoint for Website Security Analysis**

🔲 **Uptime/Downtime Monitoring Service**

🔲 **Email/SMS Notification System for Uptime Alerts**

🔲 **Automated Report Generation (Security Analysis & Health Reports)**

🔲 **File Upload Security Check (Optional: AWS S3 or Cloudinary for Storage)**

<!-- 🔲 **Admin Panel for Viewing Reports & Logs** -->

#### **Enhancements & Optimization**
🔲 **Dockerize the Project** for smooth onboarding of developers

🔲 **CI/CD Pipeline for Automatic Deployments**

🔲 **Browser Extension Integration**

🔲 **WebSockets for Real-Time Uptime Updates**

---
## 📂 Folder Structure

```
📦 project-root
 ┣ 📂 client  (Frontend - React + Vite)
 ┣ 📂 server  (Backend - Node.js + Express)
 ┃ ┣ 📂 config  (Database, Passport, etc.)
 ┃ ┣ 📂 controllers  (Business Logic)
 ┃ ┣ 📂 middlewares  (Auth, Error Handling, Rate Limiting, etc.)
 ┃ ┣ 📂 models  (User, Reports, URLs, etc.)
 ┃ ┣ 📂 routes  (API Routes)
 ┃ ┣ 📂 services  (Security Analysis, Uptime Monitor, Email/SMS, etc.)
 ┃ ┣ 📂 logs  (Winston log files)
 ┃ ┗ 📜 app.js (Main Express App)
```

---
## 📅 Next Steps
1️⃣ Complete User Authentication & Authorization

2️⃣ Set Up Passport.js for Google OAuth

3️⃣ Implement Rate Limiting & Security Measures

4️⃣ Develop API for Website Security Analysis

5️⃣ Set Up Uptime Monitoring with WebSockets

6️⃣ Configure Email/SMS Notifications

7️⃣ Dockerize & Improve Developer Onboarding

8️⃣ Develop Browser Extension for Quick Analysis

---
## 📢 Contribution Guide
- Follow the project structure mentioned above.
- Log every major implementation/update.
- Follow the coding style and use Winston/Morgan for logging.
- If adding a new feature, update this document with relevant details.

---
**⚡ Stay organized & happy coding!** 🚀

