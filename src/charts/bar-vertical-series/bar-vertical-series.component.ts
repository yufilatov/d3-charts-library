import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { ChartComponent } from '../chart/chart.component';
import { ChartBarVerticalSeriesService } from './bar-vertical-series.service';
import { ChartDisposable } from '../common/chart-disposable';

@Component({
  selector: 'app-chart-series[type="bar-vertical"]',
  templateUrl: './bar-vertical-series.component.html',
  styleUrls: ['./bar-vertical-series.component.scss'],
  providers: [
    ChartBarVerticalSeriesService,
    ChartDisposable,
  ]
})
export class BarVerticalSeriesChartComponent implements OnChanges {
  @Input() data: any[];
  @Input() style = new ChartStyleBuilder();
  @Input() range: { x: number[], y: number[] } = { x: [0, 100], y: [0, 100] };
  @Input() total = 100;
  @Input() animation = false;

  constructor(
    private chart: ChartComponent,
    private seriesService: ChartBarVerticalSeriesService,
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
      range: this.range,
      total: this.total,
      animation: this.animation
    });

    this.chart.addSeries(state);
    this.disposable.add(() => this.chart.removeSeries(state));
  }
}
