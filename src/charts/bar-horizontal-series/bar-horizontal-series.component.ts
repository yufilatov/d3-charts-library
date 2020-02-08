import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { ChartComponent } from '../chart/chart.component';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartBarHorizontalSeriesService } from './bar-horizontal-series.service';

@Component({
  selector: 'app-chart-series[type="bar-horizontal"]',
  templateUrl: './bar-horizontal-series.component.html',
  styleUrls: ['./bar-horizontal-series.component.scss'],
  providers: [
    ChartBarHorizontalSeriesService,
    ChartDisposable,
]
})
export class BarHorizontalSeriesChartComponent implements OnChanges {
  @Input() data: any[];
  @Input() style = new ChartStyleBuilder();
  @Input() total = 100;
  @Input() animation = false;

  constructor(
    private chart: ChartComponent,
    private seriesService: ChartBarHorizontalSeriesService,
    private disposable: ChartDisposable,
  ) {
    const rectChange = chart.rectChange.subscribe(() => this.invalidate());
    this.disposable.add(() => rectChange.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    const marginChange = changes.margin;
    const dataChange = changes.data;

    if (marginChange || dataChange) {
      this.invalidate();
    }
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
