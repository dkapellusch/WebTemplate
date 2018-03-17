import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';

import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';

import { IUserData } from '../../models/userdata.model';
import { ExampleDataSource, ExampleDatabase } from '../../services/databases/example.database.service';
import { HttpClient } from '@angular/common/http';
import { INCREMENT, DECREMENT, RESET } from '../../reducers/counter.reducer';
import { Store } from '@ngrx/store';
import { test } from '../../decorators/test.decorator';
import { guid } from '../../utils/guid';
import { PersonModel } from '../../../../common/models/person.model';
import { createWorker } from '../../utils/createWorker';

interface IAppState {
    count: number;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

    _socket: any;
    count$: Observable < number > ;
    title = 'App';
    personName = '';
    constructor(private store: Store < IAppState > , private http: HttpClient) {
        this.count$ = store.select((a) => a.count);
    }

    increment() {
        this.store.dispatch({ type: INCREMENT });
    }

    decrement() {
        this.store.dispatch({ type: DECREMENT });
    }

    reset() {
        this.store.dispatch({ type: RESET });
    }

    connect() {
        return new Promise(function(resolve, reject) {
            var server = new WebSocket('ws://mysite:1234');
            server.onopen = function() {
                resolve(server);
            };
            server.onerror = function(err) {
                reject(err);
            };

        });
    }

    getWebSocket(): Promise < WebSocket > {
        return new Promise((res, rej) => {
            if (this._socket !== undefined && this._socket !== null && this._socket.OPEN) {
                res(this._socket);
            }
            this._socket = new WebSocket("ws://localhost:4200/api");
            this._socket.onmessage = (m) => {
                alert("Wow I got " + JSON.stringify(m.data));
            }
            this._socket.onopen = () => res(this._socket);
            this._socket.onerror = (err) => rej(err);
        });

    }

    @test
    async sendMessage() {
        (await this.getWebSocket()).send("hey");
    }
	
	testWorker() {
		let code = () => "wowie!";
		let worker = createWorker(code.toString());
		worker.postMessage("test");
		worker.onmessage = (m) => console.log(m.data)
	}
    makePerson() {
        this.http.post('/api/addPerson', new PersonModel(this.personName)).subscribe((r) => {
            console.log(JSON.stringify(r, null, 4));
        });
    }
}