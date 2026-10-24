UPSC ZONE AI

Your Smart Companion for UPSC Preparation

UPSC ZONE AI is a responsive, web-based preparation companion designed to help UPSC aspirants organize their daily studies, practise multiple-choice questions, identify topics for revision, improve answer-writing habits, and track their preparation progress.

Instead of treating preparation as a collection of disconnected activities, UPSC ZONE AI brings practice, revision, planning, and progress tracking together in one place.

---

 Features

 1. Responsive Landing Page

- Clean, modern interface designed for UPSC aspirants.
- Responsive layout for desktop and mobile screens.
- Navigation menu with links to important sections.
- Mobile navigation menu with open and close functionality.
- Hero section introducing the platform and its purpose.

 2. Study Focus Selector

- Choose a preparation focus: Prelims, Mains, or Current Affairs.
- Explore relevant study suggestions and calls to action.
- Navigate directly to the corresponding preparation activities.

 3. Daily Challenge Quiz

- Interactive multiple-choice question practice.
- Answer selection and submission.
- Automatic score calculation.
- Correct-answer explanations and answer review.
- Retry functionality for additional practice.
- Best quiz score tracking using browser storage.

 4. Smart Study Recommendations

- Tracks incorrect answers by subject.
- Identifies topics with recorded mistakes.
- Displays a personalized revision suggestion based on the available mistake data.
- Provides links to relevant learning sections.
- Saves weak-topic data in browser storage so it can be used across visits on the same browser.

Note: The current recommendation system uses rule-based JavaScript logic. It does not currently connect to a live AI model.

 5. Preparation Progress Dashboard

- Displays preparation progress across key study areas.
- Provides a quick overview of learning activities.
- Helps users keep their preparation organized.

 6. Mains Answer-Writing Practice

- Text area for practising written answers.
- Word counter to monitor answer length.
- Writing guidance to support answer development.

 7. Current Affairs Notes

- Dedicated space to record current-affairs notes.
- Word counter for concise note preparation.
- Guidance to help structure and analyse notes.

 8. Personalized Daily Study Planner

- Select available study time: 1, 2, 3, or 4+ hours.
- Choose a preparation focus: Prelims, Mains, or Current Affairs.
- Generate a study roadmap with suggested tasks and time allocations.
- Tick off completed activities.
- View completion percentage through a progress bar.
- Save and restore planner selections and task progress using browser storage.

 9. UPSC Mission Control

- Daily checklist covering quiz practice, study planning, and answer-writing practice.
- Visual progress bar and completion percentage.
- Automatic completion of the quiz mission after quiz completion.
- Automatic completion of the planner mission when all generated planner tasks are completed.
- Manually track the answer-writing mission.
- Save and restore mission status using browser storage.

 10. Browser-Based Progress Persistence

- Uses JavaScript and "localStorage" to retain supported progress information.
- Remembers selected planner tasks, mission completion status, quiz best score, and recorded weak-topic data.
- Allows supported saved information to remain available after a page refresh on the same browser and device.

Note: This version does not provide user accounts, server-side storage, or automatic cross-device synchronization. Clearing browser storage may remove saved information.

---

 Technology Stack

Technology| Purpose
HTML5| Website structure and content
CSS3| Layout, responsive design, styling, and visual feedback
JavaScript| Quiz logic, study planning, recommendations, and progress tracking
Browser "localStorage"| Saving supported user progress locally

The project is built with frontend web technologies and does not currently require a backend server or a live AI API.

---

 Project Structure

upsc-zone-ai/
│
├── index.html    # Website structure and content
├── style.css     # Styling and responsive layout
├── script.js     # Interactive functionality
└── README.md     # Project documentation

---

Getting Started

Prerequisites

- A modern web browser.
- A code editor such as Visual Studio Code.
- The VS Code Live Server extension (optional, for local development).

Run Locally

1. Clone the repository:
   
   git clone YOUR_GITHUB_REPOSITORY_URL

2. Open the downloaded project folder in Visual Studio Code.

3. Open "index.html" in your browser, or right-click it and select Open with Live Server if the extension is installed.

4. Explore the study focus selector, Daily Challenge, recommendations, planner, answer-writing area, Current Affairs notes, and Mission Control.

Replace "YOUR_GITHUB_REPOSITORY_URL" with the actual URL of your repository.

---

 How It Works

1. The user selects a preparation focus.
2. The user practises questions through the Daily Challenge.
3. JavaScript evaluates answers and calculates the quiz score.
4. Incorrect answers are recorded by subject, allowing the rule-based recommendation feature to suggest revision.
5. The user generates a daily study plan based on available time and preparation focus.
6. Task completion updates the planner's progress indicator.
7. Mission Control tracks daily preparation activities.
8. Supported progress information is saved locally using "localStorage".

This workflow helps connect practice, revision, planning, and daily accountability.

---

 Responsive Design

UPSC ZONE AI is designed to adapt to different screen sizes, including:

- Desktop and laptop screens.
- Tablets.
- Mobile phones.

The navigation and page layout are designed to remain usable on smaller screens.

---

 Future Enhancements

Potential future improvements include:

- Integration with a real AI model for syllabus-aware study recommendations.
- A larger, carefully verified UPSC question bank.
- More detailed subject-wise performance analytics.
- Daily current-affairs updates from reliable sources.
- Secure user accounts and cloud-based progress synchronization.
- More advanced answer-writing feedback.
- Personalized revision schedules based on learning history.
- Accessibility improvements and expanded automated testing.

These are proposed enhancements and are not claims about existing functionality.

---

 Project Goal

The goal of UPSC ZONE AI is to make UPSC preparation more organized and manageable by bringing essential study activities into a single, accessible web experience.

The project emphasizes consistent practice, targeted revision, structured planning, and visible progress.

---

 Team

- Team Name: Soloforge
- Team Member: Krupalini Paul Kambhampaty
- Project Category: Web Development / EdTech

---

 Project Links

- GitHub Repository: https://github.com/paulkrupalini-rgb/upsc-zone


---

 License

Choose and add an appropriate open-source license if you intend to distribute the project under one. Until then, no license is specified.

---

Built for UPSC aspirants who want to prepare with greater structure, consistency, and focus.
