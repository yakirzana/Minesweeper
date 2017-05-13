import { Component } from '@angular/core';
import { Settings } from '../items/settings';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'game-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.css' ]
})

export class SettingsComponent {
  settings: Settings;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
  }

}
