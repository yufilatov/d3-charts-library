import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { ChartComponent } from '../chart/chart.component';
import { ChartBarSeriesService } from './bar-series.service';
import { ChartDisposable } from '../common/chart-disposable';

@Component({
  selector: 'app-chart-series[type="bar"]',
  templateUrl: './bar-series.component.html',
  styleUrls: ['./bar-series.component.scss'],
  providers: [
    ChartBarSeriesService,
    ChartDisposable,
]
})
export class BarSeriesChartComponent {
  @Input() data: any[];
  @Input() style = new ChartStyleBuilder();
  @Input() total = 100;
  @Input() animation = false;

  constructor(
    private chart: ChartComponent,
    private seriesService: ChartBarSeriesService,
    private disposable: ChartDisposable,
  ) {
    const rectChange = chart.rectChange.subscribe(() => this.invalidate());
    this.disposable.add(() => rectChange.unsubscribe());
  }

  private invalidate() {
    const state = this.seriesService.setState({
      data: this.data || [],
      style: this.style,
      rect: this.chart.rect,
      margin: this.chart.margin,
      total: this.total,
      animation: this.animation
    });

    this.chart.addSeries(state);
    this.disposable.add(() => this.chart.removeSeries(state));
  }
}
