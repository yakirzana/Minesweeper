import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <game-settings></game-settings>
    <minesweeper-game></minesweeper-game>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'Minesweeper Example';
}
