import { Component } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Settings } from '../items/settings';
import { Cell } from '../items/cell';

@Component({
  selector: 'minesweeper-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.css' ]
})

export class GameComponent {
  isActive: boolean;
  remainingFlags: number;
  settings: Settings;
  cells: Cell[][];
  flaggedCells: Cell[];
  clickedCells: number;


  constructor(private settingsService: SettingsService) {
    this.startNewGame();
  }

  showMsg(msg: string): void {
    alert(msg);
  }

  startNewGame(): void {
    this.setSettings();
    this.remainingFlags = this.settings.mines;
    this.initCells();
    this.addMines();
    this.updateCellNumbers();
    this.clickedCells = 0;
    this.flaggedCells = [];
    this.isActive = true;
  }

  private setSettings() {
    this.settings = this.settingsService.getSettings();
    if (this.settings.width < 0 || this.settings.width > this.settings.getMaxSize()) {
      this.settings.width = 8;
    }
    if (this.settings.height < 0 || this.settings.height > this.settings.getMaxSize()) {
      this.settings.height = 8;
    }
    if (this.settings.mines < 0 || this.settings.mines > this.settings.height * this.settings.width) {
      this.settings.mines = this.settings.height * this.settings.width;
    }
  }

  selectCell(cell: Cell, event: MouseEvent): void {
    if (!this.isActive || cell.isClick) {
      return;
    }
    if (event && event.shiftKey) {
      return this.selectFlag(cell);
    }
    if (cell.isFlag) {
      return;
    }
    cell.isClick = true;
    this.clickedCells++;
    if (cell.value === 0) {
      return this.selectEmptyCell(cell);
    }
    if (cell.isMines) {
      return this.selectMine(cell);
    }
  }

  selectMine(cell: Cell): void {
    this.showMsg('You Lose!');
    this.isActive = false;
  }

  selectEmptyCell(cell: Cell): void {
    let cellsNearMe = this.findCellNear(cell.i, cell.j);
    for (let index = 0; index < cellsNearMe.length; index++) {
      this.selectCell(cellsNearMe[index], null);
    }
  }

  selectFlag(cell: Cell): void {
    if (cell.isFlag) {
      return this.removeFlag(cell);
    }
    return this.addFlag(cell);
  }

  removeFlag(cell: Cell): void {
    cell.isFlag = false;
    this.remainingFlags++;
    this.flaggedCells = this.flaggedCells.filter(item => item !== cell);
  }

  addFlag(cell: Cell): void {
    if (this.remainingFlags === 0) {
      this.showMsg('No More Flag Left!');
      return;
    }
    cell.isFlag = true;
    this.remainingFlags--;
    this.flaggedCells.push(cell);
    this.checkIfGameIsFinish();
  }

  checkIfGameIsFinish(): void {
    if (this.remainingFlags !== 0) {
      return;
    }
    for (let i = 0; i < this.flaggedCells.length; i++) {
      if (!this.flaggedCells[i].isMines) {
        return;
      }
    }
    this.finishGame();
  }

  finishGame(): void {
    this.isActive = false;
    this.showMsg('You Win This Game!');
  }

  needToShowText(cell: Cell): boolean {
    return cell.isClick || this.settingsService.getSettings().isSuperManMode || !this.isActive;
  }

  initCells(): void {
    this.cells = [];
    for (let i = 0; i < this.settings.height; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.settings.width; j++) {
        this.cells[i][j] = new Cell(i, j);
      }
    }
  }

  addMines(): void {
    for (let countMines = this.settings.mines; countMines !== 0; countMines--) {
      this.addMineToCellsArr();
    }
  }

  addMineToCellsArr(): void {
    let i = Math.floor(Math.random() * this.settings.height);
    let j = Math.floor(Math.random() * this.settings.width);
    if (this.cells[i][j].isMines) {
      return this.addMineToCellsArr();
    }
    this.cells[i][j].isMines = true;
    this.cells[i][j].value = -1;
  }

  isValidIndex(i: number, j: number): boolean {
    return i >= 0 && i < this.settings.height && j >= 0 && j < this.settings.width;
  }

  updateCellNumbers(): void {
    for (let i = 0; i < this.settings.height; i++) {
      for (let j = 0; j < this.settings.width; j++) {
        if (!this.cells[i][j].isMines) {
          this.cells[i][j].value = this.foundCellValue(i, j);
        }
      }
    }
  }

  foundCellValue(i: number, j: number): number {
    let numberOfMinesNearMe = 0;
    let cellsNearMe = this.findCellNear(i, j);
    for (let index = 0; index < cellsNearMe.length; index++) {
      if (cellsNearMe[index].isMines) {
        numberOfMinesNearMe++;
      }
    }
    return numberOfMinesNearMe;
  }

  findCellNear(i: number, j: number): Cell[] {
    let cellNear: Cell[] = [];
    if (this.isValidIndex(i - 1, j - 1)) {
      cellNear.push(this.cells[i - 1][j - 1]);
    }
    if (this.isValidIndex(i - 1, j)) {
      cellNear.push(this.cells[i - 1][j]);
    }
    if (this.isValidIndex(i - 1, j + 1)) {
      cellNear.push(this.cells[i - 1][j + 1]);
    }
    if (this.isValidIndex(i, j - 1)) {
      cellNear.push(this.cells[i][j - 1]);
    }
    if (this.isValidIndex(i, j + 1)) {
      cellNear.push(this.cells[i][j + 1]);
    }
    if (this.isValidIndex(i + 1, j - 1)) {
      cellNear.push(this.cells[i + 1][j - 1]);
    }
    if (this.isValidIndex(i + 1, j)) {
      cellNear.push(this.cells[i + 1][j]);
    }
    if (this.isValidIndex(i + 1, j + 1)) {
      cellNear.push(this.cells[i + 1][j + 1]);
    }
    return cellNear;
  }

}
