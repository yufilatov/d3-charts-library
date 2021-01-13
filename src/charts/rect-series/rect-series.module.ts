import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { RectSeriesChartComponent } from './rect-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [RectSeriesChartComponent],
    exports: [RectSeriesChartComponent],
})
export class ChartRectSeriesModule { }
