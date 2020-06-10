import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { AreaSeriesChartComponent } from './area-series/area-series.component';
import { BarSeriesChartComponent } from './bar-series/bar-series.component';
import { BarSimpleSeriesChartComponent } from './bar-simple-series/bar-simple-series.component';
import { BarProgressSeriesChartComponent } from './bar-progress-series/bar-progress-series.component';
import { BreadcrumbChartComponent } from './breadcrumb/breadcrumb.component';
import { ChartPlotComponent } from './chart-plot/chart-plot.component';
import { ChartTicksComponent } from './chart-ticks/chart-ticks.component';
import { ChordSeriesChartComponent } from './chord-series/chord-series.component';
import { DonutSeriesChartComponent } from './donut-series/donut-series.component';
import { DoubleDonutSeriesChartComponent } from './double-donut-series/double-donut-series.component';
import { GridSeriesChartComponent } from './grid-series/grid-series.component';
import { HalfDonutSeriesChartComponent } from './half-donut-series/half-donut-series.component';
import { IcicleSeriesChartComponent } from './icicle-series/icicle-series.component';
import { LineSeriesChartComponent } from './line-series/line-series.component';
import { MatrixSeriesChartComponent } from './matrix-series/matrix-series.component';
import { PieSeriesChartComponent } from './pie-series/pie-series.component';
import { ChartPopupComponent } from './chart-popup/chart-popup.component';
import { RadialTreeSeriesChartComponent } from './radial-tree-series/radial-tree-series.component';
import { RectSeriesChartComponent } from './rect-series/rect-series.component';
import { SunburstSeriesChartComponent } from './sunburst-series/sunburst-series.component';
import { XAxisChartComponent } from './x-axis/x-axis.component';
import { YAxisChartComponent } from './y-axis/y-axis.component';
import { StopPropagationDirective } from 'src/directives/stop-propagation.directive';
import { CommonModule } from '@angular/common';
import { ChartPortalModule } from './chart-portal/chart-portal.module';
import { CircularPackageSeriesChartComponent } from './circular-package-series/circular-package-series.component';
import { WordCloudSeriesChartComponent } from './word-cloud-series/word-cloud-series.component';

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
    CircularPackageSeriesChartComponent,
    DonutSeriesChartComponent,
    DoubleDonutSeriesChartComponent,
    GridSeriesChartComponent,
    HalfDonutSeriesChartComponent,
    IcicleSeriesChartComponent,
    LineSeriesChartComponent,
    MatrixSeriesChartComponent,
    PieSeriesChartComponent,
    ChartPopupComponent,
    RadialTreeSeriesChartComponent,
    RectSeriesChartComponent,
    SunburstSeriesChartComponent,
    WordCloudSeriesChartComponent,
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
    ChordSeriesChartComponent,
    CircularPackageSeriesChartComponent,
    DonutSeriesChartComponent,
    DoubleDonutSeriesChartComponent,
    GridSeriesChartComponent,
    HalfDonutSeriesChartComponent,
    IcicleSeriesChartComponent,
    LineSeriesChartComponent,
    MatrixSeriesChartComponent,
    PieSeriesChartComponent,
    ChartPopupComponent,
    RadialTreeSeriesChartComponent,
    RectSeriesChartComponent,
    SunburstSeriesChartComponent,
    WordCloudSeriesChartComponent,
    XAxisChartComponent,
    YAxisChartComponent,

    StopPropagationDirective,
  ],
})
export class ComponentsModule { }
