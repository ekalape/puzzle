import pBtn from './pBtn';
import { emptyBtn } from './pBtn';
export default class Game {
  pg = [];
  pgWidth = 0;
  btnSize = 0;
  constructor(wrapper, pgSize) {
    this.wrapper = wrapper;

    this.pgSize = pgSize;
    this.setSizes();
  }

  createPg() {
    let num = 1;
    for (let i = 0; i < this.pgSize; i++) {
      this.pg[i] = [];
      for (let f = 0; f < this.pgSize; f++) {
        if (i === this.pgSize - 1 && f === this.pgSize - 1) {
          this.pg[i].push(new emptyBtn(this.btnSize, this.pgSize));
        } else {
          this.pg[i].push(new pBtn(this.btnSize, this.pgSize, num));
        }
        num++;
      }
    }
    this.drawPg();
    this.wrapper.addEventListener('click', this.move);
  }
  drawPg() {
    this.pg.forEach((x) => x.forEach((s) => this.wrapper.append(s.draw())));
  }

  move(e) {
    console.log(e.target);
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
