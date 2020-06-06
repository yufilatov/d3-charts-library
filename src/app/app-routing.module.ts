import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleChartLineSeriesComponent } from 'src/examples/example-chart-line-series/sandbox-chart-line-series.component';
import { ExampleChartRadialTreeComponent } from 'src/examples/example-chart-radial-tree/example-chart-radial-tree.component';
import { ExampleChartChordSeriesComponent } from 'src/examples/example-chart-chord-series/examples-chart-chord-series.component';
import { ExampleChartDonutSeriesComponent } from 'src/examples/example-chart-donut-series/example-chart-donut-series.component';
import { ExampleChartIcicleSeriesComponent } from 'src/examples/example-chart-icicle-series/example-chart-icicle-series.component';
import { ExampleChartMatrixSeriesComponent } from 'src/examples/example-chart-matrix-series/example-chart-matrix-series.component';
import { ExampleChartSunburstSeriesComponent } from 'src/examples/example-chart-sunburst-series/example-chart-sunburst-series.component';
import { ExampleChartLineSeriesTypesComponent } from 'src/examples/example-chart-line-series-types/example-chart-line-series-types.component';
import { ExampleChartHalfDonutSeriesComponent } from 'src/examples/example-chart-half-donut-series/example-chart-half-donut-series.component';
import { ExampleChartBarProgressSeriesComponent } from 'src/examples/example-chart-bar-progress-series/examples-chart-bar-progress-series.component';
import { ExampleChartDoubleDonutSeriesComponent } from 'src/examples/example-chart-double-donut-series/example-chart-double-donut-series.component';
import { SandboxChartBarHorizontalSeriesComponent } from 'src/examples/example-chart-bar-horizontal-series/example-chart-bar-horizontal-series.component';
import { ExampleChartBarVerticalSeriesComponent } from 'src/examples/example-chart-bar-vertical-series/example-chart-bar-vertical-series.component';
import { ExampleChartBarSimpleSeriesComponent } from 'src/examples/example-chart-bar-simple-series/examples-chart-bar-simple-series.component';
import { ExampleChartAreaSeriesComponent } from 'src/examples/example-chart-area-series/example-chart-area-series.component';
import { ExampleChartPieSeriesComponent } from 'src/examples/example-chart-pie-series/example-chart-pie-series.component';


export const routes: Routes = [
  { path: 'area', component: ExampleChartAreaSeriesComponent },
  { path: 'bar-horizontal', component: SandboxChartBarHorizontalSeriesComponent },
  { path: 'bar-vertical', component: ExampleChartBarVerticalSeriesComponent },
  { path: 'bar-simple', component: ExampleChartBarSimpleSeriesComponent },
  { path: 'bar-progress', component: ExampleChartBarProgressSeriesComponent },
  { path: 'chord', component: ExampleChartChordSeriesComponent },
  { path: 'donut', component: ExampleChartDonutSeriesComponent },
  { path: 'double-donut', component: ExampleChartDoubleDonutSeriesComponent },
  { path: 'half-donut', component: ExampleChartHalfDonutSeriesComponent },
  { path: 'icicle', component: ExampleChartIcicleSeriesComponent },
  { path: 'line', component: ExampleChartLineSeriesComponent },
  { path: 'line-types', component: ExampleChartLineSeriesTypesComponent },
  { path: 'matrix', component: ExampleChartMatrixSeriesComponent },
  { path: 'pie', component: ExampleChartPieSeriesComponent },
  { path: 'radial-tree', component: ExampleChartRadialTreeComponent },
  { path: 'sunburst', component: ExampleChartSunburstSeriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
