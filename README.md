# Taskly — To Do List Web App

A clean, minimalist task management web app prototype built as a portfolio project. Designed with a focus on simplicity, calm productivity, and elegant UI.

---

## Live Preview

Open `src/index.html` directly in any modern browser — no build step, no dependencies, and no server required.

---

## Screenshots

### Dashboard

_Main app interface featuring sidebar navigation, stat cards, filters, and task lists._
![Dashboard](https://github.com/RalpGungon/Taskly/blob/344a97a2003e76ca7882f03464adec74a7b6bc0b/src/images/screenshots/dashboard.png)

### Task Detail Panel

_Slide-in task detail panel with editable notes and task metadata._

![Task Detail Panel](https://github.com/RalpGungon/Taskly/blob/1c7c6ec01cb91793de541f4ba3ba5631700a9bfe/src/images/screenshots/taskdetailpanel.png)

### Quick Add Overlay

_Lightweight overlay for rapid task creation with priority selection._

![Quick Add Overlay](https://github.com/RalpGungon/Taskly/blob/cf9a0661cb1288fabe5c77fde49ab2006aae404f/src/images/screenshots/quickAddOverlay.png)

### Empty State

_Empty state banner displayed when no active tasks remain._

![Empty State](https://github.com/RalpGungon/Taskly/blob/619a5e4eda249d038869a6d32e3f9b33f1396056/src/images/screenshots/emptystate.png)

---

## Features

### Task Creation

- **Quick add bar** — Instantly create tasks by typing a title and pressing Enter or clicking Add
- **Priority chips** — Select High / Med / Low priority before task creation
- **Full task form** — Create detailed tasks with title, description, category, priority, and due time

### User Authentication & Persistence

- Built-in **Sign in** and **Create account** forms for per-user access
- Tasks are saved to browser `localStorage` for each signed-in account
- Reloading and signing in again restores tasks, stats, and badges

### Task Management

- **Task cards** with title, description, category tags, priority tags, and due time
- **Priority border indicators** using color-coded visual accents
- **Checkbox toggle** to move tasks between Active and Completed sections
- **Hover actions** for viewing task details or deleting tasks
- **Empty state handling** when no active tasks remain
- **Mobile-responsive sidebar navigation** for smooth use on smaller screens

### Filtering

- Sidebar navigation filters:
  - All Tasks
  - Today
  - Upcoming
  - Priority
  - Completed

- Category filters:
  - Work
  - Personal
  - Health
  - Learning

- View filter bar:
  - All
  - Active
  - Done

### Task Detail Panel

- Slide-in panel interaction
- Displays:
  - Title
  - Status
  - Category
  - Priority
  - Due time
  - Editable notes

### Stats & Dynamic UI

- Live stat cards:
  - Total Tasks
  - Completed
  - Pending
  - High Priority

- Dynamic UI updates:
  - Real-time badge counts
  - Personalized greeting based on time of day
  - Locale-based date formatting

### Toast Notifications

- Notifications for:
  - Task added
  - Task completed
  - Task deleted
  - Invalid form input

- Auto-dismiss after 3 seconds

### UX Highlights

- Smooth fade and slide animations
- Interactive hover states
- Blur-backed modal overlays
- Empty state feedback
- Lightweight transitions across interactive elements
- Dark mode toggle with animated theme switcher
- Visual priority hierarchy through color and spacing

---

## File Structure

src/
├── index.html
├── media.css
├── README.md
├── script.js
├── style.css
└── images/

````

The app is built using simple separated frontend files — no frameworks, build tools, or package managers required.

---

## Tech Stack

| Layer     | Technology                                     |
| --------- | ---------------------------------------------- |
| Structure | HTML5                                          |
| Styling   | Vanilla CSS (Flexbox, Grid, Custom Properties) |
| Logic     | Vanilla JavaScript (ES6+)                      |
| Fonts     | Google Fonts — DM Serif Display & DM Sans      |
| Icons     | Font Awesome (via CDN)                         |
| State     | DOM-driven UI state management                 |

---


## Challenges & Learnings

Building Taskly helped strengthen my understanding of:

- DOM-driven state management
- Dynamic UI rendering without frameworks
- Component-like UI structuring using vanilla JavaScript
- Designing reusable visual systems with CSS
- Modal layering and interaction handling
- Building polished user interactions using transitions and animations

---

## How to Run

1. Clone or download this repository
2. Open `src/index.html` in any modern browser
3. Create an account (optional) via the built-in Sign up form to persist tasks per-user
4. No installation or dependencies required — app runs entirely in the browser

```bash
git clone https://github.com/RalpGungon/Taskly.git
cd Taskly
# Open the app in your default browser (Windows)
start src\index.html
# Or open the file directly from your file manager
````

Notes:

- Tasks and user accounts are persisted to the browser's `localStorage` (per-user).
- To test persistence: create an account with the Sign up form, add tasks while signed in, then reload the page and Sign in to the same account — your tasks will reappear.

---

## Roadmap

### Core Improvements

- [ ] Task search and global filtering
- [ ] Drag-and-drop task reordering

### Productivity Features

- [ ] Due date picker with calendar UI
- [ ] Recurring task support
- [ ] Subtasks and nested task management

### Data & Persistence

- [x] LocalStorage persistence (per-user) — implemented
- [ ] Export tasks as CSV or PDF
- [ ] Cloud authentication integration (Firebase / Supabase)

---

## Author

**Ralp Lauren**  
Portfolio Project — 2026

Built with vanilla HTML, CSS, and JavaScript.

---

## License

MIT — free to use, modify, and distribute.
