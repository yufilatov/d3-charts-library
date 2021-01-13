import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { RadialTreeSeriesChartComponent } from './radial-tree-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [RadialTreeSeriesChartComponent],
    exports: [RadialTreeSeriesChartComponent],
})
export class ChartRadialTreeSeriesModule { }
