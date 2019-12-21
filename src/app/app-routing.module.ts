import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandboxChartChordSeriesComponent } from 'src/sandboxes/sandbox-chart-chord-series/sandbox-chart-chord-series.component';
import { SandboxChartSunburstSeriesComponent } from 'src/sandboxes/sandbox-chart-sunburst-series/sandbox-chart-sunburst-series.component';
import { SandboxChartMatrixSeriesComponent } from 'src/sandboxes/sandbox-chart-matrix-series/sandbox-chart-matrix-series.component';
import { SandboxChartBarSeriesComponent } from 'src/sandboxes/sandbox-chart-bar-series/sandbox-chart-bar-series.component';
import {
  SandboxChartBarProgressSeriesComponent
} from 'src/sandboxes/sandbox-chart-bar-progress-series/sandbox-chart-bar-progress-series.component';
import { SandboxChartPieSeriesComponent } from 'src/sandboxes/sandbox-chart-pie-series/sandbox-chart-pie-series.component';
import { SandboxChartDonutSeriesComponent } from 'src/sandboxes/sandbox-chart-donut-series/sandbox-chart-donut-series.component';
import {
  SandboxChartHalfDonutSeriesComponent
} from 'src/sandboxes/sandbox-chart-half-donut-series/sandbox-chart-half-donut-series.component';
import {
  SandboxChartDoubleDonutSeriesComponent
} from 'src/sandboxes/sandbox-chart-double-donut-series/sandbox-chart-double-donut-series.component';
import { SandboxChartRadialTreeComponent } from 'src/sandboxes/sandbox-chart-radial-tree/sandbox-chart-radial-tree.component';
import { SandboxChartIcicleSeriesComponent } from 'src/sandboxes/sandbox-chart-icicle-series/sandbox-chart-icicle-series.component';
import { SandboxChartLineSeriesComponent } from 'src/sandboxes/sandbox-chart-line-series/sandbox-chart-line-series.component';
import { SandboxChartAreaSeriesComponent } from 'src/sandboxes/sandbox-chart-area-series/sandbox-chart-area-series.component';
import {
  SandboxChartLineSeriesTypesComponent
} from 'src/sandboxes/sandbox-chart-line-series-types/sandbox-chart-line-series-types.component';


export const routes: Routes = [
  { path: 'area', component: SandboxChartAreaSeriesComponent },
  { path: 'bar', component: SandboxChartBarSeriesComponent },
  { path: 'bar-progress', component: SandboxChartBarProgressSeriesComponent },
  { path: 'chord', component: SandboxChartChordSeriesComponent },
  { path: 'donut', component: SandboxChartDonutSeriesComponent },
  { path: 'double-donut', component: SandboxChartDoubleDonutSeriesComponent },
  { path: 'half-donut', component: SandboxChartHalfDonutSeriesComponent },
  { path: 'icicle', component: SandboxChartIcicleSeriesComponent },
  { path: 'line', component: SandboxChartLineSeriesComponent },
  { path: 'line-types', component: SandboxChartLineSeriesTypesComponent },
  { path: 'matrix', component: SandboxChartMatrixSeriesComponent },
  { path: 'pie', component: SandboxChartPieSeriesComponent },
  { path: 'radial-tree', component: SandboxChartRadialTreeComponent },
  { path: 'sunburst', component: SandboxChartSunburstSeriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
