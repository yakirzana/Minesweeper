export class Settings {
  static readonly MAX_WIDTH_HEIGHT = 300;
  width: number;
  height: number;
  mines: number;
  isSuperManMode: boolean;

  constructor() {
    this.width = 8;
    this.height = 8;
    this.mines = 9;
    this.isSuperManMode = false;
  }

  public copyOfSettings(): Settings {
    let newSettings = new Settings();
    newSettings.width = this.width;
    newSettings.height = this.height;
    newSettings.mines = this.mines;
    newSettings.isSuperManMode = this.isSuperManMode;
    return newSettings;
  }

  public getMaxSize(): number {
    return Settings.MAX_WIDTH_HEIGHT;
  }
}
