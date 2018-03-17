import {Observable} from "rxjs/Observable";
import {DataSource} from "@angular/cdk/table";
import {MatSort, MatPaginator} from "@angular/material";
import {IUserData} from "../../models/userdata.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";

const CREWS = ["A", "B", "C", "D"];
const NAMES = [
    "Maia",
    "Asher",
    "Olivia",
    "Atticus",
    "Amelia",
    "Jack",
    "Charlotte",
    "Theodore",
    "Isla",
    "Oliver",
    "Isabella",
    "Jasper",
    "Cora",
    "Levi",
    "Violet",
    "Arthur",
    "Mia",
    "Thomas",
    "Elizabeth"
];

@Injectable()
export class ExampleDatabase
{
    /** Stream that emits whenever the data has been modified. */
    public dataChange = new BehaviorSubject < IUserData[] > ([]);

    public get data() : IUserData[]
    {
        return this.dataChange.value;
    }

    public columns = Object.keys(this.createNewUser());
    constructor()
    {
        // Fill up the database with 100 users.
        for (let i = 0; i < 25; i++) 
            this.addUser();
        }
    
    /** Adds a new user to the database. */
    public addUser()
    {
        const copiedData = this
            .data
            .slice();
        copiedData.push(this.createNewUser());
        let sortedByScore = copiedData.sort((a, b) => b.score - a.score);
        sortedByScore = sortedByScore.map((el, i) => {
            el.position = i + 1;
            return el;
        });
        this
            .dataChange
            .next(sortedByScore);
    }

    /** Builds and returns a new User. */
    private createNewUser()
    {
        const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + " " + NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + ".";
        let score = Math.round(Math.random() * 60) + 40;
       
        return {
            position: (this.data.length + 1),
            name: name,
            score: score,
            crew: CREWS[Math.floor(Math.random() * CREWS.length)]
        };
    }
}

/**
* Data source to provide what data should be rendered in the table. Note that the data source
* can retrieve its data in any way. In this case, the data source is provided a reference
* to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
* the underlying data. Instead, it only needs to take the data and send the table exactly what
* should be rendered.
*/
export class ExampleDataSource extends DataSource < any > {
    public _filterChange = new BehaviorSubject("");

    public get filter() : string
    {
        return this._filterChange.value;
    }

    public set filter(filter : string)
    {
        this
            ._filterChange
            .next(filter);
    }

    constructor(private _exampleDatabase : ExampleDatabase, private _paginator : MatPaginator, private _sort : MatSort)
    {
        super();
    }

    private get SortedData() : IUserData[]
    {
        const data = this
            ._exampleDatabase
            .data
            .slice();
        if (!this._sort.active || this._sort.direction == "") 
            return data;
        
        return data.sort((a, b) => {
            let propertyA : number | string = "";
            let propertyB : number | string = "";

            switch (this._sort.active) {
                case "position":
                    [propertyA, propertyB] = [a.position, b.position];
                    break;
                case "userName":
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case "hangTime":
                    [propertyA, propertyB] = [a.score, b.score];
                    break;

                case "crew":
                    [propertyA, propertyB] = [a.crew, b.crew]
            }

            const valueA = isNaN(+ propertyA)
                ? propertyA
                : + propertyA;
            const valueB = isNaN(+ propertyB)
                ? propertyB
                : + propertyB;

            return (valueA < valueB
                ? -1
                : 1) * (this._sort.direction == "asc"
                ? 1
                : -1);
        });
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    public connect() : Observable < IUserData[] > {
        const displayDataChanges = [this._exampleDatabase.dataChange, this._paginator.page, this._sort.sortChange, this._filterChange];

        return Observable
            .merge(...displayDataChanges)
            .map(() => {
                const data = this.SortedData; //this._exampleDatabase.data.slice();
                // Grab the page's slice of data.
                const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                return data
                    .splice(startIndex, this._paginator.pageSize)
                    .filter((item : IUserData) => {
                        const searchStr = (item.name + item.position + item.score).toLowerCase();
                        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
                    });
            });
    }

    public disconnect()
    {}

}
