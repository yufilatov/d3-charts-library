import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { ChartPlotComponent } from './chart-plot.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [ChartPlotComponent],
    exports: [ChartPlotComponent],
})
export class ChartPlotModule { }
