import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartAreaSeriesService } from './area-series.service';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartComponent } from '../chart/chart.component';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';

@Component({
    selector: 'app-chart-series[type="area"]',
    template: '',
    styleUrls: ['./area-series.component.scss'],
    providers: [
        ChartAreaSeriesService,
        ChartDisposable,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:use-view-encapsulation
    encapsulation: ViewEncapsulation.None,
})
export class AreaSeriesChartComponent implements OnChanges {
    private disposable = new ChartDisposable();

    @Input() data: any[];
    @Input() style = new ChartStyleBuilder();
    @Input() curveType = 'curveCardinal (tension=0)';

    constructor(private chart: ChartComponent, private seriesService: ChartAreaSeriesService) {
        const rectChange = chart.rectChange.subscribe(() => this.invalidate());
        this.disposable.add(() => rectChange.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges) {
        this.invalidate();
    }

    private invalidate() {
        const state = this.seriesService.setState({
            data: this.data || [],
            style: this.style,
            curveType: this.curveType,
            rect: this.chart.rect,
            margin: this.chart.margin,
        });

        this.chart.addSeries(state);
        this.disposable.add(() => this.chart.removeSeries(state));
    }
}
