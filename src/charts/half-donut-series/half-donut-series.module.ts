import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { HalfDonutSeriesChartComponent } from './half-donut-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [HalfDonutSeriesChartComponent],
    exports: [HalfDonutSeriesChartComponent],
})
export class ChartHalfDonutSeriesModule { }
