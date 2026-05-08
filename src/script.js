"use strict";

/**
 * DOM element references used for displaying dynamic content
 */
const LabelTaskSummary = document.querySelector(".task-summary__text");
const displayCurrentDate = document.querySelector(".task-summary__date");
const displayGreeting = document.querySelector(".greeting");
const greetingName = document.querySelector(".greeting__name");

const menuList = document.querySelector(".menu__list");

const allBadge = document.getElementById("allBadge");
const todayBadge = document.getElementById("todayBadge");

const LabelStat_highPriority = document.querySelectorAll("#stat-high");
const LabelStat_pending = document.getElementById("stat-pending");
const LabelStat_done = document.getElementById("stat-done");
const LabelStat_total = document.getElementById("stat-total");

const LabelActiveTask_count = document.querySelector(".task-section__count");
const LabelCompletedTask_count = document.querySelector(
  ".completed-section_count",
);

const quickTask__overlay = document.querySelector(".quick-task__overlay");
const quickTask__btn = document.querySelector(".quick-task__btn");

const form = document.querySelector(".task-form");
const taskForm__overlay = document.querySelector(".task-form__overlay");
const taskForm__openBtn = document.querySelector(".task-form__open-btn");
const formBtn__cancel = document.querySelector(".form-btn-cancel");
const chips__priority = document.querySelectorAll(".chip");

const activeList = document.getElementById("activeList");
const doneList = document.getElementById("doneList");
const taskActionContainer = document.querySelector(".task-actions");

const quick__input = document.querySelector(".add-input");
const quickTask__submit = document.querySelector(".quickTaskBtn__submit");

const filter_buttons_container = document.querySelector(".filter-buttons");
const filter_buttons = document.querySelectorAll(".filter-btn");
const tasks_section = document.querySelectorAll("[data-task-status]");

const panelContainer = document.querySelector(".task-detail-panel");
const panelCloseBtn = document.querySelector(".task__close");
const panelTaskName = document.querySelector(".task__name");
const panelPriority = document.querySelector(".detail-priority");
const panelCategory = document.querySelector(".detail-category");
const panelDueTime = document.querySelector(".detail-due-time");
const panelStatus = document.querySelector(".detail-status");
const panelNote = document.querySelector("#notes");
const panelDeleteBtn = document.querySelector(".panel-delete-btn");

const emptyStateEl = document.querySelector(".emptyTask");
const categoriesContainter = document.querySelector(".categories__list");

/**
 * Application state values
 */
const today = new Date();
const locale = navigator.language;

function updateAllStatUI() {
  const allTasks = document.querySelectorAll(".task-card").length;
  const highTasks = document.querySelectorAll(
    ".task-card.high-priority",
  ).length;
  let completedTasks_count = doneList.children.length;
  let activeTaskCount = activeList.children.length;
  let total_tasks = activeTaskCount + completedTasks_count;

  allBadge.textContent = total_tasks;
  todayBadge.textContent = activeTaskCount;

  LabelTaskSummary.textContent = `You have ${activeTaskCount} tasks remaining today.`;
  LabelStat_total.textContent = allTasks;
  LabelStat_done.textContent = completedTasks_count;
  LabelStat_pending.textContent = activeTaskCount;

  LabelActiveTask_count.textContent = `${activeTaskCount} tasks`;
  LabelCompletedTask_count.textContent = `${completedTasks_count} tasks`;

  LabelStat_highPriority.forEach((label) => {
    label.textContent = highTasks;
  });
}
updateAllStatUI();

const showNotification = function (message) {
  const notification = document.querySelector(".notification");
  notification.textContent = message;
  notification.classList.add("showNotification");

  setTimeout(() => notification.classList.remove("showNotification"), 3000);
};

// Hide detail panel
const hidePanel = () => panelContainer.classList.remove("show-detail-panel");

/**
 * Generates and displays a time-based greeting message (morning, afternoon, evening)
 * and injects it into the DOM with a styled name element.
 *
 * @param {Today} today - The current date object used to extract the hour.
 */
const displayGreet = function (today) {
  const hour = today.getHours();
  const greetingMessage =
    hour >= 18
      ? "Good evening"
      : hour >= 12
        ? "Good afternoon"
        : "Good morning";
  displayGreeting.innerHTML = `${greetingMessage}, <em class="greeting__name">Ralp.</em>`;
};
displayGreet(today);

/**
 * Formats and displays the current date in a human-readable format
 * based on the provided locale settings.
 *
 * @param {HTMLElement} displayCurrentDate - The DOM element where the date will be rendered.
 * @param {Date} date - The date object to format.
 * @param {string} locale - The locale string (e.g., "en-US", "fil-PH") used for formatting.
 */
const displayDate = function (labelDate, date, locale) {
  const options = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  };

  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(date);
};
displayDate(displayCurrentDate, today, locale);

/**
 * Displays the specified overlay by adding a visibility class.
 *
 * @param {HTMLElement} overlay - The overlay element to be shown.
 * @returns {void}
 */
const openTaskOverlay = function (overlay) {
  overlay.classList.add("modal-visible");
};

/**
 * Hides the specified overlay by removing the visibility class.
 *
 * @param {HTMLElement} el - The overlay element to be hidden.
 * @returns {void}
 */
const closeTaskOverlay = function (el) {
  el.classList.remove("modal-visible");
};

/**
 * Handles click events on an overlay element.
 * Closes the overlay only when the background (outer container) is clicked.
 *
 * @param {HTMLElement} currEl - The element that triggered the click event.
 * @param {HTMLElement} el - The overlay element to evaluate and potentially close.
 * @returns {void}
 */

const handleClickOverlay = function (currEl, el) {
  if (currEl === el) closeTaskOverlay(el);
};

/**
 * Event listener: Opens the quick task input overlay when the add task button is clicked.
 */
quickTask__btn.addEventListener("click", () => {
  openTaskOverlay(quickTask__overlay);
});

/**
 * Event listener: Closes the quick task overlay when clicking outside its content area.
 *
 * @param {MouseEvent} e - The click event object.
 */
quickTask__overlay.addEventListener("click", (e) => {
  handleClickOverlay(e.target, quickTask__overlay);
});

/**
 * Event listener: Opens the detailed task form overlay with extended input fields.
 */
taskForm__openBtn.addEventListener("click", () => {
  closeTaskOverlay(quickTask__overlay);
  openTaskOverlay(taskForm__overlay);
});

/**
 * Event listener: Closes the task form overlay when the cancel button is clicked.
 */
formBtn__cancel.addEventListener("click", () => {
  closeTaskOverlay(taskForm__overlay);
});

// Attach click behavior to each priority chip
function selectedPriority(selected_chip) {
  // Retrieves the 'priority' value from the data-* attribute of the selected chip element.
  // This is typically used to determine the chip's importance level or processing order.
  const chip_data = selected_chip.dataset.priority;

  selected_chip.addEventListener("click", (e) => {
    // Clear any previously applied selection styles
    // Ensures only one chip is active at a time
    chips__priority.forEach((chip) =>
      chip.classList.remove("selected-high", "selected-med", "selected-low"),
    );

    // Apply the corresponding selection class based on priority
    // Uses dynamic class naming for scalability
    selected_chip.classList.add(`selected-${chip_data}`);
  });
}
// Initialize event listeners for all priority chips
chips__priority.forEach(selectedPriority);

const showEmptyTaskState = function (emptyStateEl, taskListLength) {
  if (taskListLength === 0) {
    emptyStateEl.classList.add("show-emptyTask__banner");
  }
};

const hideEmptyTaskState = function (emptyStateEl, taskListLength) {
  if (taskListLength !== 0) {
    emptyStateEl.classList.remove("show-emptyTask__banner");
  }
};

// createTaskCard
const createTaskCard = function () {
  let quickInputVal = quick__input.value;

  if (!quickInputVal) {
    showNotification("Please enter a task");
    return;
  }

  const selectedChip = document.querySelector(
    ".chip.selected-high, .chip.selected-medium, .chip.selected-low",
  );

  let chip_priority = "low";
  let priority = "low";
  let chipText = "Low";

  if (selectedChip) {
    if (selectedChip.classList.contains("selected-high")) {
      chip_priority = "high";
    } else if (selectedChip.classList.contains("selected-medium")) {
      chip_priority = "medium";
    }
    selectedChip.classList.remove(`selected-${chip_priority}`);

    priority = selectedChip.dataset.priority;
    chipText = selectedChip.textContent.trim();
  }

  const tagColor =
    priority === "high" ? "red" : priority === "medium" ? "amber" : "green";

  const borderLeftColor =
    priority === "high" ? "high" : priority === "medium" ? "med" : "low";

  const time = today.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

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
              ${time}</span>
            </div>
     </div>
    <div class="task-actions">
      <i class="fa-solid fa-arrow-right"></i>
      <i class="fa-solid fa-trash"></i>
    </div>
  `;
  activeList.prepend(task);

  // Update all stat UI
  updateAllStatUI();

  showNotification("Task added!");
  closeTaskOverlay(quickTask__overlay);
  hideEmptyTaskState(emptyStateEl, activeList.children.length);
  quick__input.value = "";
};

quickTask__submit.addEventListener("click", createTaskCard);

function formatTime(duetime) {
  let [hours, minutes] = duetime.split(":").map(Number);

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(e.target);

  const values = {
    taskName: data.get("task-name"),
    description: data.get("description"),
    priority: data.get("priority"),
    category: data.get("category"),
    dueTime: data.get("due-time"),
  };

  const { taskName, description, priority, category, dueTime } = values;

  const borderPriority =
    priority === "High" ? "high" : priority === "Medium" ? "med" : "low";

  const priorityColor =
    priority === "High" ? "red" : priority === "Medium" ? "amber" : "green";

  const categoryColor =
    category === "Work"
      ? "blue"
      : category === "Personal"
        ? "green"
        : category === "Health"
          ? "amber"
          : "gray";

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
  activeList.prepend(detailedTask);

  form.reset();
  updateAllStatUI();

  showNotification("Task added!");
  hideEmptyTaskState(emptyStateEl, activeList.children.length);
  closeTaskOverlay(taskForm__overlay);
});

// Compelete task
activeList.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    if (!e.target.checked) return;

    const task = e.target.closest(".task-card");
    doneList.prepend(task);

    // Update all stat UI
    updateAllStatUI();
    hidePanel();
    showNotification("Task completed!");
    showEmptyTaskState(emptyStateEl, activeList.children.length);
  }
});

// Uncomplete task
doneList.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    if (e.target.checked) return;

    const task = e.target.closest(".task-card");
    activeList.prepend(task);

    // Update all stat UI
    updateAllStatUI();
    hidePanel();
    showNotification("Task added");
    hideEmptyTaskState(emptyStateEl, activeList.children.length);
  }
});

// DELETE TASK
const handleDelete = function (listElement) {
  listElement.addEventListener("click", (e) => {
    if (e.target.matches(".fa-trash")) {
      e.stopPropagation();
      const task = e.target.closest(".task-card");
      listElement.removeChild(task);
      // Update all stat UI
      updateAllStatUI();
      showNotification("Task deleted");
      showEmptyTaskState(emptyStateEl, activeList.children.length);
    }
  });
};

handleDelete(activeList);
handleDelete(doneList);

// Show the details of the task
const handleShowTaskDetails = function (element) {
  element.addEventListener("click", function (e) {
    const arrow = e.target.closest(".fa-arrow-right");
    const card = e.target.closest(".task-card");

    if (!arrow || !card) return;

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

    const dueTime = e.target
      .closest(".task-card")
      .querySelector(".task-card__time")
      .innerText.trim();

    const clean = dueTime.replace(/\s+/g, "");
    const [time, period] = [clean.slice(0, -2), clean.slice(-2)];
    const [hour, minute] = time.split(":");

    const formattedDueTime = `${hour}:${String(minute).padStart(2, "0")} ${period}`;

    panelTaskName.textContent = taskTitle;
    panelPriority.textContent = priority;
    panelCategory.textContent = category;
    panelDueTime.textContent = formattedDueTime;
    panelStatus.textContent = `${!checkbox.checked ? "Active" : "Completed"}`;
    panelNote.textContent = description;
    // Show side panel
    panelContainer.classList.add("show-detail-panel");
  });
};
handleShowTaskDetails(activeList);
handleShowTaskDetails(doneList);

// Close the panel
panelCloseBtn.addEventListener("click", hidePanel);

let selectedTask = null;

document.addEventListener("click", (e) => {
  const task = e.target.closest(".task-card");

  if (task) selectedTask = task;
});

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

// Reset card animation
const animationFrame = function (cards) {
  requestAnimationFrame(() => {
    cards.forEach((card) => {
      card.style.animation = "none";
      card.offsetHeight;
      card.style.animation = "";
    });
  });
};

// Filter all, active, done, tasks
filter_buttons_container.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");

  if (!btn) return;

  filter_buttons.forEach((btn) => btn.classList.remove("filter-btn__active"));
  btn.classList.add("filter-btn__active");

  const btnStatus = e.target.dataset.status;

  if (btn.classList.contains("filter-btn")) {
    tasks_section.forEach((section) => {
      const taskSection_status = section.dataset.taskStatus;

      if (btnStatus === "all" || btnStatus === taskSection_status) {
        section.classList.add("taskSection__active");
        const cards = section.querySelectorAll(".task-card");
        animationFrame(cards);
      } else {
        section.classList.remove("taskSection__active");
      }
    });
  }
});

// Categories filter buttons
categoriesContainter.addEventListener("click", function (e) {
  const btn = e.target.closest(".category-btn");
  const categoryButtons = document.querySelectorAll(".category-btn");

  document
    .querySelectorAll(".menu-btn")
    .forEach((b) => b.classList.remove("menu-active"));

  if (!btn) return;

  categoryButtons.forEach((btn) => btn.classList.remove("category-active"));
  btn.classList.add("category-active");

  const selectedCategory = btn.dataset.category.toLowerCase();
  const cards = document.querySelectorAll(".task-card");
  animationFrame(cards);

  cards.forEach((card) => {
    const categoryEl = card.querySelector(".category");

    if (!categoryEl) return;

    const cardCategory = categoryEl.textContent.trim().toLowerCase();

    if (cardCategory === selectedCategory) {
      card.classList.remove("is-filtered");
    } else {
      card.classList.add("is-filtered");
    }
  });
});

// Menu filter buttons
menuList.addEventListener("click", (e) => {
  const btn = e.target.closest(".menu-btn");
  const active_section = document.querySelector(".active-section");
  const done_section = document.querySelector(".done-section");

  if (!btn) return;

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

  document
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.classList.remove("category-active"));

  const cards = document.querySelectorAll(".task-card");
  const menuBtnStatus = btn.dataset.status.toLowerCase();

  animationFrame(cards);

  document
    .querySelectorAll(".menu-btn")
    .forEach((b) => b.classList.remove("menu-active"));

  btn.classList.add("menu-active");

  cards.forEach((card) => {
    const priorirtyEl = card.querySelector(".priority");

    if (!priorirtyEl) return;

    const cardPriority = priorirtyEl.textContent.trim().toLowerCase();

    // Active or done section
    const parentSection = card.closest(".task-section");

    const sectionStatus = parentSection?.dataset.taskStatus.toLowerCase();

    let showCard = false;

    if (menuBtnStatus === "all" || menuBtnStatus === "today") {
      showCard = true;
      showActiveSection();
      showDoneSection();
    } else if (menuBtnStatus === "upcoming") {
      showCard = sectionStatus === "active";
      showActiveSection();
      hideDoneSection();
    } else if (menuBtnStatus === "priority") {
      showCard = cardPriority === "high";
      showActiveSection();
      hideDoneSection();
    } else if (menuBtnStatus === "completed") {
      showCard = sectionStatus === "done";
      showDoneSection();
      hideActiveSection();
    }
    card.classList.toggle("is-filtered", !showCard);
  });
});
