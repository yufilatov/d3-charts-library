import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { ChordSeriesChartComponent } from './chord-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [ChordSeriesChartComponent],
    exports: [ChordSeriesChartComponent],
})
export class ChartChordSeriesModule { }
