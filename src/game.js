import pBtn from './pBtn';
import createModal from './modals';
import { updateClicks, updateTimer, stopTimer } from './src.js';

export default class Game {
  emptyBtn;
  animAvailable;
  clicksCounter;
  btnsArrangement;
  winCombo;
  isComplete;

  constructor(wrapper, pgSize, clicks) {
    this.wrapper = wrapper;
    this.pgSize = pgSize;
    this.setSizes();
    this.btnsArrangement = [];
    this.winCombo = [];
    this.isComplete = false;
    this.clicksCounter = clicks || 0;
    this.emptyBtn = '';
    this.animAvailable = true;
  }

  createPg() {
    let num = 1;
    this.isComplete = false;
    this.wrapper.innerHTML = '';
    let emptyCol = this.generateRandomEmpty();
    let emptyRow = this.generateRandomEmpty();
    this.wrapper.innerHTML = '';
    for (let row = 1; row <= this.pgSize; row++) {
      for (let col = 1; col <= this.pgSize; col++) {
        const b = new pBtn(num, col, row);
        if (col === emptyCol && row === emptyRow) {
          b.isEmpty = true;
          this.wrapper.append(this.drawBtn(b, false));
          b.num = 0;
          this.btnsArrangement.push(b);
        } else {
          b.isEmpty = false;
          this.wrapper.append(this.drawBtn(b, true));
          this.winCombo.push(num);
          this.btnsArrangement.push(b);
          num++;
        }
      }
    }
  }

  arrangeExistedGame(dataBlock) {
    console.log(dataBlock);
    this.isComplete = false;
    this.wrapper.innerHTML = '';
    this.btnsArrangement = dataBlock;
    dataBlock.forEach((x) => {
      console.log(typeof x);
      const btn = this.drawBtn(x, !x.isEmpty);
      this.wrapper.append(btn);
    });
  }

  mixBtns() {
    for (let i = 0; i < this.pgSize * 50; i++) {
      const availForMove = [...this.wrapper.children].filter(
        (x) =>
          !x.classList.contains('quad-empty') && this.checkForEmptySibling(x)
      );
      let btnForMove = Math.floor(Math.random() * availForMove.length);
      this.move(availForMove[btnForMove]);
    }
  }
  easyMixing() {
    console.log('easyMixing');
    for (let i = 0; i < 2; i++) {
      const availForMove = [...this.wrapper.children].filter(
        (x) =>
          !x.classList.contains('quad-empty') && this.checkForEmptySibling(x)
      );
      let btnForMove = Math.floor(Math.random() * availForMove.length);
      this.move(availForMove[btnForMove]);
    }
  }

  action(e) {
    if (!this.animAvailable) return;
    if (e.target.dataset.index === '0') return;

    let hasEmptySibling = this.checkForEmptySibling(e.target);

    if (hasEmptySibling) {
      this.animAvailable = false;

      this.move(e.target);

      updateClicks(++this.clicksCounter);
      setTimeout(() => {
        this.animAvailable = true;
        this.checkForWin();
      }, 200);
    }
  }

  checkForEmptySibling(currentB) {
    return (
      (currentB.style.gridColumnStart === this.emptyBtn.style.gridColumnStart &&
        Math.abs(
          +currentB.style.gridRowStart - +this.emptyBtn.style.gridRowStart
        ) === 1) ||
      (currentB.style.gridRowStart === this.emptyBtn.style.gridRowStart &&
        Math.abs(
          +currentB.style.gridColumnStart - +this.emptyBtn.style.gridColumnStart
        ) === 1)
    );
  }

  move(currentBtn) {
    let curCol = +currentBtn.style.gridColumnStart;
    let curRow = +currentBtn.style.gridRowStart;
    let emptyCol = +this.emptyBtn.style.gridColumnStart;
    let emptyRow = +this.emptyBtn.style.gridRowStart;

    let iB = this.btnsArrangement.filter(
      (x) => x.num === +currentBtn.textContent
    )[0];
    let iEmpty = this.btnsArrangement.filter((x) => x.num === 0)[0];
    console.log(iB);
    console.log(iEmpty);
    iB.startCol = emptyCol;
    iB.startRow = emptyRow;
    iEmpty.startCol = curCol;
    iEmpty.startRow = curRow;

    if (curCol === emptyCol && emptyRow - curRow === 1) {
      //  console.log('row >> 1', 'down');
      //down
      currentBtn.style.gridRowStart = emptyRow;
      this.emptyBtn.style.gridRowStart = curRow;
    } else if (curCol === emptyCol && emptyRow - curRow === -1) {
      //console.log('row >> -1', 'up');
      //up
      currentBtn.style.gridRowStart = emptyRow;
      this.emptyBtn.style.gridRowStart = curRow;
    } else if (curRow === emptyRow && emptyCol - curCol === 1) {
      // console.log('Col >> 1', 'right');
      //right
      currentBtn.style.gridColumnStart = emptyCol;
      this.emptyBtn.style.gridColumnStart = curCol;
    } else if (curRow === emptyRow && emptyCol - curCol === -1) {
      // console.log('Col >> -1', 'left');
      //left
      currentBtn.style.gridColumnStart = emptyCol;
      this.emptyBtn.style.gridColumnStart = curCol;
    } else return;
  }

  checkForWin() {
    if (this.isComplete) return;

    const realArr = [...this.wrapper.children]
      .filter((s) => !s.classList.contains('quad-empty'))
      .sort(
        (a, b) =>
          `${a.style.gridRowStart}${a.style.gridColumnStart}` -
          `${b.style.gridRowStart}${b.style.gridColumnStart}`
      )
      .map((x) => x.textContent);
    if (this.winCombo.join('') === realArr.join('')) {
      const winFrame = createModal({
        win: true,
        clicks: this.clicksCounter,
      });
      winFrame.classList.add('active');
      document.body.append(winFrame);
      setTimeout(() => {
        this.isComplete = true;
        stopTimer();
      }, 500);
    } else {
      return;
    }
  }

  drawBtn(b, isNotEmpty) {
    const btn = document.createElement('div');
    btn.className = 'q-btn';

    btn.style.gridRowStart = b.startRow;
    btn.style.gridColumnStart = b.startCol;

    if (isNotEmpty) {
      btn.classList.add('quad');
      btn.textContent = b.num;
      btn.dataset.index = b.num;
    } else {
      btn.classList.add('quad-empty');
      btn.dataset.index = 0;
      btn.textContent = '';
      this.emptyBtn = btn;
    }
    return btn;
  }

  generateRandomEmpty() {
    return Math.floor(Math.random() * this.pgSize) + 1;
  }

  setSizes() {
    if (window.matchMedia('(max-width: 300px)').matches) {
      this.pgWidth = 200;
    } else if (window.matchMedia('(max-width: 400px)').matches) {
      this.pgWidth = 260;
    } else if (window.matchMedia('(max-width: 700px)').matches) {
      this.pgWidth = 400;
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
      this.pgWidth = 500;
    } else {
      this.pgWidth = 600;
    }
    this.btnSize = Math.floor(this.pgWidth / this.pgSize);
  }
}
