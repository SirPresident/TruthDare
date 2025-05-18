let players = [];
let questions = { truth: [], dare: [] };

const nameEntry = document.getElementById('name-entry');
const namesList = document.getElementById('names-list');
const startBtn  = document.getElementById('start-game');
const addBtn    = document.getElementById('add-name');
const newName   = document.getElementById('new-name');

const gameDiv       = document.getElementById('game');
const playerHeader  = document.getElementById('current-player');
const btnTruth      = document.getElementById('btn-truth');
const btnDare       = document.getElementById('btn-dare');
const cardDiv       = document.getElementById('card');
const questionP     = document.getElementById('question');
const nextBtn       = document.getElementById('next');

// load questions.json
fetch('questions.json')
  .then(res => res.json())
  .then(data => questions = data)
  .catch(err => console.error('Failed to load questions:', err));

// Add player names
addBtn.addEventListener('click', () => {
  const name = newName.value.trim();
  if (!name) return;
  players.push(name);
  const li = document.createElement('li');
  li.textContent = name;
  namesList.appendChild(li);
  newName.value = '';
  startBtn.disabled = players.length < 2;
});

// Start the game
startBtn.addEventListener('click', () => {
  nameEntry.style.display = 'none';
  gameDiv.style.display = '';
  nextTurn();
});

let currentPlayer;
function nextTurn() {
  cardDiv.style.display = 'none';
  currentPlayer = players[Math.floor(Math.random() * players.length)];
  playerHeader.textContent = `${currentPlayer}, choose:`;
  btnTruth.disabled = btnDare.disabled = false;
}

// When a choice is made
btnTruth.addEventListener('click', () => showQuestion('truth'));
btnDare.addEventListener('click',  () => showQuestion('dare'));

function showQuestion(type) {
  btnTruth.disabled = btnDare.disabled = true;
  const pool = questions[type];
  const q = pool[Math.floor(Math.random() * pool.length)];
  questionP.textContent = q;
  cardDiv.style.display = '';
}

nextBtn.addEventListener('click', nextTurn);
