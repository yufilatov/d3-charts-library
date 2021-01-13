import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { GridSeriesChartComponent } from './grid-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [GridSeriesChartComponent],
    exports: [GridSeriesChartComponent],
})
export class ChartGridSeriesModule { }
