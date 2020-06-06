import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { ChartComponent } from '../chart/chart.component';
import { ChartBarSimpleSeriesService } from './bar-simple-series.service';
import { ChartDisposable } from '../common/chart-disposable';

@Component({
  selector: 'app-chart-series[type="bar-simple"]',
  templateUrl: './bar-simple-series.component.html',
  styleUrls: ['./bar-simple-series.component.scss'],
  providers: [
    ChartDisposable,
    ChartBarSimpleSeriesService,
  ],
})
export class BarSimpleSeriesChartComponent implements OnChanges {
  @Input() data: any[];
  @Input() style = new ChartStyleBuilder();
  @Input() total = 100;
  @Input() animation = false;

  constructor(
    private chart: ChartComponent,
    private seriesService: ChartBarSimpleSeriesService,
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
      animation: this.animation,
    });

    this.chart.addSeries(state);
    this.disposable.add(() => this.chart.removeSeries(state));
  }
}
