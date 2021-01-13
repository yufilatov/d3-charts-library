import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { DonutSeriesChartComponent } from './donut-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [DonutSeriesChartComponent],
    exports: [DonutSeriesChartComponent],
})
export class ChartDonutSeriesModule { }
