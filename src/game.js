import pBtn from './pBtn';

export default class Game {
  emptyBtn;
  animAvailable;
  clicksCounter;
  btnsArrangement;
  winCombo;

  constructor(wrapper, pgSize) {
    this.wrapper = wrapper;
    this.pgSize = pgSize;
    this.setSizes();
    this.btnsArrangement = [];
    this.winCombo = [];

    this.clickCounter = 0;
    this.emptyBtn = '';
    this.animAvailable = true;
  }

  createPg() {
    let num = 1;
    let emptyCol = this.generateRandomEmpty();
    let emptyRow = this.generateRandomEmpty();
    this.wrapper.innerHTML = '';
    for (let row = 1; row <= this.pgSize; row++) {
      for (let col = 1; col <= this.pgSize; col++) {
        const b = new pBtn(num, col, row);
        if (col === emptyCol && row === emptyRow) {
          b.isEmpty = true;
          // this.emptyBtn = b;
          this.wrapper.append(this.drawBtn(b, false));
          this.btnsArrangement.push({ index: 0, content: b });
        } else {
          b.isEmpty = false;
          this.wrapper.append(this.drawBtn(b, true));
          this.btnsArrangement.push({ index: num, content: b });
          this.winCombo.push(num);
          num++;
        }
      }
    }
  }

  action(e) {
    if (!this.animAvailable) return;
    if (e.target.dataset.index === '0') return;

    let hasEmptySibling = this.checkForEmptySibling(e.target);
    console.log(hasEmptySibling);
    if (hasEmptySibling) this.move(e.target);
  }

  checkForEmptySibling(currentB) {
    // console.log('curB ', currentB);
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
    this.animAvailable = false;

    let curCol = +currentBtn.style.gridColumnStart;
    let curRow = +currentBtn.style.gridRowStart;
    let emptyCol = +this.emptyBtn.style.gridColumnStart;
    let emptyRow = +this.emptyBtn.style.gridRowStart;

    if (curCol === emptyCol && emptyRow - curRow === 1) {
      console.log('row >> 1', 'down');

      //down
      currentBtn.style.gridRowStart = emptyRow;
      this.emptyBtn.style.gridRowStart = curRow;
    } else if (curCol === emptyCol && emptyRow - curRow === -1) {
      console.log('row >> -1', 'up');
      //up
      currentBtn.style.gridRowStart = emptyRow;
      this.emptyBtn.style.gridRowStart = curRow;
    } else if (curRow === emptyRow && emptyCol - curCol === 1) {
      console.log('Col >> 1', 'right');
      //right
      currentBtn.style.gridColumnStart = emptyCol;
      this.emptyBtn.style.gridColumnStart = curCol;
    } else if (curRow === emptyRow && emptyCol - curCol === -1) {
      console.log('Col >> -1', 'left');
      //left
      currentBtn.style.gridColumnStart = emptyCol;
      this.emptyBtn.style.gridColumnStart = curCol;
    } else return;

    setTimeout(() => {
      this.animAvailable = true;
      this.checkForWin();
    }, 200);
  }

  checkForWin() {
    console.log('winCheck');
    const realArr = [...this.wrapper.children]
      .filter((s) => !s.classList.contains('quad-empty'))
      .sort(
        (a, b) =>
          `${a.style.gridRowStart}${a.style.gridColumnStart}` -
          `${b.style.gridRowStart}${b.style.gridColumnStart}`
      )
      .map((x) => x.textContent);
    if (this.winCombo.join('') === realArr.join('')) console.log('WIN');
    else console.log('WRONG');
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
      btn.textContent = 0;
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
    console.log(this.btnSize);
  }
}
