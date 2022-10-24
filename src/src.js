import './style.scss';
import pBtn from './pBtn.js';
import { emptyBtn } from './pBtn.js';
import Game from './game.js';
import createModal from './modals.js';

let playGroundSize;
let playGroundWidth;
let btnSize;
let currentGame;
let intId;
let elapsedTime;
let easy;
export let soundOn;
export const btnClickSound = new Audio('./assets/pop-click.wav');
/* page structure */
/* --- element creations --- */
const header = document.createElement('header');
const main = document.createElement('main');
const headerContainer = document.createElement('div');

const datatime = document.createElement('span');
const clickscounter = document.createElement('span');
const soundSwitchBtn = document.createElement('div');

const wrapper = document.createElement('div');
const startGameContainer = document.createElement('div');
const mixBtn = document.createElement('button');

const loadGameBtn = document.createElement('button');

const modeContainer = document.createElement('div');
const easyOrHardContainer = document.createElement('div');
const modeContainer__title = document.createElement('h4');

const easyMode = document.createElement('button');
const hardMode = document.createElement('button');

const threeMode = document.createElement('button');
const fourMode = document.createElement('button');
const fiveMode = document.createElement('button');
const sixMode = document.createElement('button');
const sevenMode = document.createElement('button');
const eightMode = document.createElement('button');

const moreBtnsCont = document.createElement('div');
const saveGameBtn = document.createElement('button');
const showLastBtn = document.createElement('button');

const gameTitle = document.createElement('div');

/* --- element classlist --- */
headerContainer.className = 'header-container';
startGameContainer.classList.add('mode-container', 'moreBtns-container');
mixBtn.classList.add('controlBtns', 'quad', 'mixbtn');

loadGameBtn.classList.add('controlBtns', 'quad', 'savedGame');

modeContainer.classList.add('mode-container', 'mode-wrap');
easyOrHardContainer.classList.add('mode-container');
modeContainer__title.classList.add('header-text', 'modeContainer__title');

easyMode.classList.add('controlBtns', 'quad', 'easyMode', 'choose-mode');
hardMode.classList.add(
  'controlBtns',
  'quad',
  'hardMode',
  'choose-mode',
  'active-mode'
);

threeMode.classList.add('controlBtns', 'quad', 'three', 'choose-mode');
fourMode.classList.add('controlBtns', 'quad', 'four', 'choose-mode');
fiveMode.classList.add('controlBtns', 'quad', 'five', 'choose-mode');
sixMode.classList.add('controlBtns', 'quad', 'six', 'choose-mode');
sevenMode.classList.add('controlBtns', 'quad', 'seven', 'choose-mode');
eightMode.classList.add('controlBtns', 'quad', 'eight', 'choose-mode');

moreBtnsCont.classList.add('mode-container', 'moreBtns-container');
saveGameBtn.classList.add('quad', 'controlBtns', 'save-game');
showLastBtn.classList.add('quad', 'controlBtns', 'show-last');

datatime.classList.add('datatime', 'header-text');
clickscounter.classList.add('clicks-counter', 'header-text');
soundSwitchBtn.classList.add('sound-switcher');

wrapper.className = 'wrapper';

gameTitle.className = 'game-title';

/* --- element content --- */
mixBtn.textContent = 'Start new game';
mixBtn.title = 'Mix buttons and restart';

loadGameBtn.textContent = 'Load game';
loadGameBtn.title = 'Load saved game';

modeContainer__title.textContent = 'choose a game mode';

easyMode.textContent = 'Easy mode';
easyMode.title = 'Choose this mode to resolve the puzzle fastly';
hardMode.textContent = 'Hard mode';
hardMode.title = 'Choose this mode to play seriously';

threeMode.textContent = '3 x 3';
fourMode.textContent = '4 x 4';
fiveMode.textContent = '5 x 5';
sixMode.textContent = '6 x 6';
sevenMode.textContent = '7 x 7';
eightMode.textContent = '8 x 8';

[
  threeMode.title,
  fourMode.title,
  fiveMode.title,
  sixMode.title,
  sevenMode.title,
  eightMode.title,
] = [
  '3x3 game field',
  '4x4 game field',
  '5x5 game field',
  '6x6 game field',
  '7x7 game field',
  '8x8 game field',
];

showLastBtn.textContent = 'show last results';
saveGameBtn.textContent = 'save current game';

datatime.textContent = '00:00:00';
clickscounter.textContent = '0';

datatime.title = 'Elapsed time';
clickscounter.title = 'Game moves done';
soundSwitchBtn.title = 'Sound on/off';

gameTitle.textContent = 'Puzzle game';

wrapper.dataset.size = `${playGroundSize}x${playGroundSize}`;

/* --- element append --- */
document.body.append(header, main);
headerContainer.append(clickscounter, datatime, soundSwitchBtn);
header.append(headerContainer);
header.append(gameTitle);
startGameContainer.append(mixBtn, loadGameBtn);
main.append(wrapper, startGameContainer);
modeContainer.append(
  threeMode,
  fourMode,
  fiveMode,
  sixMode,
  sevenMode,
  eightMode
);
main.append(modeContainer__title);
easyOrHardContainer.append(easyMode, hardMode);
main.append(easyOrHardContainer, modeContainer);

moreBtnsCont.append(saveGameBtn, showLastBtn);
main.append(moreBtnsCont);

mixBtn.addEventListener('click', startGameFromBtn);
soundSwitchBtn.addEventListener('click', toggleSound);

modeContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('quad')) return;
  if (soundOn) btnClickSound.play();
  [...modeContainer.children].forEach((x) => x.classList.remove('active-mode'));
  const btn = e.target;
  if (btn.classList.contains('three')) {
    playGroundSize = 3;
  }
  if (btn.classList.contains('four')) {
    playGroundSize = 4;
  }
  if (btn.classList.contains('five')) {
    playGroundSize = 5;
  }
  if (btn.classList.contains('six')) {
    playGroundSize = 6;
  }
  if (btn.classList.contains('seven')) {
    playGroundSize = 7;
  }
  if (btn.classList.contains('eight')) {
    playGroundSize = 8;
  }
  btn.classList.add('active-mode');
  startGameFromBtn();
});

easyMode.addEventListener('click', changeEasyHardMode);
hardMode.addEventListener('click', changeEasyHardMode);

saveGameBtn.addEventListener('click', () => {
  if (soundOn) btnClickSound.play();
  saveGame(false);
});
loadGameBtn.addEventListener('click', () => {
  if (soundOn) btnClickSound.play();
  startSavedGame(false);
});

showLastBtn.addEventListener('click', showLastResults);
wrapper.addEventListener('click', (e) => currentGame.action(e));

wrapper.addEventListener('dragstart', (e) => currentGame.dragStartHandler(e));

setSizes();
/* --------------------------- */

window.addEventListener('DOMContentLoaded', winLoad);
window.addEventListener('beforeunload', savePreferences);

function winLoad() {
  if (localStorage.getItem('pGameSavedPrefers')) {
    useSavedPrefs();
  } else {
    easy = false;
    playGroundSize = 4;
    soundOn = true;
  }
  if (!soundOn) soundSwitchBtn.classList.add('no-sound');
  else soundSwitchBtn.classList.remove('no-sound');
  [...modeContainer.children].forEach((x) => x.classList.remove('active-mode'));
  [...modeContainer.children]
    .filter((x) => x.textContent.includes(playGroundSize))[0]
    .classList.add('active-mode');

  [...easyOrHardContainer.children].forEach((x) =>
    x.classList.remove('active-mode')
  );
  if (easy) easyMode.classList.add('active-mode');
  else hardMode.classList.add('active-mode');
  if (localStorage.getItem('pGameInProcess')) {
    startSavedGame(true);
  } else {
    startBrandNewGame();
  }
}

export function startSavedGame(current) {
  if (current) {
    const restoreInfo = createModal({ restore: true });
    restoreInfo.classList.add('active');
    document.body.append(restoreInfo);
    clearTimer();
    stopTimer();
    clickscounter.textContent = 0;
    console.log('starting game!');

    const savedGame = JSON.parse(localStorage.getItem('pGameInProcess'));
    playGroundSize = savedGame.pgSize;
    wrapper.dataset.size = `${playGroundSize}x${playGroundSize}`;
    wrapper.innerHTML = '';
    currentGame = new Game(wrapper, savedGame.pgSize, savedGame.clicks);
    currentGame.winCombo = savedGame.winCombo;
    currentGame.arrangeExistedGame(savedGame.btnsArrangement);

    clickscounter.textContent = savedGame.clicks;
    datatime.textContent = savedGame.timer;
    startTimer(savedGame.seconds);

    [...modeContainer.children].forEach((x) =>
      x.classList.remove('active-mode')
    );
    [...modeContainer.children]
      .filter(
        (x) =>
          x.textContent.includes(playGroundSize) && x.classList.contains('quad')
      )[0]
      .classList.add('active-mode');
  } else {
    if (localStorage.getItem('pGameToSaveAlone')) {
      clearTimer();
      stopTimer();
      clickscounter.textContent = 0;
      console.log('starting game!');

      const savedGame = JSON.parse(localStorage.getItem('pGameToSaveAlone'));
      playGroundSize = savedGame.pgSize;
      wrapper.dataset.size = `${playGroundSize}x${playGroundSize}`;
      wrapper.innerHTML = '';
      currentGame = new Game(wrapper, savedGame.pgSize, savedGame.clicks);
      currentGame.winCombo = savedGame.winCombo;
      currentGame.arrangeExistedGame(savedGame.btnsArrangement);

      clickscounter.textContent = savedGame.clicks;
      datatime.textContent = savedGame.timer;
      startTimer(savedGame.seconds);

      [...modeContainer.children].forEach((x) =>
        x.classList.remove('active-mode')
      );
      [...modeContainer.children]
        .filter(
          (x) =>
            x.textContent.includes(playGroundSize) &&
            x.classList.contains('quad')
        )[0]
        .classList.add('active-mode');
    }
  }
}
function startGameFromBtn() {
  if (soundOn) btnClickSound.play();

  startBrandNewGame();
}

export function startBrandNewGame() {
  clearTimer();
  stopTimer();
  clickscounter.textContent = 0;
  console.log('starting game!');
  wrapper.dataset.size = `${playGroundSize}x${playGroundSize}`;
  wrapper.innerHTML = '';
  currentGame = new Game(wrapper, playGroundSize);
  currentGame.createPg();
  if (easy) currentGame.easyMixing();
  else currentGame.mixBtns();
  startTimer();
}

export function saveResult(dataBlock) {
  let resultsData;
  if (localStorage.getItem('pGameLastResults')) {
    let rd = localStorage.getItem('pGameLastResults');
    resultsData = JSON.parse(rd);
  } else {
    resultsData = [];
  }
  resultsData.push(dataBlock);

  resultsData = JSON.stringify(resultsData);
  localStorage.setItem('pGameLastResults', resultsData);
}
export function showLastResults() {
  if (soundOn) btnClickSound.play();
  let resultsData;
  if (localStorage.getItem('pGameLastResults')) {
    resultsData = JSON.parse(localStorage.getItem('pGameLastResults'));
  } else resultsData = ['Nothing recorded yet', 'Win a game to create records'];

  const resultsFrame = createModal({ res: true, results: resultsData });
  resultsFrame.classList.add('active');
  document.body.append(resultsFrame);
}

/* ...............save game */

export function saveGame(current) {
  const game = {
    pgSize: currentGame.pgSize,
    btnsArrangement: currentGame.btnsArrangement,
    clicks: currentGame.clicksCounter,
    timer: datatime.textContent,
    seconds: getElapsedTime(),
    winCombo: currentGame.winCombo,
  };
  if (current) {
    if (currentGame.isComplete) {
      localStorage.removeItem('pGameInProcess');
    } else {
      localStorage.setItem('pGameInProcess', JSON.stringify(game));
    }
  } else {
    localStorage.setItem('pGameToSaveAlone', JSON.stringify(game));
  }
}

export function updateClicks(text) {
  clickscounter.textContent = '  ' + text;
}
/* sound */
function toggleSound() {
  if (soundOn) {
    soundSwitchBtn.classList.add('no-sound');
    soundOn = false;
  } else {
    soundSwitchBtn.classList.remove('no-sound');
    soundOn = true;
  }
}

/* datatimer */
export function startTimer(n) {
  let result = 0;
  let t = n || 0;

  if (intId == null) {
    intId = setInterval(() => {
      t++;
      let h = Math.floor(t / 3600);
      let m = Math.floor((t % 3600) / 60);
      let s = (t % 3600) % 60;
      result = `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${
        s < 10 ? '0' + s : s
      }`;
      elapsedTime = t;
      datatime.textContent = result;
    }, 1000);
  }
}
export function getElapsedTime() {
  return elapsedTime;
}
export function stopTimer() {
  clearInterval(intId);

  intId = null;
}
function clearTimer() {
  datatime.textContent = '00:00:00';
  elapsedTime = 0;
}

function changeEasyHardMode(e) {
  if (soundOn) btnClickSound.play();
  [...easyOrHardContainer.children].forEach((x) =>
    x.classList.remove('active-mode')
  );
  if (e.target.classList.contains('easyMode')) {
    easy = true;
  }
  if (e.target.classList.contains('hardMode')) {
    easy = false;
  }
  e.target.classList.add('active-mode');
  startBrandNewGame();
  /*  mixBtn.classList.add('takeAttention');
  setTimeout(() => {
    mixBtn.classList.remove('takeAttention');
  }, 600); */
}

function savePreferences() {
  const prefs = { mode: easy, pgSise: playGroundSize, sound: soundOn };
  saveGame(true);

  localStorage.setItem('pGameSavedPrefers', JSON.stringify(prefs));
}
function useSavedPrefs() {
  const prefs = JSON.parse(localStorage.getItem('pGameSavedPrefers'));
  easy = prefs.mode;
  playGroundSize = prefs.pgSise;
  soundOn = prefs.sound;
}

/* set sizes */
window.addEventListener('resize', setSizes);

function setSizes() {
  if (window.matchMedia('(max-width: 300px)').matches) {
    playGroundWidth = 200;
  } else if (window.matchMedia('(max-width: 400px)').matches) {
    playGroundWidth = 260;
  } else if (window.matchMedia('(max-width: 700px)').matches) {
    playGroundWidth = 400;
  } else if (window.matchMedia('(max-width: 1200px)').matches) {
    playGroundWidth = 500;
  } else {
    playGroundWidth = 600;
  }
  btnSize = Math.floor(playGroundWidth / playGroundSize);
}
