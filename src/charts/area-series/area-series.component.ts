import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartComponent } from '../chart/chart.component';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { AreaSeriesChartService } from './area-series.service';

@Component({
    selector: 'app-chart-series[type="area"]',
    template: '',
    styleUrls: ['./area-series.component.scss'],
    providers: [
        AreaSeriesChartService,
        ChartDisposable,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:use-view-encapsulation
    encapsulation: ViewEncapsulation.None,
})
export class AreaSeriesChartComponent implements OnChanges {
    @Input() curveType = 'curveMonotoneX';
    @Input() data: any[];
    @Input() range: { x: number[], y: number[] } = { x: [], y: [] };
    @Input() style = new ChartStyleBuilder();

    constructor(
        private chart: ChartComponent,
        private disposable: ChartDisposable,
        private seriesService: AreaSeriesChartService,
    ) {
        const rectChange = chart.rectChange.subscribe(() => this.invalidate());

        this.disposable.add(() => rectChange.unsubscribe());
    }

    ngOnChanges() {
        this.invalidate();
    }

    private invalidate() {
        const state = this.seriesService.setState({
            data: this.data || [],
            style: this.style,
            range: this.range,
            curveType: this.curveType,
            rect: this.chart.rect,
            margin: this.chart.margin,
        });

        this.chart.addSeries(state);
        this.disposable.add(() => this.chart.removeSeries(state));
    }
}
