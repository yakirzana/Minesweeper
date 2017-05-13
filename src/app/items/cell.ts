export class Cell {
  isClick: boolean;
  value: number;
  isMines: boolean;
  isFlag: boolean;
  i: number;
  j: number;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
    this.isClick = false;
    this.isFlag = false;
    this.isMines = false;
  }

  getValueToPrint(): string {
    if (this.isMines) {
      return '<i class="fa fa-bomb" aria-hidden="true"></i>';
    }
    if (this.value === 0) {
      return '';
    }
    return this.value + '';
  }

}
