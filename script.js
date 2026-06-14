/* ============================================
   Temperature Converter — Vanilla JavaScript
   ============================================ */

// ---- DOM References ----
const tempInput      = document.getElementById('temp-input');
const fromUnit       = document.getElementById('from-unit');
const toUnit         = document.getElementById('to-unit');
const swapBtn        = document.getElementById('swap-btn');
const convertBtn     = document.getElementById('convert-btn');
const resetBtn       = document.getElementById('reset-btn');
const resultSection  = document.getElementById('result-section');
const resultValue    = document.getElementById('result-value');
const errorMessage   = document.getElementById('error-message');
const historyList    = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

// ---- Unit symbols ----
const SYMBOLS = {
  celsius: '°C',
  fahrenheit: '°F',
  kelvin: 'K'
};

// ---- History store (last 5) ----
let history = [];

/* --------------------------------------------
   Conversion Logic
   -------------------------------------------- */
function convertTemperature(value, from, to) {
  if (from === to) return value;

  // First, normalize to Celsius
  let celsius;
  switch (from) {
    case 'celsius':    celsius = value; break;
    case 'fahrenheit': celsius = (value - 32) * (5 / 9); break;
    case 'kelvin':     celsius = value - 273.15; break;
  }

  // Then convert from Celsius to target
  switch (to) {
    case 'celsius':    return celsius;
    case 'fahrenheit': return celsius * (9 / 5) + 32;
    case 'kelvin':     return celsius + 273.15;
  }
}

/* --------------------------------------------
   Prevent same unit in both dropdowns
   -------------------------------------------- */
function ensureDifferentUnits(changed) {
  if (fromUnit.value !== toUnit.value) return;

  const units = ['celsius', 'fahrenheit', 'kelvin'];
  const other = units.find(u => u !== fromUnit.value);

  if (changed === 'from') toUnit.value = other;
  else                    fromUnit.value = other;
}

/* --------------------------------------------
   Validation
   -------------------------------------------- */
function showError(msg) {
  errorMessage.textContent = msg;
  tempInput.classList.add('invalid');
}
function clearError() {
  errorMessage.textContent = '';
  tempInput.classList.remove('invalid');
}

/* --------------------------------------------
   Handle Conversion
   -------------------------------------------- */
function handleConvert() {
  const raw = tempInput.value.trim();

  if (raw === '') {
    showError('Please enter a temperature value.');
    resultSection.hidden = true;
    return;
  }

  const value = Number(raw);
  if (Number.isNaN(value)) {
    showError('Please enter a valid number.');
    resultSection.hidden = true;
    return;
  }

  clearError();

  const from = fromUnit.value;
  const to   = toUnit.value;
  const converted = convertTemperature(value, from, to);
  const rounded   = Math.round(converted * 100) / 100;

  const display = `${value}${SYMBOLS[from]} = ${rounded}${SYMBOLS[to]}`;

  // Animate the result (re-trigger animation)
  resultSection.hidden = false;
  resultSection.style.animation = 'none';
  // Force reflow to restart animation
  void resultSection.offsetWidth;
  resultSection.style.animation = '';
  resultValue.textContent = display;

  addToHistory(display);
}

/* --------------------------------------------
   History Management
   -------------------------------------------- */
function addToHistory(entry) {
  history.unshift(entry);
  if (history.length > 5) history = history.slice(0, 5);
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';

  if (history.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-history';
    li.textContent = 'No conversions yet';
    historyList.appendChild(li);
    clearHistoryBtn.hidden = true;
    return;
  }

  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
  clearHistoryBtn.hidden = false;
}

/* --------------------------------------------
   Reset & Swap
   -------------------------------------------- */
function handleReset() {
  tempInput.value = '';
  fromUnit.value = 'fahrenheit';
  toUnit.value = 'celsius';
  resultSection.hidden = true;
  clearError();
  tempInput.focus();
}

function handleSwap() {
  const tmp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = tmp;
}

/* --------------------------------------------
   Event Listeners
   -------------------------------------------- */
convertBtn.addEventListener('click', handleConvert);
resetBtn.addEventListener('click', handleReset);
swapBtn.addEventListener('click', handleSwap);

fromUnit.addEventListener('change', () => ensureDifferentUnits('from'));
toUnit.addEventListener('change', () => ensureDifferentUnits('to'));

tempInput.addEventListener('input', () => {
  if (tempInput.value.trim() !== '') clearError();
});

// Submit on Enter
tempInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleConvert();
});

clearHistoryBtn.addEventListener('click', () => {
  history = [];
  renderHistory();
});

// Initial render
renderHistory();
