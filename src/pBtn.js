export default class pBtn {
  constructor(btnSize, pgSize, num) {
    this.btnSize = btnSize;
    this.pgSize = pgSize;
    this.num = num;
    this.name = `btn${num}`;
  }
  draw() {
    const btn = document.createElement('div');
    btn.className = 'q-btn';
    btn.style.minWidth = this.btnSize;
    btn.style.minHeight = this.btnSize;
    btn.classList.add('quad');
    btn.textContent = this.num;
    return btn;
  }
}
export class emptyBtn extends pBtn {
  constructor(btnSize, pgSize) {
    super(btnSize, pgSize, 0);
    this.btnSize = btnSize;
    this.pgSize = pgSize;
    this.name = 'empty';
  }
  draw() {
    const btn = super.draw();
    btn.classList.replace('quad', 'quad-empty');
    return btn;
  }
}
