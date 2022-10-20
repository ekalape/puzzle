import { startBrandNewGame, getElapsedTime } from './src';

export default function createModal(options) {
  const bg = document.createElement('div');
  const mainFrame = document.createElement('div');
  bg.className = 'bg';
  mainFrame.className = 'mainFrame';

  bg.addEventListener('click', closeModal);
  bg.append(mainFrame);
  if (options.win === true) {
    const frame = winModal(options.clicks, getElapsedTime());
    mainFrame.append(frame);
    frame.addEventListener('click', (e) => {
      if (e.target.textContent.includes('again')) {
        startBrandNewGame();
        setTimeout(() => {
          bg.classList.remove('active');
          bg.remove();
        }, 100);
      }
      if (e.target.textContent.includes('care')) {
        setTimeout(() => {
          bg.classList.remove('active');
          bg.remove();
        }, 100);
      }
    });
  }
  return bg;
}

function winModal(clicks, time) {
  const main = document.createElement('h1');
  main.className = 'win-container';
  const congrats = document.createElement('h1');
  const explanation = document.createElement('h3');
  congrats.className = 'win-container__congrats';
  explanation.className = 'win-container__explanation';
  congrats.textContent = `Congratulations!`;

  let t = time + ' sec';
  if (time >= 3600) {
    t = `${Math.floor(time / 3600)} hours and ${time % 3600} min `;
  }
  if (time >= 60) t = `${Math.floor(time / 60)} min and ${time % 60} sec`;
  explanation.textContent = ` You won with ${clicks} moves in ${t}`;
  main.append(congrats, explanation, whatToDoNextBtns());
  return main;
}

function closeModal(e) {
  if (e.target.classList.contains('bg')) {
    e.target.classList.remove('active');
    e.target.remove();
  }
}

export function whatToDoNextBtns() {
  const main = document.createElement('div');
  main.className = 'doNextBtns-container';
  const restartBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');
  restartBtn.classList.add('quad', 'toDoBtn', 'controlBtns', 'closable');
  cancelBtn.classList.add('quad', 'toDoBtn', 'controlBtns', 'closable');
  restartBtn.textContent = 'Play again?';
  cancelBtn.textContent = "I don't care";
  main.append(restartBtn, cancelBtn);

  return main;
}
