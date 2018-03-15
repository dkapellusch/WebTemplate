import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { of } from "rxjs/observable/of";
import { Actions, Effect } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { INCREMENT } from "../reducers/counter.reducer";
import "rxjs/add/operator/map";

// Can use this as the action type as well
export const NO_ACTION = "NO_ACTION";
@Injectable()
export class AlertEffect {

    constructor(
        private actions$: Actions) {}

    @Effect({dispatch: false}) incremented$: Observable<Action> = this.actions$.ofType(INCREMENT).map(inc => {
        console.log("incremented!");
        return {type: NO_ACTION};
    });
}