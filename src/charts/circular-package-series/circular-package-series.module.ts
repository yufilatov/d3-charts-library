import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { CircularPackageSeriesChartComponent } from './circular-package-series.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [CircularPackageSeriesChartComponent],
    exports: [CircularPackageSeriesChartComponent],
})
export class ChartCircularPackageSeriesModule { }
