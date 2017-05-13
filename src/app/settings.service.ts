import { Injectable } from '@angular/core';

import { Settings } from './items/settings';

@Injectable()
export class SettingsService {
  settings: Settings;

  constructor() {
    this.settings = new Settings();
  }
  getSettings(): Settings {
    return this.settings;
  }
}
