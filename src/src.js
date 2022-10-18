import './style.scss';
import pBtn from './pBtn.js';
import { emptyBtn } from './pBtn.js';
import Game from './game.js';

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
wrapper.dataset.size = '3x3';
document.body.append(wrapper);

let playGroundSize = 5;
let playGroundWidth;
let btnSize;

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
