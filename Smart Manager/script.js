// =====================
// FINANCE DATA
// =====================
let balance = 0;
let financialRecords = [];

// =====================
// HABIT DATA
// =====================
let habits = [];

// =====================
// FINANCE DOM
// =====================
const financeForm = document.getElementById("financeForm");
const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("amountInput");
const typeInput = document.getElementById("typeInput");
const financeList = document.getElementById("financeList");
const balanceSpan = document.getElementById("balance");
const financeError = document.getElementById("financeError");

// =====================
// HABIT DOM
// =====================
const habitForm = document.getElementById("habitForm");
const habitInput = document.getElementById("habitInput");
const habitTimeInput = document.getElementById("habitTime");
const habitList = document.getElementById("habitList");
const habitError = document.getElementById("habitError");

// =====================
// REGEX
// =====================
const textRegex = /^[a-zA-Z ]+$/;

// =====================
// FINANCE EVENT
// =====================
financeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  if (!textRegex.test(title)) {
    financeError.textContent = "Enter a valid title";
    return;
  }

  if (!amount || amount <= 0) {
    financeError.textContent = "Enter valid amount";
    return;
  }

  if (type === "") {
    financeError.textContent = "Select income or expense";
    return;
  }

  financeError.textContent = "";

  handleNewFinance(title, amount, type);
  resetFinanceForm();
});

// =====================
// FINANCE LOGIC
// =====================
function handleNewFinance(title, amount, type) {
  const record = { title, amount, type };
  financialRecords.push(record);

  if (type === "income") {
    balance += amount;
  } else {
    balance -= amount;
  }

  renderBalance();
  renderFinanceList();
}

function renderBalance() {
  balanceSpan.textContent = balance;
}

function renderFinanceList() {
  financeList.innerHTML = "";

  financialRecords.forEach(record => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${record.title} (${record.type})</span>
      <span>₹${record.amount}</span>
    `;
    financeList.appendChild(li);
  });
}

function resetFinanceForm() {
  titleInput.value = "";
  amountInput.value = "";
  typeInput.value = "";
}

// =====================
// HABIT EVENT
// =====================
habitForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const habitName = habitInput.value.trim();
  const minutes = Number(habitTimeInput.value);

  if (!textRegex.test(habitName)) {
    habitError.textContent = "Enter valid habit name";
    return;
  }

  if (!minutes || minutes <= 0) {
    habitError.textContent = "Enter valid minutes";
    return;
  }

  habitError.textContent = "";

  handleNewHabit(habitName, minutes);
  resetHabitForm();
});

// =====================
// HABIT LOGIC
// =====================
function handleNewHabit(name, minutes) {
  habits.push({ name, minutes });
  renderHabits();
}

function renderHabits() {
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${habit.name} (${habit.minutes} min)</span>
      <button data-index="${index}">Delete</button>
    `;
    habitList.appendChild(li);
  });
}

// =====================
// HABIT DELETE (EVENT DELEGATION)
// =====================
habitList.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const index = event.target.dataset.index;
    habits.splice(index, 1);
    renderHabits();
  }
});

function resetHabitForm() {
  habitInput.value = "";
  habitTimeInput.value = "";
}
