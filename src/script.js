"use strict";

// ============================================================
// DOM REFERENCES
// Grab all HTML elements used throughout the app.
// Declared at the top so they're easy to find and reuse.
// ============================================================

// --- Header / Greeting area -
const LabelTaskSummary = document.querySelector(".task-summary__text"); // "You have X tasks remaining today"
const displayCurrentDate = document.querySelector(".task-summary__date"); // Date display in the header
const displayGreeting = document.querySelector(".greeting"); // Greeting text container
const greetingName = document.querySelector(".greeting__name"); // User name in the greeting

// --- Sidebar navigation ---
const menuList = document.querySelector(".menu__list"); // Full menu list (All Tasks, Today, etc.)

// --- Badge counts in nav ---
const allBadge = document.getElementById("allBadge"); // Badge count: All Tasks
const todayBadge = document.getElementById("todayBadge"); // Badge count: Today

// --- Stat card labels ---
const LabelStat_highPriority = document.querySelectorAll("#stat-high"); // High priority count (multiple instances)
const LabelStat_pending = document.getElementById("stat-pending"); // Pending tasks count
const LabelStat_done = document.getElementById("stat-done"); // Completed tasks count
const LabelStat_total = document.getElementById("stat-total"); // Total tasks count

// --- Section count labels ---
const LabelActiveTask_count = document.querySelector(".task-section__count"); // "X tasks" in the Active section
const LabelCompletedTask_count = document.querySelector(
  ".completed-section_count",
); // "X tasks" in the Completed section

// --- Quick add overlay ---
const quickTask__overlay = document.querySelector(".quick-task__overlay"); // Background overlay of the quick add
const quickTask__btn = document.querySelector(".quick-task__btn"); // Button that opens the quick add

// --- Full task form modal ---
const form = document.querySelector(".task-form"); // The actual <form> element
const taskForm__overlay = document.querySelector(".task-form__overlay"); // Background overlay of the full form
const taskForm__openBtn = document.querySelector(".task-form__open-btn"); // "Advanced" button that opens the full form
const formBtn__cancel = document.querySelector(".form-btn-cancel"); // Cancel button in the full form
const chips__priority = document.querySelectorAll(".chip"); // All priority chips (High / Med / Low)

// --- Task lists ---
const activeList = document.getElementById("activeList"); // Container for active (incomplete) tasks
const doneList = document.getElementById("doneList"); // Container for completed tasks
const taskActionContainer = document.querySelector(".task-actions"); // Hover action buttons (arrow, trash)

// --- Quick add input ---
const quick__input = document.querySelector(".add-input"); // Text input for the quick add
const quickTask__submit = document.querySelector(".quickTaskBtn__submit"); // Submit button for the quick add
const taskNameInput = document.querySelector("input[name='task-name']"); // Input field selected using the name attribute "~task-name"
const description = document.getElementById("textarea");

// --- View filter bar (All / Active / Done) ---
const filter_buttons_container = document.querySelector(".filter-buttons"); // Container for filter buttons
const filter_buttons = document.querySelectorAll(".filter-btn"); // All filter buttons
const tasks_section = document.querySelectorAll("[data-task-status]"); // Active and Done sections

// --- Task detail side panel ---
const panelContainer = document.querySelector(".task-detail-panel"); // The full side panel
const panelCloseBtn = document.querySelector(".task__close"); // × close button
const panelTaskName = document.querySelector(".task__name"); // Task title in the panel
const panelPriority = document.querySelector(".detail-priority"); // Priority badge in the panel
const panelCategory = document.querySelector(".detail-category"); // Category badge in the panel
const panelDueTime = document.querySelector(".detail-due-time"); // Due time in the panel
const panelStatus = document.querySelector(".detail-status"); // Status (Active / Completed) in the panel
const panelNote = document.querySelector("#notes"); // Notes textarea in the panel
const panelDeleteBtn = document.querySelector(".panel-delete-btn"); // Delete button in the panel

// --- Empty state + categories ---
const emptyStateEl = document.querySelector(".emptyTask"); // "No tasks" empty state banner
const categoriesContainter = document.querySelector(".categories__list"); // Category filter buttons container

// ============================================================
// APP STATE
// ============================================================
const today = new Date(); // Current date and time
const locale = navigator.language; // User's browser locale (e.g. "en-US", "fil-PH")

// ============================================================
// STATS: updateAllStatUI
// Updates all stat cards, badge counts, and section labels
// based on the current contents of activeList and doneList.
// Called after every add / complete / delete action.
// ============================================================
function updateAllStatUI() {
  const allTasks = document.querySelectorAll(".task-card").length;
  const highTasks = document.querySelectorAll(
    ".task-card.high-priority",
  ).length;
  let completedTasks_count = doneList.children.length;
  let activeTaskCount = activeList.children.length;
  let total_tasks = activeTaskCount + completedTasks_count;

  // Update badge counts in the sidebar nav
  allBadge.textContent = total_tasks;
  todayBadge.textContent = activeTaskCount;

  // Update the task summary text in the header
  LabelTaskSummary.textContent = `You have ${activeTaskCount} tasks remaining today.`;

  // Update stat cards
  LabelStat_total.textContent = allTasks;
  LabelStat_done.textContent = completedTasks_count;
  LabelStat_pending.textContent = activeTaskCount;

  // Update section count labels
  LabelActiveTask_count.textContent = `${activeTaskCount} tasks`;
  LabelCompletedTask_count.textContent = `${completedTasks_count} tasks`;

  // High priority count — multiple labels share the same ID, so forEach is used
  LabelStat_highPriority.forEach((label) => {
    label.textContent = highTasks;
  });
}

// Call immediately on load so stats are accurate even before any tasks are added
updateAllStatUI();

// ============================================================
// TOAST NOTIFICATION: showNotification
// Displays a toast message at the bottom of the screen.
// Auto-dismisses after 3 seconds.
// ============================================================
const showNotification = function (message) {
  const notification = document.querySelector(".notification");
  notification.textContent = message;
  notification.classList.add("showNotification");

  // Remove the class after 3 seconds to hide the toast
  setTimeout(() => notification.classList.remove("showNotification"), 6000);
};

// ============================================================
// DETAIL PANEL: hidePanel
// Hides the task detail side panel on the right.
// ============================================================
const hidePanel = () => panelContainer.classList.remove("show-detail-panel");

// ============================================================
// CLEAR INPUT: clearInput
// Clears the quick add, task name and description inputs .
// ============================================================
const clearInput = () => {
  quick__input.value = "";
  taskNameInput.value = "";
  description.value = "";
};

// ============================================================
// GREETING: displayGreet
// Displays a time-based greeting in the header.
// Based on the hour: morning (< 12), afternoon (12–17), evening (>= 18).
// ============================================================
const displayGreet = function (today) {
  const hour = today.getHours();
  const greetingMessage =
    hour >= 18
      ? "Good evening"
      : hour >= 12
        ? "Good afternoon"
        : "Good morning";

  // Inject the greeting and name into the DOM
  displayGreeting.innerHTML = `${greetingMessage}, <em class="greeting__name">Ralp.</em>`;
};
displayGreet(today);

// ============================================================
// DATE DISPLAY: displayDate
// Formats and displays the current date using the Intl API.
// Uses the browser's locale for the correct date format.
// ============================================================
const displayDate = function (labelDate, date, locale) {
  const options = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  };

  // Intl.DateTimeFormat — built-in JS API for locale-aware date formatting
  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(date);
};
displayDate(displayCurrentDate, today, locale);

// ============================================================
// OVERLAY HELPERS
// Two utility functions for showing and hiding modal overlays.
// Used for both the quick add overlay and the full task form overlay.
// ============================================================

// Show an overlay by adding the visibility CSS class
const openTaskOverlay = function (overlay) {
  overlay.classList.add("modal-visible");
  quick__input.focus();
};

// Hide an overlay by removing the visibility CSS class
const closeTaskOverlay = function (el) {
  el.classList.remove("modal-visible");
};

// Close the overlay only when the background (not the content) is clicked
const handleClickOverlay = function (currEl, el) {
  if (currEl === el) {
    closeTaskOverlay(el);
    clearInput();
  }
};

// ============================================================
// OVERLAY EVENT LISTENERS
// ============================================================

// Open the quick add overlay when the add task button is clicked
quickTask__btn.addEventListener("click", () => {
  openTaskOverlay(quickTask__overlay);
});

// Close the quick add overlay when clicking the background
quickTask__overlay.addEventListener("click", (e) => {
  handleClickOverlay(e.target, quickTask__overlay);
});

// When the "Advanced" button is clicked, close quick add and open the full form
taskForm__openBtn.addEventListener("click", () => {
  closeTaskOverlay(quickTask__overlay);
  openTaskOverlay(taskForm__overlay);
  taskNameInput.focus();
  clearInput();
});

// Close the full form overlay when the Cancel button is clicked
formBtn__cancel.addEventListener("click", () => {
  closeTaskOverlay(taskForm__overlay);
  clearInput();
});

// ============================================================
// PRIORITY CHIPS: selectedPriority
// Attaches a click event to each priority chip.
// Ensures only one chip is active at a time.
// ============================================================
function selectedPriority(selected_chip) {
  const chip_data = selected_chip.dataset.priority; // "high", "med", or "low"

  selected_chip.addEventListener("click", (e) => {
    // Clear all active chips before applying the new selection
    chips__priority.forEach((chip) =>
      chip.classList.remove("selected-high", "selected-medium", "selected-low"),
    );

    // Apply the selection class based on the clicked chip's priority
    selected_chip.classList.add(`selected-${chip_data}`);
  });
}
// Initialize click listeners for all priority chips
chips__priority.forEach(selectedPriority);

// ============================================================
// EMPTY STATE HELPERS
// Shows or hides the "No tasks" banner in the active section.
// ============================================================

// Show the empty state when the active list has no tasks
const showEmptyTaskState = function (emptyStateEl, taskListLength) {
  if (taskListLength === 0) {
    emptyStateEl.classList.add("show-emptyTask__banner");
  }
};

// Hide the empty state when there are tasks in the active list
const hideEmptyTaskState = function (emptyStateEl, taskListLength) {
  if (taskListLength !== 0) {
    emptyStateEl.classList.remove("show-emptyTask__banner");
  }
};

// Local Storage

const getUsers = function () {
  return JSON.parse(localStorage.getItem("user_data")) || [];
};

const users = getUsers();

function saveUsers(users) {
  localStorage.setItem("user_data", JSON.stringify(users));
}

// ============================================================
// QUICK ADD: createTaskCard
// Creates a task card from the quick add input bar.
// Uses the selected priority chip for the color and label.
// ============================================================
const createTaskCard = function () {
  let quickInputVal = quick__input.value;

  // Validation — input cannot be empty
  if (!quickInputVal) {
    showNotification("Please enter a task");
    return;
  }

  // Get the currently selected priority chip (if any)
  const selectedChip = document.querySelector(
    ".chip.selected-high, .chip.selected-medium, .chip.selected-low",
  );

  // Default priority if no chip is selected
  let chip_priority = "low";
  let priority = "low";
  let chipText = "Low";

  if (selectedChip) {
    // Determine which priority was selected
    if (selectedChip.classList.contains("selected-high")) {
      chip_priority = "high";
    } else if (selectedChip.classList.contains("selected-medium")) {
      chip_priority = "medium";
    }

    // Clear the selection after reading the value
    selectedChip.classList.remove(`selected-${chip_priority}`);

    priority = selectedChip.dataset.priority;
    chipText = selectedChip.textContent.trim(); // The text shown on the tag (e.g. "High")
  }

  // Color for the priority tag
  const tagColor =
    priority === "high" ? "red" : priority === "medium" ? "amber" : "green";

  // CSS class for the task card's left border color
  const borderLeftColor =
    priority === "high" ? "high" : priority === "medium" ? "med" : "low";

  // Get the current time for the due time display
  // const time = today.toLocaleTimeString("en-US", {
  //   hour: "numeric",
  //   minute: "numeric",
  // });

  const defaultDue = "Today";

  // Create the new task card HTML element
  const task = document.createElement("div");
  task.className = `task-card ${borderLeftColor}-priority`;

  task.innerHTML = `
    <div class="task-card__checkbox">
            <input type="checkbox" aria-label="Mark task as complete">
    </div>
    <div class="task-card__content">
        <h3 class="task-card__title">${quickInputVal}</h3>
           <div class="task-card__meta">
            <span class="tag tag-${tagColor} priority">${chipText}</span>
            <span class="tag tag-green category">Personal</span>
            <span class="task-card__time">
            <i class="fa-regular fa-clock"></i>
              ${defaultDue}</span>
            </div>
     </div>
    <div class="task-actions">
      <i class="fa-solid fa-trash"></i>
    </div>
  `;

  // Prepend to the active list so it appears at the top
  activeList.prepend(task);

  // Update all stat UI
  updateAllStatUI();

  showNotification("Task added!");
  closeTaskOverlay(quickTask__overlay);
  hideEmptyTaskState(emptyStateEl, activeList.children.length);

  // Clear the input field after adding the task
  quick__input.value = "";
};

quickTask__submit.addEventListener("click", createTaskCard);

// ============================================================
// TIME FORMATTER: formatTime
// Converts a 24-hour time string (HH:MM) to
// 12-hour AM/PM format for display on task cards.
// ============================================================
function formatTime(duetime) {
  let [hours, minutes] = duetime.split(":").map(Number);

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

// ============================================================
// FULL FORM SUBMIT
// Handles the submit event of the detailed task form modal.
// Creates a task card with the full set of fields:
// title, description, priority, category, and due time.
// ============================================================
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the page from reloading

  // Get all form values using the FormData API
  const data = new FormData(e.target);

  const values = {
    taskName: data.get("task-name"),
    description: data.get("description"),
    priority: data.get("priority"),
    category: data.get("category"),
    dueTime: data.get("due-time"),
  };

  const { taskName, description, priority, category, dueTime } = values;

  // Determine the CSS class for the left border based on priority
  const borderPriority =
    priority === "High" ? "high" : priority === "Medium" ? "med" : "low";

  // Determine the color of the priority tag
  const priorityColor =
    priority === "High" ? "red" : priority === "Medium" ? "amber" : "green";

  // Determine the color of the category tag
  const categoryColor =
    category === "Work"
      ? "blue"
      : category === "Personal"
        ? "green"
        : category === "Health"
          ? "amber"
          : "gray"; // Default: Learning

  // Create the new task card element
  const detailedTask = document.createElement("div");
  detailedTask.className = `task-card ${borderPriority}-priority`;

  detailedTask.innerHTML = `
    <div class="task-card__checkbox">
      <input type="checkbox" aria-label="Mark task as complete">
    </div>
      <div class="task-card__content">
          <h3 class="task-card__title">${taskName}</h3>
          <p class="task-card__description">${description}</p>
            <div class="task-card__meta">
              <span class="tag tag-${priorityColor} priority">${priority}</span>
              <span class="tag tag-${categoryColor} category">${category}</span>
              <span class="task-card__time">
              <i class="fa-regular fa-clock"></i>
               ${formatTime(dueTime)}</span>
            </div>
      </div>
      <div class="task-actions">
        <i class="fa-solid fa-arrow-right"></i>
        <i class="fa-solid fa-trash"></i>
      </div>
  `;

  // Prepend to the active list so it appears at the top
  activeList.prepend(detailedTask);

  form.reset(); // Clear all form fields
  updateAllStatUI();

  showNotification("Task added!");
  hideEmptyTaskState(emptyStateEl, activeList.children.length);
  closeTaskOverlay(taskForm__overlay);
});

// ============================================================
// COMPLETE TASK
// When the user checks a checkbox in the active list,
// move the task card to the done list.
// ============================================================
activeList.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    if (!e.target.checked) return; // Ignore when unchecking

    const task = e.target.closest(".task-card");
    doneList.prepend(task); // Move to the done list

    // Update all stat UI
    updateAllStatUI();
    hidePanel();
    showNotification("Task completed!");
    showEmptyTaskState(emptyStateEl, activeList.children.length);
  }
});

// ============================================================
// UNCOMPLETE TASK
// When the user unchecks a checkbox in the done list,
// move the task card back to the active list.
// ============================================================
doneList.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    if (e.target.checked) return; // Ignore when checking

    const task = e.target.closest(".task-card");
    activeList.prepend(task); // Move back to the active list

    // Update all stat UI
    updateAllStatUI();
    hidePanel();
    showNotification("Task added");
    hideEmptyTaskState(emptyStateEl, activeList.children.length);
  }
});

// ============================================================
// DELETE TASK: handleDelete
// Uses event delegation — listens on the entire list container.
// When the trash icon inside a task card is clicked,
// that card is removed from the list.
// ============================================================
const handleDelete = function (listElement) {
  listElement.addEventListener("click", (e) => {
    if (e.target.matches(".fa-trash")) {
      e.stopPropagation(); // Prevent triggering other click events
      const task = e.target.closest(".task-card");
      listElement.removeChild(task);
      // Update all stat UI
      updateAllStatUI();
      showNotification("Task deleted");
      showEmptyTaskState(emptyStateEl, activeList.children.length);
    }
  });
};
// Apply delete logic to both lists
handleDelete(activeList);
handleDelete(doneList);

// ============================================================
// TASK DETAIL PANEL: handleShowTaskDetails
// When the arrow icon on a task card is clicked,
// extract the task's details and display them in the side panel.
// ============================================================

let currentDescriptEl = null;

const handleShowTaskDetails = function (element) {
  element.addEventListener("click", function (e) {
    const arrow = e.target.closest(".fa-arrow-right");
    const card = e.target.closest(".task-card");

    // Exit if the arrow wasn't clicked or it's outside a task card
    if (!arrow || !card) return;

    // Extract data from the task card
    const taskTitle = e.target
      .closest(".task-card")
      .querySelector(".task-card__title").textContent;

    const priorityEl = card.querySelector(".priority");
    const categoryEl = card.querySelector(".category");

    const descriptionEl = e.target
      .closest(".task-card")
      .querySelector(".task-card__description");
    const checkbox = card.querySelector('input[type="checkbox"]');

    const priority = priorityEl ? priorityEl.innerText : "N/A";
    const category = categoryEl ? categoryEl.innerText : "N/A";
    const description = descriptionEl ? descriptionEl.innerText : "";

    // Extract and format the due time from the card
    const dueTime = e.target
      .closest(".task-card")
      .querySelector(".task-card__time")
      .innerText.trim();

    const clean = dueTime.replace(/\s+/g, ""); // Remove extra whitespace
    const [time, period] = [clean.slice(0, -2), clean.slice(-2)]; // Split time and AM/PM
    const [hour, minute] = time.split(":");
    const formattedDueTime = `${hour}:${String(minute).padStart(2, "0")} ${period}`;

    // Populate the panel fields
    panelTaskName.textContent = taskTitle;
    panelPriority.textContent = priority;
    panelCategory.textContent = category;
    panelDueTime.textContent = formattedDueTime;
    panelStatus.textContent = `${!checkbox.checked ? "Active" : "Completed"}`;
    panelNote.value = description;

    currentDescriptEl = descriptionEl;

    // Show the side panel
    panelContainer.classList.add("show-detail-panel");
  });
};

// Apply to both lists
handleShowTaskDetails(activeList);
handleShowTaskDetails(doneList);

// Close the panel when the × button is clicked
panelCloseBtn.addEventListener("click", hidePanel);

const setupPanelNoteEditing = function () {
  // Enable editing when user focuses the input
  panelNote.addEventListener("focus", () => {
    panelNote.readOnly = false;
  });

  // Lock input when user leaves the field
  panelNote.addEventListener("blur", () => {
    panelNote.readOnly = true;
  });

  // Update display text in real time while typing
  panelNote.addEventListener("input", () => {
    if (currentDescriptEl) {
      currentDescriptEl.textContent = panelNote.value;
    }
  });
};
setupPanelNoteEditing();

// ============================================================
// PANEL DELETE BUTTON
// Tracks the last clicked task card (selectedTask).
// When the delete button in the panel is clicked,
// that task is removed and the panel is closed.
// ============================================================
let selectedTask = null;

// Track the most recently clicked task card
document.addEventListener("click", (e) => {
  const task = e.target.closest(".task-card");

  if (task) selectedTask = task;
});

// Delete the selected task when the panel delete button is clicked
panelDeleteBtn.addEventListener("click", (e) => {
  if (selectedTask) {
    selectedTask.remove();
    selectedTask = null;
    hidePanel();
    updateAllStatUI();
    showNotification("Task deleted");
    showEmptyTaskState(emptyStateEl, activeList.children.length);
  }
});

// ============================================================
// ANIMATION RESET: animationFrame
// Used to re-trigger the CSS animation on task cards
// after a filter change. The animation must be removed
// first before being re-applied so the browser replays it.
// ============================================================
const animationFrame = function (cards) {
  requestAnimationFrame(() => {
    cards.forEach((card) => {
      card.style.animation = "none"; // Clear the animation
      card.offsetHeight; // Force reflow — tricks the browser into resetting
      card.style.animation = ""; // Restore the animation so it replays
    });
  });
};

// ============================================================
// VIEW FILTER BAR: All / Active / Done
// Shows or hides task sections (active / done)
// based on the selected button in the filter bar.
// ============================================================
filter_buttons_container.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");

  if (!btn) return;

  // Clear the active state from all buttons
  filter_buttons.forEach((btn) => btn.classList.remove("filter-btn__active"));
  btn.classList.add("filter-btn__active");

  const btnStatus = e.target.dataset.status;

  if (btn.classList.contains("filter-btn")) {
    tasks_section.forEach((section) => {
      const taskSection_status = section.dataset.taskStatus;

      if (btnStatus === "all" || btnStatus === taskSection_status) {
        section.classList.add("taskSection__active");
        const cards = section.querySelectorAll(".task-card");
        animationFrame(cards); // Replay the animation on newly visible cards
      } else {
        section.classList.remove("taskSection__active");
      }
    });
  }
});

// ============================================================
// CATEGORY FILTER BUTTONS
// Filters task cards based on the category tag of each card.
// Uses the "is-filtered" class to hide non-matching cards.
// ============================================================
categoriesContainter.addEventListener("click", function (e) {
  const btn = e.target.closest(".category-btn");
  const categoryButtons = document.querySelectorAll(".category-btn");

  // Deactivate all menu buttons when a category filter is applied
  document
    .querySelectorAll(".menu-btn")
    .forEach((b) => b.classList.remove("menu-active"));

  if (!btn) return;

  // Highlight the selected category button
  categoryButtons.forEach((btn) => btn.classList.remove("category-active"));
  btn.classList.add("category-active");

  const selectedCategory = btn.dataset.category.toLowerCase();
  const cards = document.querySelectorAll(".task-card");
  animationFrame(cards);

  // Hide cards that don't match the selected category
  cards.forEach((card) => {
    const categoryEl = card.querySelector(".category");

    if (!categoryEl) return;

    const cardCategory = categoryEl.textContent.trim().toLowerCase();

    if (cardCategory === selectedCategory) {
      card.classList.remove("is-filtered"); // Show
    } else {
      card.classList.add("is-filtered"); // Hide
    }
  });
});

// ============================================================
// MENU NAV FILTER BUTTONS
// Filters task cards and sections based on the selected
// sidebar menu item (All, Today, Upcoming, Priority, Completed).
// ============================================================
menuList.addEventListener("click", (e) => {
  const btn = e.target.closest(".menu-btn");
  const active_section = document.querySelector(".active-section");
  const done_section = document.querySelector(".done-section");

  if (!btn) return;

  // Helper functions to show/hide each section
  const hideActiveSection = () => {
    active_section.style.display = "none";
  };

  const showActiveSection = () => {
    active_section.style.display = "block";
  };

  const hideDoneSection = () => {
    done_section.style.display = "none";
  };

  const showDoneSection = () => {
    done_section.style.display = "block";
  };

  // Deactivate all category buttons when a menu button is clicked
  document
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.classList.remove("category-active"));

  const cards = document.querySelectorAll(".task-card");
  const menuBtnStatus = btn.dataset.status.toLowerCase();

  animationFrame(cards);

  // Highlight the active menu button
  document
    .querySelectorAll(".menu-btn")
    .forEach((b) => b.classList.remove("menu-active"));

  btn.classList.add("menu-active");

  // For each card, determine whether to show or hide it based on the menu filter
  cards.forEach((card) => {
    const priorirtyEl = card.querySelector(".priority");

    if (!priorirtyEl) return;

    const cardPriority = priorirtyEl.textContent.trim().toLowerCase();

    // Check whether the card is in the active or done section
    const parentSection = card.closest(".task-section");
    const sectionStatus = parentSection?.dataset.taskStatus.toLowerCase();

    // Show all tasks
    let showCard = false;

    if (menuBtnStatus === "all" || menuBtnStatus === "today") {
      showCard = true;
      showActiveSection();
      showDoneSection();
    } else if (menuBtnStatus === "upcoming") {
      // Show only active tasks
      showCard = sectionStatus === "active";
      showActiveSection();
      hideDoneSection();
    } else if (menuBtnStatus === "priority") {
      // Show only high priority tasks
      showCard = cardPriority === "high";
      showActiveSection();
      hideDoneSection();
    } else if (menuBtnStatus === "completed") {
      // Show only done tasks
      showCard = sectionStatus === "done";
      showDoneSection();
      hideActiveSection();
    }

    // Toggle "is-filtered" — true = hide, false = show
    card.classList.toggle("is-filtered", !showCard);
  });
});

// ============================================================
// Dark mode toggle
// Toggles the document theme and updates the icon + label text.
// ============================================================
const darkToggle = document.querySelector(".dark-toggle"); // theme switch button
const themeIcon = document.getElementById("themeIcon"); // current theme icon element
const themeIconLabel = document.getElementById("themeLabel"); // text label below the icon
const toggleTrack = document.querySelector(".toggle-track"); // visual switch track
const toggleThumb = document.querySelector(".toggle-thumb"); // switch thumb handle

darkToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark"); // toggle dark theme class
  themeIcon.classList.remove("anim-sun", "anim-moon"); // clear any existing icon animation

  if (isDark) {
    themeIcon.textContent = "🌙"; // show moon icon for dark theme
    themeIcon.classList.add("anim-moon"); // apply moon entry animation
    themeIconLabel.textContent = "Dark mode"; // set label for dark theme
  } else {
    themeIcon.textContent = "☀️"; // show sun icon for light theme
    themeIcon.classList.add("anim-sun"); // apply sun entry animation
    themeIconLabel.textContent = "Light mode"; // set label for light theme
  }
});

// Tablet Mobile Menu
const btnMenu = document.querySelector(".fa-bars");
const sidebarEl = document.querySelector(".sidebar");
const overlay = document.querySelector(".sidebar-overlay");

btnMenu.addEventListener("click", function (e) {
  sidebarEl.classList.add("sidebar-active");
  overlay.classList.add("sidebar-active");
});

overlay.addEventListener("click", function (e) {
  sidebarEl.classList.remove("sidebar-active");
  overlay.classList.remove("sidebar-active");
});

// Form
const authTabs = document.querySelector(".auth-tabs");
const handleFormTabs = function (e) {
  const forms = document.querySelectorAll(".form-inner form");

  const authBtn = e.target.closest(".auth-btn");

  if (!authBtn) return;

  const authBtnData = authBtn.dataset.authBtn;

  document
    .querySelectorAll(".auth-btn")
    .forEach((btn) => btn.classList.remove("active"));

  authBtn.classList.add("active");

  forms.forEach((form) => {
    const formData = form.dataset.form;
    if (formData === authBtnData) {
      form.classList.add("showForm");
    } else {
      form.classList.remove("showForm");
    }
  });
};

const registrationForm = document.querySelector(".signUp-form");
const signInForm = document.querySelector(".signIn-form");

const handleSignUp = function (e) {
  e.preventDefault();
  const data = new FormData(registrationForm);

  const data_values = {
    fullName: data.get("fullname").trim(),
    email: data.get("email").trim(),
    password: data.get("password").trim(),
  };

  const { fullName, email, password } = data_values;

  if (
    users.some((user) => user.fullName === fullName || user.email === email)
  ) {
    alert("Username or Email already exists!");
    return;
  }

  if (fullName && email && password) {
    users.push({ fullName, email, password });
    saveUsers(users);

    document
      .querySelectorAll(".signUp-group input")
      .forEach((input) => (input.value = ""));

    alert("Account Created Successfully");
    return;
  }
};

const formContainer = document.querySelector(".form-container");
const spinner = document.querySelector(".spinner-overlay");

const showSpinner = function () {
  spinner.classList.add("spinner-active");

  setTimeout(() => spinner.classList.remove("spinner-active"), 3500);
};

const handleSignIn = function (e) {
  e.preventDefault();

  const emailInput = document.querySelector(
    '.signIn-group input[type="email"]',
  );
  const passwordInput = document.querySelector(
    '.signIn-group input[type="password"]',
  );

  if (
    users.find(
      (user) =>
        user.email === emailInput.value &&
        user.password === passwordInput.value,
    )
  ) {
    showSpinner();
    formContainer.classList.add("not-active");

    emailInput.value = passwordInput.value = "";
  } else {
    alert("Invalid email or password. Please try again.");
  }
};

registrationForm.addEventListener("submit", handleSignUp);
signInForm.addEventListener("submit", handleSignIn);
authTabs.addEventListener("click", handleFormTabs);

const logout = document.querySelector(".logout-icon");
const handleLogOut = function (e) {
  overlay.classList.remove("sidebar-active");
  sidebarEl.classList.remove("sidebar-active");
  formContainer.classList.remove("not-active");
  showSpinner();
};

logout.addEventListener("click", handleLogOut);
