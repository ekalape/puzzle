import './style.scss';
import pBtn from './pBtn.js';
import { emptyBtn } from './pBtn.js';
import Game from './game.js';
import { whatToDoNextBtns } from './modals.js';

let playGroundSize = 3;
let playGroundWidth;
let btnSize;
let currentGame;
let intId;

/* page structure */
/* --- element creations --- */
const header = document.createElement('header');
const main = document.createElement('main');
const headerContainer = document.createElement('div');

const datatime = document.createElement('span');
const clickscounter = document.createElement('span');

const wrapper = document.createElement('div');

const mixBtn = document.createElement('button');
const modeContainer = document.createElement('div');
const modeContainer__title = document.createElement('h4');

const threeMode = document.createElement('button');
const fourMode = document.createElement('button');
const fiveMode = document.createElement('button');

const moreBtnsCont = document.createElement('div');
const saveGame = document.createElement('button');
const showLast = document.createElement('button');

/* --- element classlist --- */
headerContainer.className = 'header-container';
mixBtn.classList.add('controlBtns', 'quad', 'mix');
modeContainer.className = 'mode-container';
modeContainer__title.classList.add('header-text', 'modeContainer__title');
threeMode.classList.add('controlBtns', 'quad', 'three', 'choose-mode');
fourMode.classList.add('controlBtns', 'quad', 'four', 'choose-mode');
fiveMode.classList.add('controlBtns', 'quad', 'five', 'choose-mode');

moreBtnsCont.classList.add('mode-container', 'moreBtns-container');
saveGame.classList.add('quad', 'controlBtns', 'save-game');
showLast.classList.add('quad', 'controlBtns', 'show-last');

datatime.classList.add('datatime', 'header-text');
clickscounter.classList.add('clicks-counter', 'header-text');

wrapper.className = 'wrapper';

/* --- element content --- */
mixBtn.textContent = 'Mix and restart';
mixBtn.title = 'Mix buttons and restart';

modeContainer__title.textContent = 'Choose game mode';
threeMode.textContent = '3 x 3';
fourMode.textContent = '4 x 4';
fiveMode.textContent = '5 x 5';

[threeMode.title, fourMode.title, fiveMode.title] = [
  '3x3 game field',
  '4x4 game field',
  '5x5 game field',
];

showLast.textContent = 'show last results';
saveGame.textContent = 'save current game';

datatime.textContent = '00:00:00';
clickscounter.textContent = '---';

datatime.title = 'Elapsed time';
clickscounter.title = 'Game moves done';

wrapper.dataset.size = '3x3';

/* --- element append --- */
document.body.append(header, main);
headerContainer.append(datatime, clickscounter);
header.append(headerContainer);
main.append(wrapper, mixBtn);
modeContainer.append(threeMode, fourMode, fiveMode);
main.append(modeContainer__title);
main.append(modeContainer);
moreBtnsCont.append(saveGame, showLast);
main.append(moreBtnsCont);

mixBtn.addEventListener('click', () => startGame(playGroundSize));

modeContainer.addEventListener('click', (e) => {
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
  startGame();
});
wrapper.addEventListener('click', (e) => currentGame.action(e));
setSizes();
/* --------------------------- */

startGame();

export function startGame() {
  stopTimer();
  clearTimer();
  clickscounter.textContent = 0;
  console.log('starting game!');
  wrapper.dataset.size = `${playGroundSize}x${playGroundSize}`;
  wrapper.innerHTML = '';
  currentGame = new Game(wrapper, playGroundSize);
  currentGame.createPg();
  //  currentGame.mixBtns();
  currentGame.easyMixing();

  /*   wrapper.addEventListener('moved', (e) => {
    console.log(e);
    clickscounter.textContent = currentGame.clickscounter;
  }); */
  startTimer();
}

export function updateClicks(text) {
  clickscounter.textContent = text;
}
/* datatimer */
export function startTimer() {
  let result = 0;
  let t = 0;

  if (!intId) {
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
      console.log('t', t);
      console.log('result', result);
      datatime.textContent = result;
    }, 1000);
  }
}
export function stopTimer() {
  clearInterval(intId);
  intId = null;
}

function clearTimer() {
  datatime.textContent = '00:00:00';
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
  console.log(btnSize);
}
