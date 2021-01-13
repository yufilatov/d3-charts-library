import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { AreaSeriesChartComponent } from './area-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [AreaSeriesChartComponent],
    exports: [AreaSeriesChartComponent],
})
export class ChartAreaSeriesModule { }
