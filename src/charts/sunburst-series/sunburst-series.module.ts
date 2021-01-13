import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { SunburstSeriesChartComponent } from './sunburst-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [SunburstSeriesChartComponent],
    exports: [SunburstSeriesChartComponent],
})
export class ChartSunburstSeriesModule { }
