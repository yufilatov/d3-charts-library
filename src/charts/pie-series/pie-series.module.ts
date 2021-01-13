import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { PieSeriesChartComponent } from './pie-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [PieSeriesChartComponent],
    exports: [PieSeriesChartComponent],
})
export class ChartPieSeriesModule { }
