import pBtn from './pBtn';
import { emptyBtn } from './pBtn';
export default class Game {
  pg = [];
  pgWidth = 0;
  btnSize = 0;
  emptyBtn;
  emptyX;
  emptyY;
  moveDirection;
  animAvaible = true;
  constructor(wrapper, pgSize) {
    this.wrapper = wrapper;
    this.pgSize = pgSize;
    this.setSizes();
  }

  createPg() {
    let num = 1;
    for (let i = 1; i <= this.pgSize; i++) {
      // this.pg[i] = [];
      for (let f = 1; f <= this.pgSize; f++) {
        if (i === this.pgSize - 1 && f === this.pgSize - 1) {
          const b = new emptyBtn(this.btnSize, this.pgSize, [i, f]).draw();
          b.style.gridArea = `${i} / ${f}`;
          this.pg.push(b);
          this.wrapper.append(b);
          this.emptyBtn = b;
          this.emptyX = i;
          this.emptyY = f;
        } else {
          const b = new pBtn(this.btnSize, this.pgSize, [i, f], num).draw();
          b.style.gridArea = `${i} / ${f}`;
          this.pg.push(b);
          this.wrapper.append(b);
          num++;
        }
      }
    }
    this.wrapper.addEventListener('click', this.action.bind(this));
  }
  setbtnSize() {
    this.setSizes();
    return this.btnSize;
  }
  action(e) {
    if (!this.animAvaible) return;
    let curX = +e.target.style.gridColumnStart;
    let curY = +e.target.style.gridRowStart;
    // console.log(curX, curY);
    if (this.isEmpty(curX, curY)) return;
    let trans;
    if (this.emptyX - curX === 1 && this.emptyY === curY) {
      console.log(1, 'x');
      this.moveDirection = 'right';
      trans = ['X', this.btnSize];
    } else if (this.emptyX - curX === -1 && this.emptyY === curY) {
      console.log(-1, 'x');
      this.moveDirection = 'left';
      trans = ['X', -this.btnSize];
    } else if (this.emptyX === curX && this.emptyY - curY === 1) {
      console.log(1, 'y');
      this.moveDirection = 'down';
      trans = ['Y', this.btnSize];
    } else if (this.emptyX === curX && this.emptyY - curY === -1) {
      console.log(-1, 'y');
      this.moveDirection = 'upper';
      trans = ['Y', -this.btnSize];
    } else return;

    this.move(trans, e.target, curX, curY);
  }
  move(trans, btn, curX, curY) {
    this.animAvaible = false;
    btn.style.transform = `translate${trans[0]}(${trans[1]}px)`;

    setTimeout(() => {
      this.emptyBtn.style.gridColumnStart = curX;
      this.emptyBtn.style.gridRowStart = curY;
      btn.style.gridColumnStart = this.emptyX;
      btn.style.gridRowStart = this.emptyY;
      [this.emptyX, this.emptyY] = [curX, curY];
      btn.style.transform = `none`;
      console.log(trans);
      this.animAvaible = true;
    }, 300);

    console.log(this.emptyBtn);
  }

  isEmpty(curX, curY) {
    return curX === this.emptyX && curY === this.emptyY;
  }

  setSizes() {
    if (window.matchMedia('(max-width: 300px)').matches) {
      this.pgWidth = 200;
    } else if (window.matchMedia('(max-width: 400px)').matches) {
      this.pgWidth = 260;
    } else if (window.matchMedia('(max-width: 700px)').matches) {
      this.pgWidth = 400;
      /*     playGroundSize = 4;
      wrapper.dataset.size = '4x4'; */
    } else if (window.matchMedia('(max-width: 1200px)').matches) {
      this.pgWidth = 500;
    } else {
      this.pgWidth = 600;
    }
    this.btnSize = Math.floor(this.pgWidth / this.pgSize);
    console.log(this.btnSize);
  }
}
