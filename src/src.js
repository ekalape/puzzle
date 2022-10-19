import './style.scss';
import pBtn from './pBtn.js';
import { emptyBtn } from './pBtn.js';
import Game from './game.js';

let playGroundSize = 4;
let playGroundWidth;
let btnSize;
let gameIsStarted = false;

/* playground */
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
wrapper.dataset.size = '3x3';
document.body.append(wrapper);

/* mix btn */
const mixBtn = document.createElement('button');
mixBtn.classList.add('controlBtns', 'quad', 'mix');
mixBtn.textContent = 'Mix and restart';
document.body.append(mixBtn);
//mixBtn.addEventListener('click', mix);

/* choose mode */
const modeContainer = document.createElement('div');
modeContainer.className = 'mode-container';

const threeMode = document.createElement('button');
threeMode.classList.add('controlBtns', 'quad', 'three', 'choose-mode');
threeMode.textContent = '3 x 3';
const fourMode = document.createElement('button');
fourMode.classList.add('controlBtns', 'quad', 'four', 'choose-mode');
fourMode.textContent = '4 x 4';
const fiveMode = document.createElement('button');
fiveMode.classList.add('controlBtns', 'quad', 'five', 'choose-mode');
fiveMode.textContent = '5 x 5';

modeContainer.append(threeMode, fourMode, fiveMode);
document.body.append(modeContainer);

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

  startGame(playGroundSize);
});

/* --------- */

function startGame(playGroundSize) {
  wrapper.innerHTML = '';
  wrapper.dataset.size = `${playGroundSize}x${playGroundSize}`;
  const g = new Game(wrapper, playGroundSize);
  g.createPg();
}
startGame(playGroundSize);

setSizes();
window.addEventListener('resize', setSizes);

function setSizes() {
  if (window.matchMedia('(max-width: 300px)').matches) {
    playGroundWidth = 200;
  } else if (window.matchMedia('(max-width: 400px)').matches) {
    playGroundWidth = 260;
  } else if (window.matchMedia('(max-width: 700px)').matches) {
    playGroundWidth = 400;
    /*     playGroundSize = 4;
    wrapper.dataset.size = '4x4'; */
  } else if (window.matchMedia('(max-width: 1200px)').matches) {
    playGroundWidth = 500;
  } else {
    playGroundWidth = 600;
  }
  btnSize = Math.floor(playGroundWidth / playGroundSize);
  console.log(btnSize);
}
