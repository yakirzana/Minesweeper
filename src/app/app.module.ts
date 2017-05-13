import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }        from './components/app.component';
import { SettingsComponent } from './components/settings.component';
import { GameComponent } from './components/game.component';
import { SettingsService } from './settings.service';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    GameComponent,
    SettingsComponent,
  ],
  providers: [
    SettingsService
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule {
}
