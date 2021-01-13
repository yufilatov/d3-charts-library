import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { BarSeriesChartComponent } from './bar-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [BarSeriesChartComponent],
    exports: [BarSeriesChartComponent],
})
export class ChartBarSeriesModule { }
