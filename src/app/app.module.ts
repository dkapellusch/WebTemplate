import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material.module";
import { AppComponent } from "./components/app/app.component";
import { HomeComponent } from "./components/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { ExampleDatabase } from "./services/databases/example.database.service";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { LineChartComponent } from "./components/linechart/linechart.component";
import { DonutChartComponent } from "./components/donut-chart/donut-chart.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { OperatorChartComponent } from "./components/operator-chart/operator-chart.component";
import { StoreModule } from "@ngrx/store";
import { counterReducer } from "./reducers/counter.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AlertEffect } from "./effects/alert.effect";
import { AuthPageComponent } from "./components/auth-page/auth-page.component";
import { DataAccessService } from "./services/data.access.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataTableComponent,
    NavMenuComponent,
    LineChartComponent,
    DonutChartComponent,
    DashboardComponent,
    OperatorChartComponent,
    AuthPageComponent
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
    StoreModule.forRoot({ count: counterReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([AlertEffect]),
    RouterModule.forRoot([
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "data-table",
        component: DataTableComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "login",
        component: AuthPageComponent
      },
      {
        path: "**",
        redirectTo: "home"
      }
    ])
  ],
  providers: [HttpClient, ExampleDatabase, DataAccessService],
  bootstrap: [AppComponent]
})
export class AppModule {}
