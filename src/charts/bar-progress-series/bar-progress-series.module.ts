import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { BarProgressSeriesChartComponent } from './bar-progress-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [BarProgressSeriesChartComponent],
    exports: [BarProgressSeriesChartComponent],
})
export class ChartBarProgressSeriesModule { }
