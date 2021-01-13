import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExampleDataService } from './example-data-service';
import { ExampleChartAreaSeriesComponent } from './example-chart-area-series/example-chart-area-series.component';
import { ExampleChartBarHorizontalSeriesComponent } from './example-chart-bar-horizontal-series/example-chart-bar-horizontal-series.component';
import { ExampleChartBarVerticalSeriesComponent } from './example-chart-bar-vertical-series/example-chart-bar-vertical-series.component';
import { ExampleChartBarSimpleSeriesComponent } from './example-chart-bar-simple-series/examples-chart-bar-simple-series.component';
import { ExampleChartBarProgressSeriesComponent } from './example-chart-bar-progress-series/examples-chart-bar-progress-series.component';
import { ExampleChartChordSeriesComponent } from './example-chart-chord-series/examples-chart-chord-series.component';
import { ExampleChartCircularPackageSeriesComponent } from './example-chart-circular-package-series/examples-chart-circular-package-series.component';
import { ExampleChartDonutSeriesComponent } from './example-chart-donut-series/example-chart-donut-series.component';
import { ExampleChartDoubleDonutSeriesComponent } from './example-chart-double-donut-series/example-chart-double-donut-series.component';
import { ExampleChartHalfDonutSeriesComponent } from './example-chart-half-donut-series/example-chart-half-donut-series.component';
import { ExampleChartIcicleSeriesComponent } from './example-chart-icicle-series/example-chart-icicle-series.component';
import { ExampleChartLineSeriesComponent } from './example-chart-line-series/example-chart-line-series.component';
import { ExampleChartLineSeriesTypesComponent } from './example-chart-line-series-types/example-chart-line-series-types.component';
import { ExampleChartMatrixSeriesComponent } from './example-chart-matrix-series/example-chart-matrix-series.component';
import { ExampleChartPieSeriesComponent } from './example-chart-pie-series/example-chart-pie-series.component';
import { ExampleChartRadialTreeComponent } from './example-chart-radial-tree-series/example-chart-radial-tree-series..component';
import { ExampleChartSunburstSeriesComponent } from './example-chart-sunburst-series/example-chart-sunburst-series.component';
import { ExampleChartWordCloudSeriesComponent } from './example-chart-word-cloud-series/examples-chart-word-cloud-series.component';
import { ExampleChartMapSeriesComponent } from './example-chart-map-series/example-chart-map-series.component';
import { ExampleLeagueSimulationComponent } from './example-league-simulation/example-league-simulation.component';
import { ChartModule } from 'src/charts/chart/chart.module';
import { ChartAreaSeriesModule } from 'src/charts/area-series/area-series.module';
import { ChartBarProgressSeriesModule } from 'src/charts/bar-progress-series/bar-progress-series.module';
import { ChartBarSeriesModule } from 'src/charts/bar-series/bar-series.module';
import { ChartBarSimpleSeriesModule } from 'src/charts/bar-simple-series/bar-simple-series.module';
import { ChartBreadcrumbModule } from 'src/charts/breadcrumb/breadcrumb.module';
import { ChartPlotModule } from 'src/charts/chart-plot/chart-plot.module';
import { ChartPopupModule } from 'src/charts/chart-popup/chart-popup.module';
import { ChartTicksModule } from 'src/charts/chart-ticks/chart-ticks.module';
import { ChartChordSeriesModule } from 'src/charts/chord-series/chord-series.module';
import { ChartCircularPackageSeriesModule } from 'src/charts/circular-package-series/circular-package-series.module';
import { ChartDonutSeriesModule } from 'src/charts/donut-series/donut-series.module';
import { ChartDoubleDonutSeriesModule } from 'src/charts/double-donut-series/double-donut-series.module';
import { ChartGridSeriesModule } from 'src/charts/grid-series/grid-series.module';
import { ChartHalfDonutSeriesModule } from 'src/charts/half-donut-series/half-donut-series.module';
import { ChartIcicleSeriesModule } from 'src/charts/icicle-series/icicle-series.module';
import { ChartLineSeriesModule } from 'src/charts/line-series/line-series.module';
import { ChartMapSeriesModule } from 'src/charts/map-series/map-series.module';
import { ChartMatrixSeriesModule } from 'src/charts/matrix-series/matrix-series.module';
import { ChartPieSeriesModule } from 'src/charts/pie-series/pie-series.module';
import { ChartRadialTreeSeriesModule } from 'src/charts/radial-tree-series/radial-tree-series.module';
import { ChartRectSeriesModule } from 'src/charts/rect-series/rect-series.module';
import { ChartSunburstSeriesModule } from 'src/charts/sunburst-series/sunburst-series.module';
import { ChartWordCloudSeriesModule } from 'src/charts/word-cloud-series/word-cloud-series.module';
import { ChartXAxisModule } from 'src/charts/x-axis/x-axis.module';
import { ChartYAxisModule } from 'src/charts/y-axis/y-axis.module';

@NgModule({
  declarations: [
    ExampleChartAreaSeriesComponent,
    ExampleChartBarHorizontalSeriesComponent,
    ExampleChartBarVerticalSeriesComponent,
    ExampleChartBarSimpleSeriesComponent,
    ExampleChartBarProgressSeriesComponent,
    ExampleChartChordSeriesComponent,
    ExampleChartCircularPackageSeriesComponent,
    ExampleChartDonutSeriesComponent,
    ExampleChartDoubleDonutSeriesComponent,
    ExampleChartHalfDonutSeriesComponent,
    ExampleChartIcicleSeriesComponent,
    ExampleChartLineSeriesComponent,
    ExampleChartLineSeriesTypesComponent,
    ExampleChartMapSeriesComponent,
    ExampleChartMatrixSeriesComponent,
    ExampleChartPieSeriesComponent,
    ExampleChartRadialTreeComponent,
    ExampleChartSunburstSeriesComponent,
    ExampleChartWordCloudSeriesComponent,
    ExampleLeagueSimulationComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    ChartModule,
    ChartAreaSeriesModule,
    ChartBarProgressSeriesModule,
    ChartBarSeriesModule,
    ChartBarSimpleSeriesModule,
    ChartBreadcrumbModule,
    ChartPlotModule,
    ChartPopupModule,
    ChartTicksModule,
    ChartChordSeriesModule,
    ChartCircularPackageSeriesModule,
    ChartDonutSeriesModule,
    ChartDoubleDonutSeriesModule,
    ChartGridSeriesModule,
    ChartHalfDonutSeriesModule,
    ChartIcicleSeriesModule,
    ChartLineSeriesModule,
    ChartMapSeriesModule,
    ChartMatrixSeriesModule,
    ChartPieSeriesModule,
    ChartRadialTreeSeriesModule,
    ChartRectSeriesModule,
    ChartSunburstSeriesModule,
    ChartWordCloudSeriesModule,
    ChartXAxisModule,
    ChartYAxisModule,
  ],
  providers: [
    ExampleDataService,
  ],
})
export class ExampleChartsModule { }
