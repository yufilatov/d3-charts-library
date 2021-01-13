import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { LineSeriesChartComponent } from './line-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [LineSeriesChartComponent],
    exports: [LineSeriesChartComponent],
})
export class ChartLineSeriesModule { }
