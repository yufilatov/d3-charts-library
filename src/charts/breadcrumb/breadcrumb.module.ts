import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { BreadcrumbChartComponent } from './breadcrumb.component';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
    ],
    declarations: [BreadcrumbChartComponent],
    exports: [BreadcrumbChartComponent],
})
export class ChartBreadcrumbModule { }
