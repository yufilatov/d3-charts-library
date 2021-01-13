import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [ChartComponent],
    exports: [ChartComponent],
})
export class ChartModule { }
