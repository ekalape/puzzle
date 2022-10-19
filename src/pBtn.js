export default class pBtn {
  constructor(btnSize, pgSize, coords, num) {
    this.btnSize = btnSize;
    this.pgSize = pgSize;
    this.num = num;
    this.coords = coords;
  }
  draw() {
    const btn = document.createElement('div');
    btn.className = 'q-btn';

    btn.classList.add('quad');
    /*     btn.style.top = `${this.coords[0] * this.btnSize}px`;
    btn.style.left = `${this.coords[1] * this.btnSize}px`; */

    btn.dataset.coords = this.coords;
    btn.textContent = this.num;

    return btn;
  }
}
export class emptyBtn extends pBtn {
  constructor(btnSize, pgSize, coords) {
    super(btnSize, pgSize, 0);
    this.btnSize = btnSize;
    this.pgSize = pgSize;
    this.num = 0;
    this.coords = coords;
  }
  draw() {
    const btn = super.draw();
    btn.classList.replace('quad', 'quad-empty');
    btn.textContent = '';
    return btn;
  }
}
