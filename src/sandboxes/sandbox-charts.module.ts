import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/charts/components.module';
import { SandboxChartAreaSeriesComponent } from './sandbox-chart-area-series/sandbox-chart-area-series.component';
import { SandboxChartBarProgressSeriesComponent } from './sandbox-chart-bar-progress-series/sandbox-chart-bar-progress-series.component';
import { SandboxChartBarHorizontalSeriesComponent } from './sandbox-chart-bar-horizontal-series/sandbox-chart-bar-horizontal-series.component';
import { SandboxChartChordSeriesComponent } from './sandbox-chart-chord-series/sandbox-chart-chord-series.component';
import { SandboxChartDonutSeriesComponent } from './sandbox-chart-donut-series/sandbox-chart-donut-series.component';
import { SandboxChartDoubleDonutSeriesComponent } from './sandbox-chart-double-donut-series/sandbox-chart-double-donut-series.component';
import { SandboxChartHalfDonutSeriesComponent } from './sandbox-chart-half-donut-series/sandbox-chart-half-donut-series.component';
import { SandboxChartIcicleSeriesComponent } from './sandbox-chart-icicle-series/sandbox-chart-icicle-series.component';
import { SandboxChartLineSeriesComponent } from './sandbox-chart-line-series/sandbox-chart-line-series.component';
import { SandboxChartLineSeriesTypesComponent } from './sandbox-chart-line-series-types/sandbox-chart-line-series-types.component';
import { SandboxChartMatrixSeriesComponent } from './sandbox-chart-matrix-series/sandbox-chart-matrix-series.component';
import { SandboxChartPieSeriesComponent } from './sandbox-chart-pie-series/sandbox-chart-pie-series.component';
import { SandboxChartRadialTreeComponent } from './sandbox-chart-radial-tree/sandbox-chart-radial-tree.component';
import { SandboxChartSunburstSeriesComponent } from './sandbox-chart-sunburst-series/sandbox-chart-sunburst-series.component';
import { SandboxChartBarVerticalSeriesComponent } from './sandbox-chart-bar-vertical-series/sandbox-chart-bar-series.component';
import { SandboxChartBarSimpleSeriesComponent } from './sandbox-chart-bar-simple-series/sandbox-chart-bar-simple-series.component';
import { HttpClientModule } from '@angular/common/http';
import { SandboxDataService } from './sandbox-dataservice';

@NgModule({
  declarations: [
    SandboxChartAreaSeriesComponent,
    SandboxChartBarHorizontalSeriesComponent,
    SandboxChartBarVerticalSeriesComponent,
    SandboxChartBarSimpleSeriesComponent,
    SandboxChartBarProgressSeriesComponent,
    SandboxChartChordSeriesComponent,
    SandboxChartDonutSeriesComponent,
    SandboxChartDoubleDonutSeriesComponent,
    SandboxChartHalfDonutSeriesComponent,
    SandboxChartIcicleSeriesComponent,
    SandboxChartLineSeriesComponent,
    SandboxChartLineSeriesTypesComponent,
    SandboxChartMatrixSeriesComponent,
    SandboxChartPieSeriesComponent,
    SandboxChartRadialTreeComponent,
    SandboxChartSunburstSeriesComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SandboxDataService,
  ]
})
export class SandboxChartsModule { }
