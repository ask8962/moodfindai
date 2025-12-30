# MoodifyMe - Emotion-Based Daily Planner

MoodifyMe is a modern, AI-powered emotional wellness companion that helps you track your moods, plan your day based on how you feel, and gain insights into your emotional well-being. Built with Next.js 14 and refined with a premium, Linear-inspired design system.

![MoodifyMe Dashboard Preview](/landing_hero_desktop_v3_1766835803517.png)

## 🌟 Key Features

### 🎨 Modern UI/UX
- **Premium Design System**: Linear/Vercel-inspired aesthetic with a refined purple accent and clean typography.
- **Dark/Light Mode**: Fully supported themes with a smooth toggle and system preference detection.
- **Adaptive Interface**: Responsive design that looks great on desktop, tablet, and mobile.
- **Micro-interactions**: Subtle gradients, hover lifts, and fluid animations for a polished feel.

### 🧠 Emotional Intelligence
- **Mood Tracking**: Simple, emoji-based mood logging to capture how you feel in seconds.
- **Smart Task Planner**: AI-powered task suggestions tailored to your current emotional state (e.g., restorative tasks when you're tired, challenging ones when you're confident).
- **Personalized Insights**: Visual displays of your mood trends and streak tracking.

### 🔐 Secure & Social
- **Authentication**: Secure login/signup via Email or Google (Firebase Auth).
- **Journaling**: A private space to document your thoughts and daily experiences.
- **Community**: (Coming Soon) Connect with others on similar emotional journeys.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Auth**: [Firebase](https://firebase.google.com/) (Firestore, Auth)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Firebase project set up with Auth (Email/Google) and Firestore

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/moodifyme.git
    cd moodifyme
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables**
    Create a `.env.local` file in the root directory and add your Firebase credentials:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open your browser**
    Navigate to `http://localhost:3000` to see the app in action.

## 📂 Project Structure

```
moodifyme/
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Protected dashboard routes
│   ├── login/            # Authentication pages
│   ├── signup/           # Authentication pages
│   ├── layout.tsx        # Root layout with ThemeProvider
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── ui/               # Base UI primitives (buttons, cards, etc.)
│   ├── landing-page.tsx  # Main landing page component
│   └── dashboard-nav.tsx # Dashboard navigation
├── lib/                  # Utilities and configurations
│   ├── firebase.ts       # Firebase initialization
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── styles/               # Global styles (globals.css)
```

## 🎨 Design System

Our design system is built on a foundation of refined variables for light and dark modes.

- **Typography**: Inter (primary sans-serif) with a clear type scale.
- **Colors**:
    - Primary: `#8B5CF6` (Violet-500)
    - Backgrounds: Clean white (`#FFFFFF`) or deep slate (`#0F172A`)
- **Spacing**: Consistent 4px/8px grid system.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
