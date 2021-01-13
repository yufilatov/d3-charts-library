import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { BarSimpleSeriesChartComponent } from './bar-simple-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [BarSimpleSeriesChartComponent],
    exports: [BarSimpleSeriesChartComponent],
})
export class ChartBarSimpleSeriesModule { }
