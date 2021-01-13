import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { DoubleDonutSeriesChartComponent } from './double-donut-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [DoubleDonutSeriesChartComponent],
    exports: [DoubleDonutSeriesChartComponent],
})
export class ChartDoubleDonutSeriesModule { }
