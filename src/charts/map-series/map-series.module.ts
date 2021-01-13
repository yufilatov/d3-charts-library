import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { MapSeriesChartComponent } from './map-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [MapSeriesChartComponent],
    exports: [MapSeriesChartComponent],
})
export class ChartMapSeriesModule { }
