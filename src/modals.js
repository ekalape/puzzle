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
  } else if (options.restore === true) {
    frame = restoreModal();
    setTimeout(() => {
      bg.classList.remove('active');
      bg.remove();
    }, 2000);
  } else if (options.noSaved === true) {
    frame = moreInfo(options.noSavedMessage);
    setTimeout(() => {
      bg.classList.remove('active');
      bg.remove();
    }, 2000);
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
function moreInfo(message) {
  const main = document.createElement('div');
  main.classList.add('win-container');
  const infoText = document.createElement('h3');
  infoText.className = 'restore__infotext';
  infoText.textContent = message;
  main.append(infoText);
  return main;
}

function restoreModal() {
  const main = document.createElement('div');
  main.classList.add('win-container');
  const infoText = document.createElement('h3');
  infoText.className = 'restore__infotext';
  infoText.textContent =
    'Your last game was not completed, it has been restored.';
  const explanation = document.createElement('h5');
  explanation.className = 'restore__explanation';
  explanation.textContent = "If you don't desire to continue, start new game";
  main.append(infoText, explanation);
  return main;
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

  const sortBtnContainer = document.createElement('div');
  sortBtnContainer.classList.add('sortBtn__container');
  for (let i = 0; i < 6; i++) {
    const sortBtn = document.createElement('div');
    sortBtn.classList.add('sort-btn');
    sortBtn.textContent = `${i + 3}x${i + 3}`;
    sortBtn.addEventListener('click', (e) => {
      if (soundOn) btnClickSound.play();

      switchRes(e, i + 3);
    });
    sortBtnContainer.append(sortBtn);
  }
  main.append(sortBtnContainer);

  const resultsTitle = document.createElement('h3');
  resultsTitle.classList.add('result-title');
  const list = document.createElement('ul');
  list.classList.add('results-container');
  leaderBoard(4);

  [...sortBtnContainer.children]
    .filter((x) => x.textContent.includes('4x4'))[0]
    .classList.add('sort-btn__active');

  function leaderBoard(num) {
    list.classList.add('appear');

    list.innerHTML = '';
    resultsTitle.textContent = `Best time score for ${num}x${num} field`;
    const requestedArr = data
      .filter((x) => x.size == num)
      .sort((a, b) => a.seconds - b.seconds);
    if (requestedArr.length > 10) requestedArr.length = 10;
    if (requestedArr.length === 0) {
      const line = document.createElement('li');
      line.textContent = 'Win a game for the records!';
      list.append(line);
    } else {
      requestedArr.forEach((x) => {
        const line = document.createElement('li');
        line.textContent = x.message;
        list.append(line);
      });
    }
    setTimeout(() => {
      list.classList.remove('appear');
    }, 200);
  }

  main.append(resultsTitle, list);

  function switchRes(e, num) {
    [...sortBtnContainer.children].forEach((x) =>
      x.classList.remove('sort-btn__active')
    );
    e.target.classList.add('sort-btn__active');
    list.classList.add('disappear');
    setTimeout(() => {
      list.classList.remove('disappear');
      leaderBoard(num);
    }, 200);
  }

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
