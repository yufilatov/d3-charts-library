import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartRectSeriesService } from './rect-series.service';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartComponent } from '../chart/chart.component';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { range } from 'rxjs';

@Component({
    selector: 'app-chart-series[type="rect"]',
    template: '',
    styleUrls: ['./rect-series.component.scss'],
    providers: [
        ChartRectSeriesService,
        ChartDisposable,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:use-view-encapsulation
    encapsulation: ViewEncapsulation.None,
})
export class RectSeriesChartComponent implements OnChanges {
    private disposable = new ChartDisposable();

    @Input() data: any[];
    @Input() style = new ChartStyleBuilder();
    @Input() total: number;
    @Input() range: { x: number[], y: number[] };

    constructor(private chart: ChartComponent, private seriesService: ChartRectSeriesService) {
        const rectChange = chart.rectChange.subscribe(() => this.invalidate());
        this.disposable.add(() => rectChange.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('data' in changes) {
            this.invalidate();
        }
    }

    private invalidate() {
        this.seriesService.setState({
            data: this.data,
            style: this.style,
            total: this.total,
            rect: this.chart.rect,
            margin: this.chart.margin,
            range: this.range,
        });
    }
}
