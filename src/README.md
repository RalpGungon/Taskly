# Taskly — To Do List Web App

A clean, minimalist task management web app prototype built as a portfolio project. Designed with a focus on simplicity, calm productivity, and elegant UI.

---

## Live Preview

Open `index.html` directly in any modern browser — no build step, no dependencies, and no server required.

---

## Screenshots

### Dashboard

_Main app interface featuring sidebar navigation, stat cards, filters, and task lists._

<!-- Add screenshot here -->
<!-- ![Dashboard](./screenshots/dashboard.png) -->

### Task Detail Panel

_Slide-in task detail panel with editable notes and task metadata._

<!-- Add screenshot here -->
<!-- ![Task Detail Panel](./screenshots/task-detail.png) -->

### Quick Add Overlay

_Lightweight overlay for rapid task creation with priority selection._

<!-- Add screenshot here -->
<!-- ![Quick Add Overlay](./screenshots/quick-add.png) -->

### Empty State

_Empty state banner displayed when no active tasks remain._

<!-- Add screenshot here -->
<!-- ![Empty State](./screenshots/empty-state.png) -->

---

## Features

### Task Creation

- **Quick add bar** — Instantly create tasks by typing a title and pressing Enter or clicking Add
- **Priority chips** — Select High / Med / Low priority before task creation
- **Full task form** — Create detailed tasks with title, description, category, priority, and due time

### Task Management

- **Task cards** with title, description, category tags, priority tags, and due time
- **Priority border indicators** using color-coded visual accents
- **Checkbox toggle** to move tasks between Active and Completed sections
- **Hover actions** for viewing task details or deleting tasks
- **Empty state handling** when no active tasks remain

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
- Visual priority hierarchy through color and spacing

---

## Design System

### Color Palette

| Role             | Value                                             |
| ---------------- | ------------------------------------------------- |
| Background       | `#F5F2EC` — soft warm neutral                     |
| Surface (white)  | `#FFFFFF` — cards, sidebar, modals                |
| Surface (tinted) | `#EDE9E1` — secondary backgrounds                 |
| Surface (subtle) | `#D0CEC5` — scrollbar track                       |
| Primary text     | `#2C2C2A` — near-black                            |
| Muted text       | `#888780` — secondary labels                      |
| Faint text       | `#B4B2A9` — placeholders                          |
| Accent           | `#1D9E75` — primary action color                  |
| Accent light     | `#E1F5EE` — active nav background                 |
| Overlay bg       | `rgba(44, 44, 42, 0.4)` — modal overlay with blur |

### Typography

| Role               | Font                            |
| ------------------ | ------------------------------- |
| Headings & display | DM Serif Display (Google Fonts) |
| Body & UI          | DM Sans (Google Fonts)          |

### Font Weights

- `400` — body text and descriptions
- `500` — titles, labels, buttons, and stat values

---

## File Structure

```text
src/
├── index.html
├── script.js
└── README.md
```

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

## App State

Taskly currently manages application state directly through the DOM.

Task cards are dynamically created and moved between active and completed task containers without using a separate JavaScript state array or external state management library.

State resets on page refresh.

Taskly is currently a frontend-focused prototype emphasizing UI/UX and client-side interactions.

---

## Key Functions

| Function                               | Description                                                  |
| -------------------------------------- | ------------------------------------------------------------ |
| `updateAllStatUI()`                    | Updates all stat cards and badge counts                      |
| `showNotification(message)`            | Displays toast notifications                                 |
| `hidePanel()`                          | Closes the task detail panel                                 |
| `displayGreet(today)`                  | Displays a time-based greeting                               |
| `displayDate(labelDate, date, locale)` | Formats and renders the current date                         |
| `openTaskOverlay(overlay)`             | Opens a modal overlay                                        |
| `closeTaskOverlay(el)`                 | Closes a modal overlay                                       |
| `handleClickOverlay(currEl, el)`       | Closes overlay when clicking outside modal content           |
| `selectedPriority(chip)`               | Handles active priority chip selection                       |
| `showEmptyTaskState(el, length)`       | Displays the empty state banner                              |
| `hideEmptyTaskState(el, length)`       | Hides the empty state banner                                 |
| `createTaskCard()`                     | Creates and prepends a task card                             |
| `formatTime(duetime)`                  | Converts 24-hour time into AM/PM format                      |
| `handleDelete(listElement)`            | Handles task deletion logic                                  |
| `handleShowTaskDetails(element)`       | Opens task detail panel                                      |
| `animationFrame(cards)`                | Re-triggers card animations using `requestAnimationFrame`    |
| `setupPanelNoteEditing()`              | Enables editable notes functionality inside the detail panel |

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
2. Open `index.html` in any modern browser
3. No installation or dependencies required

```bash
git clone https://github.com/RalpGungon/Taskly.git
cd Taskly
open index.html
```

---

## Roadmap

### Core Improvements

- [ ] Mobile-responsive sidebar navigation
- [ ] Dark mode toggle
- [ ] Task search and global filtering
- [ ] Drag-and-drop task reordering

### Productivity Features

- [ ] Due date picker with calendar UI
- [ ] Recurring task support
- [ ] Subtasks and nested task management

### Data & Persistence

- [ ] LocalStorage or IndexedDB persistence
- [ ] Export tasks as CSV or PDF
- [ ] Cloud authentication integration (Firebase / Supabase)

---

## Portfolio Notes

This project was built as a frontend portfolio piece demonstrating:

- Clean UI/UX design from scratch
- Multi-screen application structure without frameworks
- DOM-driven task management
- Thoughtful interaction design and user feedback
- Consistent typography, spacing, and color hierarchy
- Modern frontend fundamentals using only HTML, CSS, and JavaScript

---

## Author

**Ralp Lauren**  
Portfolio Project — 2026

Built with vanilla HTML, CSS, and JavaScript.

---

## License

MIT — free to use, modify, and distribute.
