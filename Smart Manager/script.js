// =====================
// DATA (Memory)
// =====================
let balance = 0;
let financialRecords = [];

// =====================
// DOM SELECTION
// =====================
const financeForm = document.getElementById("financeForm");
const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("amountInput");
const typeInput = document.getElementById("typeInput");
const financeList = document.getElementById("financeList");
const balanceSpan = document.getElementById("balance");
const errorMsg = document.getElementById("financeError");

// =====================
// REGEX
// =====================
const titleRegex = /^[a-zA-Z ]+$/;

// =====================
// EVENT HANDLING
// =====================
financeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  // 🔥 REGEX VALIDATION
  if (!titleRegex.test(title)) {
    errorMsg.textContent = "Title must contain only letters";
    return;
  }

  if (!amount || amount <= 0) {
    errorMsg.textContent = "Amount must be greater than 0";
    return;
  }

  if (type === "") {
    errorMsg.textContent = "Please select income or expense";
    return;
  }

  errorMsg.textContent = "";

  handleNewRecord(title, amount, type);
  resetForm();
});

// =====================
// LOGIC FUNCTIONS
// =====================
function createRecord(title, amount, type) {
  return { title, amount, type };
}

function addRecord(record) {
  financialRecords.push(record);
}

function updateBalance(record) {
  if (record.type === "income") {
    balance += record.amount;
  } else {
    balance -= record.amount;
  }
}

function renderBalance() {
  balanceSpan.textContent = balance;
}

function renderRecords() {
  financeList.innerHTML = "";

  for (let record of financialRecords) {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${record.title} (${record.type})</span>
      <span>₹${record.amount}</span>
    `;

    financeList.appendChild(li);
  }
}

// =====================
// MASTER FUNCTION
// =====================
function handleNewRecord(title, amount, type) {
  const record = createRecord(title, amount, type);
  addRecord(record);
  updateBalance(record);
  renderBalance();
  renderRecords();
}

// =====================
// UTILITIES
// =====================
function resetForm() {
  titleInput.value = "";
  amountInput.value = "";
  typeInput.value = "";
}
