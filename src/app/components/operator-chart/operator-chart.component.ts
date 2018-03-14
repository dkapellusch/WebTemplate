import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ExampleDatabase, ExampleDataSource} from '../../services/databases/example.database.service';
import {MatSelect} from '@angular/material';
import {isNullOrUndefined} from 'util';
import { BaseChartDirective } from 'ng2-charts';

@Component({selector: 'app-operator-chart', templateUrl: './operator-chart.component.html', styleUrls: ['./operator-chart.component.css']})
export class OperatorChartComponent implements OnInit {

  constructor(public exampleDatabase : ExampleDatabase)
  {}

  public selected = this.exampleDatabase.data[0].name;
  ngOnInit() {
    this.changed();
  }
  public users = this
    .exampleDatabase
    .data
    .map(u => u.name);
  public getDistribution(score : number) : number[] {
    return [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ].map((s, i) => {
      return (score - (Math.random() * (11 - i) * 5));
    });

  }
  public _value = 5000;

  public get Value()
  {
    return this._value;
  }

  public lineChartData : Array < any > = [
    {
      data: this.getDistribution(this.exampleDatabase.data[0].score),
      label: this.exampleDatabase.data[0].name
    }
  ]

  public lineChartLabels : Array < any > = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December"
  ];
  public lineChartOptions : any = {
    responsive: true
  };

  public get chartData() {
    return this.lineChartData;
  }
  public lineChartColors : Array < any > = [
    { // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }, { // dark grey
      backgroundColor: "rgba(77,83,96,0.2)",
      borderColor: "rgba(77,83,96,1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    }, { // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];

  public lineChartLegend = true;
  public lineChartType = "line";

  public randomChoice() {
    return this.exampleDatabase.data[Math.floor(Math.random() * this.exampleDatabase.data.length)];
  }
  public changeOperators(operator : string) : void
  {
    
    this.lineChartData = [{
      data: this.getDistribution(this.exampleDatabase.data.find(d => d.name == operator).score),
      label: operator
    }];
    console.log(this.lineChartData);
    
  }

  public changed() {
      this.changeOperators(this.selected);
    }
  // events
  public chartClicked(e : any) : void
  {}

  public chartHovered(e : any) : void
  {
    const x = 2;
  }

}
