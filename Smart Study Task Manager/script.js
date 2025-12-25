// =====================
// DOM Selection
// =====================
const form = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const timeInput = document.querySelector("#timeInput");
const errorMsg = document.querySelector("#errorMsg");
const taskList = document.querySelector("#taskList");

// =====================
// Constants
// =====================
const taskRegex = /^[a-zA-Z ]+$/;

// =====================
// Event Listeners
// =====================
form.addEventListener("submit", handleFormSubmit);
taskList.addEventListener("click", handleTaskActions);
window.addEventListener("DOMContentLoaded", loadTasks);

// =====================
// Form Submit
// =====================
function handleFormSubmit(event) {
  event.preventDefault();

  const task = taskInput.value.trim();
  const time = Number(timeInput.value);

  if (!taskRegex.test(task)) {
    showError("Please enter a valid task name");
    return;
  }

  if (!time || time <= 0) {
    showError("Please enter valid time");
    return;
  }

  clearError();
  addTaskToDOM(task, time);
  saveTask(task, time);
  resetInputs();
}

// =====================
// DOM Manipulation
// =====================
function addTaskToDOM(task, time) {
  const li = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = `${task} (${time} min)`;

  const startBtn = document.createElement("button");
  startBtn.textContent = "Start";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  li.append(textSpan, startBtn, deleteBtn);
  taskList.appendChild(li);
}

// =====================
// Task Actions
// =====================
function handleTaskActions(event) {
  const li = event.target.closest("li");
  if (!li) return;

  // DELETE
  if (event.target.textContent === "Delete") {
    if (li.timerId) clearInterval(li.timerId);

    const taskName = li.querySelector("span").textContent.split(" (")[0];
    removeTask(taskName);
    li.remove();
  }

  // START TIMER
  if (event.target.textContent === "Start") {
    if (li.timerId) return;

    const textSpan = li.querySelector("span");
    let minutes = parseInt(textSpan.textContent.match(/\d+/)[0]);
    let seconds = minutes * 60;

    li.timerId = setInterval(() => {
      seconds--;

      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;

      textSpan.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;

      if (seconds <= 0) {
        clearInterval(li.timerId);
        li.timerId = null;
        alert("Time up!");
      }
    }, 1000);
  }
}

// =====================
// Storage Helpers
// =====================
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTask(task, time) {
  const tasks = getTasksFromStorage();
  tasks.push({ task, time });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskName) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(t => t.task !== taskName);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(item => addTaskToDOM(item.task, item.time));
}

// =====================
// Utilities
// =====================
function showError(message) {
  errorMsg.textContent = message;
}

function clearError() {
  errorMsg.textContent = "";
}

function resetInputs() {
  taskInput.value = "";
  timeInput.value = "";
}
