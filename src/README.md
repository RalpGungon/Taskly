# Taskly — To Do List Web App

A clean, minimalist task management web app prototype built as a portfolio project. Designed with a focus on simplicity, calm productivity, and elegant UI.

---

## Live Preview

Open `index.html` directly in any modern browser — no build step, no dependencies, no server required.

---

## Screenshots

| View              | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| Dashboard         | Main app interface — sidebar nav, stat cards, filter bar, and task lists |
| Active Section    | List of incomplete tasks with priority borders, tags, and due times      |
| Completed Section | List of finished tasks                                                   |
| Quick Add Overlay | Lightweight input modal with priority chip selector                      |
| New Task Form     | Full modal form — title, description, priority, category, and due time   |
| Task Detail Panel | Slide-in panel showing task info and an editable notes field             |
| Empty State       | "No tasks" banner shown when the active list is empty                    |

---

## Features

### Task Creation

- **Quick add bar** — Type a task title and click Add or press Enter to instantly create a task
- **Priority chips** — Select High / Med / Low priority before adding (only one chip active at a time)
- **Full task form** — Modal form with title, description, priority, category, and due time fields

### Task Management

- **Task cards** — Display title, description, priority tag, category tag, and due time
- **Priority border indicators** — Color-coded left border per priority level (red / amber / green)
- **Checkbox toggle** — Mark tasks active or complete; completed tasks move to the done section
- **Hover actions** — View detail arrow button and delete trash button appear on hover
- **Active section** — Lists all incomplete tasks with empty state when none exist
- **Completed section** — Lists all finished tasks

### Filtering

- **Menu nav filters** — All Tasks, Today, Upcoming, Priority, Completed
- **Category filters** — Work, Personal, Health, Learning
- **View filter bar** — All, Active, Done

### Task Detail Panel

- Slide-in from the right when clicking the arrow on a task card
- Shows: title, priority badge, category badge, due time, and status (Active / Completed)
- Delete button removes task and closes panel
- Close button (×) dismisses the panel

### Stats Bar

- 4 stat cards: Total tasks, Completed, Pending, High Priority
- Live badge counts on nav items (All Tasks, Today)
- Task count labels under each section header
- Personalized time-based greeting (morning / afternoon / evening)
- Dynamic date display based on the user's locale

### Toast Notifications

- Appears on: task added, task completed, task deleted, and invalid form input
- Auto-dismisses after 3 seconds
- Centered at bottom of screen

### UX Details

- `fadeUp` keyframe animation on task cards — fades in from `translateY(16px)` to `0` at `0.3s ease`
- `fadeUp` animation on quick add overlay and full task form modal at `0.25s ease`
- Task detail panel slides in via `right: 0` + `opacity: 1` transition at `0.5s` (no separate keyframe — CSS property transition)
- Toast notification slides up via `translateY(20px)` → `0` + `opacity` transition at `0.3s`
- Accent border highlight on quick add input box on `:focus-within` at `0.15s`
- Modal backdrop uses `backdrop-filter: blur(10px)` with `rgba(44,44,42,0.4)` overlay
- Filter and category buttons have `0.15s` background/color transitions on hover and active states
- Task card hover reveals action buttons (arrow + trash) with `opacity 0.2s` transition
- All interactive elements have hover states with tinted background or color shifts
- Empty state banner shown when no active tasks remain

---

## Design System

### Color Palette

| Role             | Value                                              |
| ---------------- | -------------------------------------------------- |
| Background       | `#F5F2EC` — soft warm neutral                      |
| Surface (white)  | `#FFFFFF` — cards, sidebar, modals                 |
| Surface (tinted) | `#EDE9E1` — secondary backgrounds, hover states    |
| Surface (subtle) | `#D0CEC5` — scrollbar track                        |
| Primary text     | `#2C2C2A` — near-black                             |
| Muted text       | `#888780` — secondary labels                       |
| Faint text       | `#B4B2A9` — placeholders, disabled                 |
| Accent           | `#1D9E75` — teal green (primary action color)      |
| Accent light     | `#E1F5EE` — active nav bg, low priority tag bg     |
| Overlay bg       | `rgba(44, 44, 42, 0.4)` — modal backdrop with blur |

### Priority Border Colors

| Priority | Border Color           |
| -------- | ---------------------- |
| High     | `#E24B4A` — red        |
| Med      | `#EF9F27` — amber      |
| Low      | `#1D9E75` — teal green |

### Tag Colors

| Tag                    | Background | Text      |
| ---------------------- | ---------- | --------- |
| High (red)             | `#FCEBEB`  | `#A32D2D` |
| Med (amber)            | `#FAEEDA`  | `#633806` |
| Low / Personal (green) | `#E1F5EE`  | `#085041` |
| Work (blue)            | `#E6F1FB`  | `#185FA5` |
| Learning (gray)        | `#EDE9E1`  | `#888780` |

### Typography

| Role               | Font                            |
| ------------------ | ------------------------------- |
| Headings & display | DM Serif Display (Google Fonts) |
| Body, labels, UI   | DM Sans (Google Fonts)          |

### Font Weights

- Regular `400` — body text, descriptions, muted labels
- Medium `500` — titles, nav items, buttons, stat values

---

## File Structure

```
src/
├── index.html       # Complete single-file app (HTML + CSS + JS)
├── script.js        # App logic (vanilla JS)
└── README.md        # This file
```

Everything lives in a single self-contained HTML file — no frameworks, no build tools, no external dependencies beyond Google Fonts and Font Awesome (loaded via CDN).

---

## Tech Stack

| Layer     | Technology                                         |
| --------- | -------------------------------------------------- |
| Structure | HTML5                                              |
| Styling   | Vanilla CSS (custom properties, CSS Grid, Flexbox) |
| Logic     | Vanilla JavaScript (ES6+)                          |
| Fonts     | Google Fonts — DM Serif Display, DM Sans           |
| Icons     | Font Awesome (via CDN)                             |
| State     | DOM-based (no localStorage, no JS state array)     |

---

## App State

Taskly manages state directly through the DOM — task cards are real HTML elements moved between the `activeList` and `doneList` containers. There is no separate JS data array.

State resets on page refresh — this is a UI prototype, not a persistent app.

---

## Key Functions

| Function                               | Description                                                               |
| -------------------------------------- | ------------------------------------------------------------------------- |
| `updateAllStatUI()`                    | Recalculates and updates all stat cards, badge counts, and section labels |
| `showNotification(message)`            | Displays a bottom toast notification for 3 seconds                        |
| `hidePanel()`                          | Closes the task detail side panel                                         |
| `displayGreet(today)`                  | Shows a time-based greeting (morning / afternoon / evening)               |
| `displayDate(labelDate, date, locale)` | Formats and renders the current date using the user's locale              |
| `openTaskOverlay(overlay)`             | Shows a modal overlay by adding the visibility class                      |
| `closeTaskOverlay(el)`                 | Hides a modal overlay by removing the visibility class                    |
| `handleClickOverlay(currEl, el)`       | Closes an overlay when clicking the background (outside content)          |
| `selectedPriority(chip)`               | Attaches click behavior to a priority chip; ensures only one is active    |
| `showEmptyTaskState(el, length)`       | Shows the empty state banner when the active list is empty                |
| `hideEmptyTaskState(el, length)`       | Hides the empty state banner when tasks exist                             |
| `createTaskCard()`                     | Creates and prepends a task card from the quick add input                 |
| `formatTime(duetime)`                  | Converts a 24-hour time string (HH:MM) to 12-hour AM/PM format            |
| `handleDelete(listElement)`            | Attaches delete logic to trash icon clicks within a list                  |
| `handleShowTaskDetails(element)`       | Attaches arrow-click logic to open the detail panel for a task            |
| `animationFrame(cards)`                | Resets card animations using requestAnimationFrame for re-triggering      |
| setupPanelNoteEditing()                | Editable notes field                                                      |

---

## How to Run

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. No installation, no npm, no server needed

```bash
git clone https://github.com/RalpGungon/Taskly.git
cd Taskly
open index.html   # macOS
# or double-click taskly.html on Windows/Linux
```

---

## Roadmap (Future Features)

- [ ] LocalStorage or IndexedDB persistence
- [ ] Drag-and-drop task reordering
- [ ] Due date picker (calendar UI)
- [ ] Real authentication (Firebase / Supabase)
- [ ] Mobile responsive sidebar (hamburger menu)
- [ ] Dark mode toggle
- [ ] Task search / global filter
- [ ] Recurring tasks
- [ ] Export tasks as CSV or PDF
- [ ] Subtask support

---

## Portfolio Notes

This project was built as a UI/UX portfolio piece demonstrating:

- Clean, minimalist design system from scratch
- Multi-screen app navigation without a framework
- DOM-driven state management in vanilla JavaScript
- Thoughtful UX patterns (toast feedback, empty states, hover actions, animations)
- Consistent visual hierarchy using typography and color

---

## Author

**Ralp Lauren.**
Portfolio project — 2026
Built with vanilla HTML, CSS, and JavaScript.

---

## License

MIT — free to use, modify, and distribute.
