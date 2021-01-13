import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { YAxisChartComponent } from './y-axis.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [YAxisChartComponent],
    exports: [YAxisChartComponent],
})
export class ChartYAxisModule { }
