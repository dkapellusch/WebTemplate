import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ExampleDataSource, ExampleDatabase} from '../../services/databases/example.database.service';
import {MatDialog, MatSnackBar, MatSort, MatPaginator} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {IUserData} from '../../models/userdata.model';

@Component({selector: 'data-table', templateUrl: './data-table.component.html', styleUrls: ['./data-table.component.css']})
export class DataTableComponent implements OnInit {
    public COLORS = ["red", "orange", "green"];
    public today = new Date().toLocaleDateString();
    public displayedColumns = this.exampleDatabase.columns;
    public dataSource : ExampleDataSource | null;
    @ViewChild(MatPaginator)
    public paginator : MatPaginator;
    @ViewChild(MatSort)
    public sort : MatSort;
    @ViewChild("filter")
    public filter : ElementRef;

    constructor(private dialog : MatDialog, public snackBar : MatSnackBar, public exampleDatabase : ExampleDatabase)
    {
    }

    public ngOnInit()
    {
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
        Observable
            .fromEvent(this.filter.nativeElement, "keyup")
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) 
                    return;
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    public getColor(score : number) {
        let scoreColor = this.COLORS[score >= 80
                ? 2
                : score >= 50
                    ? 1
                    : 0];
        return scoreColor;
    }
    public rowClickedHandler(x : IUserData) : void
    {}

    public buildValue(row : any, item : any) {
        return row[item];
    }
}
