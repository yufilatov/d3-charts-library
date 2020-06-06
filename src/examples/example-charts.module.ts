import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/charts/components.module';
import { ExampleChartBarProgressSeriesComponent } from './example-chart-bar-progress-series/examples-chart-bar-progress-series.component';
import { SandboxChartBarHorizontalSeriesComponent } from './example-chart-bar-horizontal-series/example-chart-bar-horizontal-series.component';
import { ExampleChartChordSeriesComponent } from './example-chart-chord-series/examples-chart-chord-series.component';
import { ExampleChartDoubleDonutSeriesComponent } from './example-chart-double-donut-series/example-chart-double-donut-series.component';
import { ExampleChartHalfDonutSeriesComponent } from './example-chart-half-donut-series/example-chart-half-donut-series.component';
import { ExampleChartIcicleSeriesComponent } from './example-chart-icicle-series/example-chart-icicle-series.component';
import { ExampleChartLineSeriesComponent } from './example-chart-line-series/sandbox-chart-line-series.component';
import { ExampleChartLineSeriesTypesComponent } from './example-chart-line-series-types/example-chart-line-series-types.component';
import { ExampleChartMatrixSeriesComponent } from './example-chart-matrix-series/example-chart-matrix-series.component';
import { ExampleChartRadialTreeComponent } from './example-chart-radial-tree/example-chart-radial-tree.component';
import { ExampleChartSunburstSeriesComponent } from './example-chart-sunburst-series/example-chart-sunburst-series.component';
import { ExampleChartBarSimpleSeriesComponent } from './example-chart-bar-simple-series/examples-chart-bar-simple-series.component';
import { HttpClientModule } from '@angular/common/http';
import { ExampleDataService } from './example-data-service';
import { ExampleChartAreaSeriesComponent } from './example-chart-area-series/example-chart-area-series.component';
import { ExampleChartBarVerticalSeriesComponent } from './example-chart-bar-vertical-series/example-chart-bar-vertical-series.component';
import { FormsModule } from '@angular/forms';
import { ExampleChartDonutSeriesComponent } from './example-chart-donut-series/example-chart-donut-series.component';
import { ExampleChartPieSeriesComponent } from './example-chart-pie-series/example-chart-pie-series.component';

@NgModule({
  declarations: [
    ExampleChartAreaSeriesComponent,
    SandboxChartBarHorizontalSeriesComponent,
    ExampleChartBarVerticalSeriesComponent,
    ExampleChartBarSimpleSeriesComponent,
    ExampleChartBarProgressSeriesComponent,
    ExampleChartChordSeriesComponent,
    ExampleChartDonutSeriesComponent,
    ExampleChartDoubleDonutSeriesComponent,
    ExampleChartHalfDonutSeriesComponent,
    ExampleChartIcicleSeriesComponent,
    ExampleChartLineSeriesComponent,
    ExampleChartLineSeriesTypesComponent,
    ExampleChartMatrixSeriesComponent,
    ExampleChartPieSeriesComponent,
    ExampleChartRadialTreeComponent,
    ExampleChartSunburstSeriesComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ExampleDataService,
  ],
})
export class ExampleChartsModule { }
