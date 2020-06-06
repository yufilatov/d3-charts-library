import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { ChordSeriesChartComponent } from './chord-series/chord-series.component';
import { SunburstSeriesChartComponent } from './sunburst-series/sunburst-series.component';
import { MatrixSeriesChartComponent } from './matrix-series/matrix-series.component';
import { BarProgressSeriesChartComponent } from './bar-progress-series/bar-progress-series.component';
import { PieSeriesChartComponent } from './pie-series/pie-series.component';
import { DonutSeriesChartComponent } from './donut-series/donut-series.component';
import { HalfDonutSeriesChartComponent } from './half-donut-series/half-donut-series.component';
import { DoubleDonutSeriesChartComponent } from './double-donut-series/double-donut-series.component';
import { ChartTicksComponent } from './chart-ticks/chart-ticks.component';
import { RadialTreeSeriesChartComponent } from './radial-tree-series/radial-tree-series.component';
import { BreadcrumbChartComponent } from './breadcrumb/breadcrumb.component';
import { StopPropagationDirective } from '../directives/stop-propagation.directive';
import { IcicleSeriesChartComponent } from './icicle-series/icicle-series.component';
import { LineSeriesChartComponent } from './line-series/line-series.component';
import { XAxisChartComponent } from './x-axis/x-axis.component';
import { AreaSeriesChartComponent } from './area-series/area-series.component';
import { YAxisChartComponent } from './y-axis/y-axis.component';
import { RectSeriesChartComponent } from './rect-series/rect-series.component';
import { ChartPlotComponent } from './chart-plot/chart-plot.component';
import { BarSeriesChartComponent } from './bar-series/bar-series.component';
import { BarSimpleSeriesChartComponent } from './bar-simple-series/bar-simple-series.component';
import { ChartPopupComponent } from './chart-popup/chart-popup.component';
import { ChartPortalModule } from './chart-portal/chart-portal.module';

@NgModule({
  declarations: [
    ChartComponent,

    AreaSeriesChartComponent,
    BarSeriesChartComponent,
    BarSimpleSeriesChartComponent,
    BarProgressSeriesChartComponent,
    BreadcrumbChartComponent,
    ChartPlotComponent,
    ChartTicksComponent,
    ChordSeriesChartComponent,
    DonutSeriesChartComponent,
    DoubleDonutSeriesChartComponent,
    HalfDonutSeriesChartComponent,
    IcicleSeriesChartComponent,
    LineSeriesChartComponent,
    MatrixSeriesChartComponent,
    PieSeriesChartComponent,
    ChartPopupComponent,
    RadialTreeSeriesChartComponent,
    RectSeriesChartComponent,
    SunburstSeriesChartComponent,
    XAxisChartComponent,
    YAxisChartComponent,

    StopPropagationDirective,
  ],
  imports: [
    CommonModule,
    ChartPortalModule,
  ],
  exports: [
    ChartComponent,

    AreaSeriesChartComponent,
    BarSeriesChartComponent,
    BarSimpleSeriesChartComponent,
    BarProgressSeriesChartComponent,
    BreadcrumbChartComponent,
    ChartPlotComponent,
    ChartTicksComponent,
    ChartPopupComponent,
    ChordSeriesChartComponent,
    DonutSeriesChartComponent,
    DoubleDonutSeriesChartComponent,
    HalfDonutSeriesChartComponent,
    IcicleSeriesChartComponent,
    LineSeriesChartComponent,
    MatrixSeriesChartComponent,
    PieSeriesChartComponent,
    RadialTreeSeriesChartComponent,
    RectSeriesChartComponent,
    SunburstSeriesChartComponent,
    XAxisChartComponent,
    YAxisChartComponent,

    StopPropagationDirective,
  ],
})
export class ComponentsModule { }
