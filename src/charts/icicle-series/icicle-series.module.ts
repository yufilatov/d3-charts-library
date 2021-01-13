import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { IcicleSeriesChartComponent } from './icicle-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [IcicleSeriesChartComponent],
    exports: [IcicleSeriesChartComponent],
})
export class ChartIcicleSeriesModule { }
