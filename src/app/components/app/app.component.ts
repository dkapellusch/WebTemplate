import { Component } from '@angular/core';

@Component(
            { selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: ['./app.component.css']
            }
          )
export class AppComponent {

    public title: string = "Template!";
    public count: number = 0;

    public clicked() {
        this.count++;
    }

}