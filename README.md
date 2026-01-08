# MoodifyMe – Emotion-Based Daily Planner

A smart, AI-powered daily planning application that adapts to the user's emotional state, providing personalized task recommendations and emotional wellness tracking.

---

## 📌 Project Overview

**MoodifyMe** is a full-stack web application designed to bridge the gap between emotional well-being and daily productivity. Unlike traditional planners that focus solely on task management, MoodifyMe uses emotion recognition to tailor task suggestions, helping users plan their day based on how they *feel*, not just what they need to do.

The application enables users to log their current mood, receive AI-curated task recommendations, track emotional patterns over time, and maintain a private digital journal—all within a modern, responsive interface.

---

## 🎯 Problem Statement

Traditional productivity tools fail to account for the user's emotional and mental state, often leading to:
- **Task overload** during low-energy periods
- **Underutilization** of high-productivity windows
- **Burnout** from ignoring emotional signals
- **Lack of self-awareness** regarding mood patterns and triggers

There is a need for an intelligent system that integrates emotional intelligence into daily planning, promoting both productivity and mental wellness.

---

## 💡 Solution Description

MoodifyMe addresses these challenges by implementing an **emotion-aware task management system** that:

1. **Captures Mood Data** – Users log their current emotional state using an intuitive emoji-based interface.
2. **Generates Smart Recommendations** – Based on the logged mood, the system suggests contextually appropriate tasks (e.g., restorative activities when stressed, challenging tasks when confident).
3. **Tracks Emotional Trends** – Visual analytics help users identify mood patterns and correlations over time.
4. **Provides a Safe Space** – A private journaling feature allows users to document thoughts and reflect on their experiences.

---

## ✨ Key Features

- **Emotion-Based Mood Logging** – Quick, intuitive mood capture using emoji-based selection
- **AI-Powered Task Recommendations** – Personalized daily task suggestions based on emotional state
- **Mood Analytics Dashboard** – Visual representation of mood trends, streaks, and patterns
- **Private Digital Journal** – Secure space for personal reflection and thought documentation
- **Responsive Design** – Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Theme Support** – User-preferred theme with system detection
- **Secure Authentication** – Email and Google OAuth-based login via Firebase
- **Real-Time Data Sync** – Cloud-based storage with Firebase Firestore

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Radix UI Primitives |
| **Backend & Database** | Firebase (Firestore, Authentication) |
| **Hosting & Deployment** | Vercel |
| **Icons** | Lucide React |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Next.js 14 (React + TypeScript)            │   │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │   │
│  │   │  Dashboard  │  │   Journal   │  │  Analytics  │    │   │
│  │   └─────────────┘  └─────────────┘  └─────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AUTHENTICATION LAYER                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Firebase Auth                        │   │
│  │         (Email/Password + Google OAuth 2.0)             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               Firebase Firestore (NoSQL)                │   │
│  │   ┌─────────┐  ┌─────────────┐  ┌──────────────┐       │   │
│  │   │  Users  │  │  Mood Logs  │  │  Journal     │       │   │
│  │   │         │  │             │  │  Entries     │       │   │
│  │   └─────────┘  └─────────────┘  └──────────────┘       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT LAYER                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Vercel Platform                       │   │
│  │           (CI/CD, Edge Functions, CDN)                  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Live Demo

**Production URL:** [https://moodfindai.vercel.app/](https://moodfindai.vercel.app/)

> The application is fully deployed and accessible. Create an account to explore all features.

---

## 📈 Project Status & Future Scope

### Current Status
✅ **Completed & Deployed** – Core features are fully functional and publicly accessible.

### Implemented Features
- [x] User authentication (Email + Google OAuth)
- [x] Mood logging and tracking
- [x] AI-based task recommendations
- [x] Analytics dashboard with trend visualization
- [x] Private journaling system
- [x] Responsive UI with theme support

### Future Enhancements
- [ ] **Community Features** – Connect with users on similar emotional journeys
- [ ] **Zen Mode** – Guided breathing exercises for stress relief
- [ ] **Push Notifications** – Mood check-in reminders
- [ ] **Export Functionality** – Download mood reports as PDF
- [ ] **Calendar Integration** – Sync with Google Calendar
- [ ] **Mobile Application** – Native iOS and Android apps using Capacitor

---

## 👨‍💻 Developer Details

| Field | Details |
|-------|---------|
| **Developer** | Ganu Kumar |
| **Email** | ganuganuk76@gmail.com |
| **GitHub** | [github.com/ask8962](https://github.com/ask8962/moodfindai) |
| **LinkedIn** | [linkedin.com/in/anukalp-gupta-23b4b7319](https://www.linkedin.com/in/anukalp-gupta-23b4b7319/) |

---

## 📄 License

This project is developed for educational purposes as part of a college curriculum. All rights reserved.

---

<p align="center">
  <i>Built with ❤️ using Next.js, TypeScript, and Firebase</i>
</p>
