import './style.scss';
import pBtn from './pBtn.js';
import { emptyBtn } from './pBtn.js';
import Game from './game.js';
import createModal from './modals.js';

let playGroundSize = 3;
let playGroundWidth;
let btnSize;
let currentGame;
let intId;
let elapsedTime;
export const btnClickSound = new Audio('./assets/pop-click.wav');
/* page structure */
/* --- element creations --- */
const header = document.createElement('header');
const main = document.createElement('main');
const headerContainer = document.createElement('div');

const datatime = document.createElement('span');
const clickscounter = document.createElement('span');

const wrapper = document.createElement('div');
const startGameContainer = document.createElement('div');
const mixBtn = document.createElement('button');
const loadGameBtn = document.createElement('button');

const modeContainer = document.createElement('div');
const modeContainer__title = document.createElement('h4');

const threeMode = document.createElement('button');
const fourMode = document.createElement('button');
const fiveMode = document.createElement('button');

const moreBtnsCont = document.createElement('div');
const saveGameBtn = document.createElement('button');
const showLastBtn = document.createElement('button');

/* --- element classlist --- */
headerContainer.className = 'header-container';
startGameContainer.classList.add('mode-container', 'moreBtns-container');
mixBtn.classList.add('controlBtns', 'quad', 'mix');
loadGameBtn.classList.add('controlBtns', 'quad', 'savedGame');

modeContainer.className = 'mode-container';
modeContainer__title.classList.add('header-text', 'modeContainer__title');
threeMode.classList.add(
  'controlBtns',
  'quad',
  'three',
  'choose-mode',
  'active-mode'
);
fourMode.classList.add('controlBtns', 'quad', 'four', 'choose-mode');
fiveMode.classList.add('controlBtns', 'quad', 'five', 'choose-mode');

moreBtnsCont.classList.add('mode-container', 'moreBtns-container');
saveGameBtn.classList.add('quad', 'controlBtns', 'save-game');
showLastBtn.classList.add('quad', 'controlBtns', 'show-last');

datatime.classList.add('datatime', 'header-text');
clickscounter.classList.add('clicks-counter', 'header-text');

wrapper.className = 'wrapper';

/* --- element content --- */
mixBtn.textContent = 'Start new game';
mixBtn.title = 'Mix buttons and restart';
loadGameBtn.textContent = 'Load game';
loadGameBtn.title = 'Load saved game';

modeContainer__title.textContent = '... or choose game mode';
threeMode.textContent = '3 x 3';
fourMode.textContent = '4 x 4';
fiveMode.textContent = '5 x 5';

[threeMode.title, fourMode.title, fiveMode.title] = [
  '3x3 game field',
  '4x4 game field',
  '5x5 game field',
];

showLastBtn.textContent = 'show last results';
saveGameBtn.textContent = 'save current game';

datatime.textContent = '00:00:00';
clickscounter.textContent = '---';

datatime.title = 'Elapsed time';
clickscounter.title = 'Game moves done';

wrapper.dataset.size = '3x3';

/* --- element append --- */
document.body.append(header, main);
headerContainer.append(datatime, clickscounter);
header.append(headerContainer);
startGameContainer.append(mixBtn, loadGameBtn);
main.append(wrapper, startGameContainer);
modeContainer.append(threeMode, fourMode, fiveMode);
main.append(modeContainer__title);
main.append(modeContainer);
moreBtnsCont.append(saveGameBtn, showLastBtn);
main.append(moreBtnsCont);

mixBtn.addEventListener('click', startGameFromBtn);

modeContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('quad')) return;
  btnClickSound.play();
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
  btn.classList.add('active-mode');
  startGameFromBtn();
});
saveGameBtn.addEventListener('click', saveGame);
loadGameBtn.addEventListener('click', startSavedGame);

showLastBtn.addEventListener('click', showLastResults);
wrapper.addEventListener('click', (e) => currentGame.action(e));
setSizes();
/* --------------------------- */

startBrandNewGame();

export function startSavedGame() {
  btnClickSound.play();
  if (localStorage.getItem('pGameInProcess')) {
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
  }
}
function startGameFromBtn() {
  btnClickSound.play();
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
  currentGame.easyMixing();
  startTimer();
}

export function saveResult(dataBlock) {
  btnClickSound.play();
  let resultsData;
  if (localStorage.getItem('pGameLastResults')) {
    resultsData = localStorage.getItem('pGameLastResults').split(',');
  } else {
    resultsData = [];
  }
  if (resultsData.length > 10) {
    resultsData.pop();
  }
  resultsData.unshift(dataBlock);
  localStorage.setItem('pGameLastResults', resultsData);
}
export function showLastResults() {
  btnClickSound.play();
  let resultsData;
  if (localStorage.getItem('pGameLastResults')) {
    resultsData = localStorage.getItem('pGameLastResults').split(',');
  } else resultsData = ['Nothing recorded yet', 'Win a game to create records'];

  const resultsFrame = createModal({ res: true, results: resultsData });
  resultsFrame.classList.add('active');
  document.body.append(resultsFrame);
}
export function saveGame() {
  btnClickSound.play();

  const game = {
    pgSize: currentGame.pgSize,
    btnsArrangement: currentGame.btnsArrangement,
    clicks: currentGame.clicksCounter,
    timer: datatime.textContent,
    seconds: getElapsedTime(),
    winCombo: currentGame.winCombo,
  };

  localStorage.setItem('pGameInProcess', JSON.stringify(game));
}

export function updateClicks(text) {
  clickscounter.textContent = text;
}

/* datatimer */
export function startTimer(n) {
  let result = 0;
  let t = n || 0;

  if (intId == null) {
    intId = setInterval(() => {
      t++;
      if (t < 60) {
        result = `00:00:${t < 10 ? '0' + t : t}`;
      } else if (t >= 60 && t < 3600) {
        let h = Math.floor(t / 60);

        result = `00:${h < 10 ? '0' + h : h}:${
          t % 60 < 10 ? '0' + (t % 60) : t % 60
        }`;
      } else {
        let h = Math.floor(t / 3600);
        let m = Math.floor((t % 3600) / 60);
        let s = (t % 3600) % 60;
        result = `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${
          s < 10 ? '0' + s : s
        }`;
      }
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
