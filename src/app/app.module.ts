import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ChartsModule} from "ng2-charts";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "./material.module";
import {AppComponent} from './components/app/app.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DataTableComponent} from './components/data-table/data-table.component';
import {ExampleDatabase} from './services/databases/example.database.service';
import {NavMenuComponent} from './components/navmenu/navmenu.component';
import { LineChartComponent } from './components/linechart/linechart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OperatorChartComponent } from './components/operator-chart/operator-chart.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, DataTableComponent, NavMenuComponent, LineChartComponent, DonutChartComponent, DashboardComponent, OperatorChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forRoot([
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      }, {
        path: "home",
        component: HomeComponent
      }, {
        path: "data-table",
        component: DataTableComponent
      }, {
        path: "dashboard",
        component: DashboardComponent
      }, {
        path: "**",
        redirectTo: "home"
      }
    ])
  ],
  providers: [
    HttpClient, ExampleDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}