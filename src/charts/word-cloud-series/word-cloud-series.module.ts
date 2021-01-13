import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { WordCloudSeriesChartComponent } from './word-cloud-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [WordCloudSeriesChartComponent],
    exports: [WordCloudSeriesChartComponent],
})
export class ChartWordCloudSeriesModule { }
