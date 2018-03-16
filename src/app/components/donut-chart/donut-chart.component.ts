import {Component, OnInit, Input} from '@angular/core';

@Component({selector: 'app-donut-chart', templateUrl: './donut-chart.component.html', styleUrls: ['./donut-chart.component.css']})
export class DonutChartComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
  @Input()
  public title : string = ""
  // PolarArea
  public polarAreaChartLabels : string[] = ['Hang Time', 'Swing Time', 'Dump Time', 'Return Time', 'Fill Time'];
  public polarAreaChartData : number[] = [
    30 + (Math.random() * 20),
    15 + (Math.random() * 20),
    1 + (Math.random() * 10),
    35 + (Math.random() * 20),
    20 + (Math.random() * 20)
  ];
  public polarAreaLegend : boolean = true;

  public polarAreaChartType : string = 'polarArea';

  // events
  public chartClicked(e : any) : void {}

  public chartHovered(e : any) : void {}
}
