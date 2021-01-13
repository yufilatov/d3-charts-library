import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { XAxisChartComponent } from './x-axis.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [XAxisChartComponent],
    exports: [XAxisChartComponent],
})
export class ChartXAxisModule { }
