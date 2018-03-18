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
import { JobModel } from '../../../../common/models/job.model';

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

    getCached() {
        this.http.get("/api/test").subscribe(res => {
            alert(JSON.stringify(res, null, 4));
        })
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

   
    getWebSocket(): Promise < WebSocket > {
        return new Promise((res, rej) => {
            if (this._socket !== undefined && this._socket !== null && this._socket.OPEN) {
                res(this._socket);
            }
            this._socket = new WebSocket("ws://" + location.host + "/ws");
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
        let responseCount = 0;
        let goal = 10;
        let start = new Date();
        for (let i = 0; i < goal; i++) {
            let person = new PersonModel(this.personName + i);
            person.job = new JobModel("Engineer " + i, 105_000);
            this.http.post('/api/addPerson', person).subscribe((r) => {
                if (++responseCount == goal) alert(`we did it! ${(<any>new Date() - <any>start) / 1000}`);
                console.log(JSON.stringify(r, null, 4));
            });
        }
    }
}