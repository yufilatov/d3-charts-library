import { Component, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartComponent } from '../chart/chart.component';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { IChartMatrixOrderType, ChartMatrixSeriesService } from './matrix-series.service';

@Component({
  selector: 'app-chart-series[type="matrix"]',
  templateUrl: './matrix-series.component.html',
  styleUrls: ['./matrix-series.component.scss'],
  providers: [
    ChartMatrixSeriesService,
    ChartDisposable,
],
})
export class MatrixSeriesChartComponent implements OnChanges {
  private disposable = new ChartDisposable();

  @Input() data: { nodes: any[], links: any[] };
  @Input() style = new ChartStyleBuilder();
  @Input() labelOffset = 100;

  @Output() get onOrderChange() {
    return this.seriesService.onOrderChange;
  }

  @Input() set order(value: IChartMatrixOrderType) {
    this.seriesService.order = value;
  }

  get order() {
    return this.seriesService.order;
  }

  constructor(private chart: ChartComponent, private seriesService: ChartMatrixSeriesService) {
    const rectChange = chart.rectChange.subscribe(() => this.invalidate());
    this.disposable.add(() => rectChange.unsubscribe());

    this.chart.margin = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      this.invalidate();
    }
  }

  private invalidate() {
    this.seriesService.setState({
      data: this.data,
      labelOffset: this.labelOffset,
      style: this.style,
      rect: this.chart.rect,
      margin: this.chart.margin,
    });
  }

}
