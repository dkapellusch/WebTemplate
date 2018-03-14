import {Component, AfterViewInit, Input, ElementRef, ViewChild} from "@angular/core";

@Component({selector: "linechart", template: `
<div style="display: inline-block; width:45vw;">
        <canvas baseChart  [datasets]="lineChartData" [labels]="lineChartLabels" [options]="lineChartOptions"
            [colors]="lineChartColors" [legend]="lineChartLegend" [chartType]="lineChartType" (chartHover)="chartHovered($event)"
            (chartClick)="chartClicked($event)">
        </canvas>
    <mat-slider style="width:35vw; margin-left:5vw;" thumbLabel tickInterval="250"  min="0" max="10000" step="100" value="1500" (input)="test($event)" ></mat-slider>
        
    </div>
    <ng-content></ng-content>
`})
export class LineChartComponent implements AfterViewInit
{    
    @Input()
    public shovel1:string = "SH432";
    @Input()

    public shovel2:string = "SH341";
    constructor()
    {}

    @Input()
    public ShowButton = true;
    public _value = 5000;

    public get Value()
    {
        return this._value;
    }

    public test(e : any)
    {
        const previousValue = this._value;
        this._value = e.value;
        if (previousValue == 0) 
            this.RandomizeOnInterval();
        }
    
    public RandomizeOnInterval()
    {
        if (this.Value > 0) {
            setTimeout(function () {
                this.randomize();
                this.RandomizeOnInterval();
            }.bind(this), this.Value);
        }
    }

    public ngAfterViewInit() : void
    {
        this.RandomizeOnInterval();
    }

    public lineChartData : Array < any > =   [
        {
            data: [
                65,
                59,
                80,
                81,
                56,
                55,
                40
            ],
            label: this.shovel1
        }, {
            data: [
                28,
                48,
                40,
                19,
                86,
                27,
                90
            ],
            label: this.shovel2
        }
    ];

    public lineChartLabels : Array < any > = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
    ];
    public lineChartOptions : any = {
        responsive: true
    };

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

    public randomize() : void
    {
        const _lineChartData = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {
                data: new Array(this.lineChartData[i].data.length),
                label: this.lineChartData[i].label
            };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) 
                _lineChartData[i].data[j] = Math.floor((Math.random() * 25) + 8 * j);
            }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e : any) : void
    {}

    public chartHovered(e : any) : void
    {
        const x = 2;
    }
}