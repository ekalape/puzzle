import { startBrandNewGame, btnClickSound, soundOn } from './src';

export default function createModal(options) {
  const bg = document.createElement('div');
  const mainFrame = document.createElement('div');
  bg.className = 'bg';
  mainFrame.className = 'mainFrame';

  bg.addEventListener('click', closeModal);
  bg.append(mainFrame);
  let frame;
  if (options.win === true) {
    frame = winModal(options.clicks, options.message);
  } else if (options.res === true) {
    frame = resultsModal(options.results);
  } else {
    frame = document.createElement('p');
    frame.className = 'header-text';
    frame.textContent = 'Something got wrong...';
  }
  mainFrame.append(frame);
  frame.addEventListener('click', (e) => {
    if (e.target.textContent.includes('again')) {
      if (soundOn) btnClickSound.play();
      startBrandNewGame();
      setTimeout(() => {
        bg.classList.remove('active');
        bg.remove();
      }, 100);
    }
    if (e.target.textContent.includes('care')) {
      if (soundOn) btnClickSound.play();
      setTimeout(() => {
        bg.classList.remove('active');
        bg.remove();
      }, 100);
    }
  });

  return bg;
}
function resultsModal(data) {
  const main = document.createElement('div');
  main.classList.add('win-container', 'modal-container');
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('close-btn');
  closeBtn.addEventListener('click', (e) => {
    const bg = e.target.closest('.bg');
    bg.classList.remove('active');
    bg.remove();
  });
  main.append(closeBtn);
  const resultsTitle = document.createElement('h3');
  resultsTitle.classList.add('win-container__congrats', 'result-title');
  resultsTitle.textContent = 'Last games';
  const list = document.createElement('ul');
  list.classList.add('results-container');
  data.forEach((x) => {
    const line = document.createElement('li');
    line.textContent = x;
    list.append(line);
  });
  main.append(resultsTitle, list);
  return main;
}

function winModal(clicks, message) {
  const main = document.createElement('div');
  main.className = 'win-container';
  const congrats = document.createElement('h1');
  const explanation = document.createElement('h3');
  congrats.className = 'win-container__congrats';
  explanation.className = 'win-container__explanation';

  congrats.textContent = `Congratulations!`;
  explanation.textContent = message + '!';
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
