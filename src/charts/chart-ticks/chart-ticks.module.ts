import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { ChartTicksComponent } from './chart-ticks.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [ChartTicksComponent],
    exports: [ChartTicksComponent],
})
export class ChartTicksModule { }
