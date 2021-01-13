import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { MatrixSeriesChartComponent } from './matrix-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [MatrixSeriesChartComponent],
    exports: [MatrixSeriesChartComponent],
})
export class ChartMatrixSeriesModule { }
