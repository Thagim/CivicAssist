# CivicAssist — AI Government Service Assistant (Frontend)

A React frontend for a government-service assistant platform, matching the sitemap:

```
JanaSahay (React.js)
├── Pages: Home, AI Assistant, Services, Service Details, Application,
│          Documents, Review, Application Status, Dashboard, Profile
├── Components: Navbar, Sidebar, AI Chat Widget, Service Cards, Voice Button,
│               Progress Tracker, Document Upload, Status Timeline
└── API Layer → (ready to connect to a Node.js backend)
```

This is a **frontend-only** build with realistic mock data (`src/data/mockData.js`)
standing in for the API layer — every screen works end-to-end (search → AI
assistant → service details → multi-step application → submit → track status).

## Tech stack
- React 18 + Vite
- React Router v6 (routing between all pages)
- Tailwind CSS (styling)
- lucide-react (icons)

## 1. Prerequisites
Install **Node.js 18+** (includes npm). Check with:
```bash
node -v
npm -v
```
Download it from https://nodejs.org if you don't have it.

## 2. Open the project in VS Code
1. Unzip the project folder you downloaded.
2. In VS Code: **File → Open Folder…** and select the `janasahay` folder.
3. Open a terminal inside VS Code: **Terminal → New Terminal**.

## 3. Install dependencies
In the VS Code terminal, run:
```bash
npm install
```

## 4. Run the app
```bash
npm run dev
```
Vite will start a local dev server (usually at **http://localhost:5173**) and
auto-open it in your browser. The app supports hot-reload — save any file and
the browser updates instantly.

## 5. Build for production (optional)
```bash
npm run build
```
This outputs a static, deployable bundle into the `dist/` folder. Preview it with:
```bash
npm run preview
```

## Project structure
```
janasahay/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx           # App entry point (router setup)
    ├── App.jsx             # Route definitions
    ├── index.css           # Tailwind + global styles
    ├── data/
    │   └── mockData.js     # Mock services, applications, user, notifications
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Sidebar.jsx
    │   ├── Layout.jsx          # Wraps Sidebar + Navbar + page content
    │   ├── AIChatWidget.jsx    # Floating "Ask CivicAssist" chat launcher
    │   ├── ServiceCard.jsx
    │   ├── VoiceButton.jsx     # Simulated voice input (mic button)
    │   ├── ProgressTracker.jsx # Step indicator for the application form
    │   ├── StatusTimeline.jsx  # Status timeline for tracking applications
    │   └── DocumentUpload.jsx
    └── pages/
        ├── Home.jsx
        ├── AIAssistant.jsx
        ├── Services.jsx
        ├── ServiceDetails.jsx
        ├── Application.jsx        # 5-step flow: Personal → Address → Documents → Review → Submit
        ├── Applications.jsx       # "My Applications" list
        ├── ApplicationStatus.jsx  # Single application tracking / "Track" page
        ├── Documents.jsx
        ├── Notifications.jsx
        ├── Dashboard.jsx
        └── Profile.jsx
```

## Connecting a real backend
Every mock data read currently comes from `src/data/mockData.js`. To wire up
a real Node.js API:
1. Create a `src/api/` folder with `fetch`-based service functions
   (e.g. `getServices()`, `submitApplication(payload)`).
2. Replace the imports from `mockData.js` in each page with calls to your
   API functions (ideally via `useEffect` + `useState`, or a data-fetching
   library like TanStack Query).
3. Add a `.env` file with `VITE_API_BASE_URL=http://localhost:4000` and
   reference it via `import.meta.env.VITE_API_BASE_URL` in your API layer.

## Notes
- The **voice input** button simulates a transcribed query for demo purposes
  (no browser speech API wired in) — swap in the Web Speech API
  (`SpeechRecognition`) for real voice capture.
- The **AI Assistant** page does simple keyword matching against the mock
  services list — replace with a real LLM/NLU call to your backend.
- All state is local to the browser session (no persistence) since this is a
  frontend-only scaffold.
