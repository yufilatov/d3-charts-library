import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { PieSeriesChartService } from './pie-series.service';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartComponent } from '../chart/chart.component';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';

@Component({
    selector: 'app-chart-series[type="pie"]',
    template: '',
    styleUrls: ['./pie-series.component.scss'],
    providers: [
        PieSeriesChartService,
        ChartDisposable,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:use-view-encapsulation
    encapsulation: ViewEncapsulation.None,
})
export class PieSeriesChartComponent {
    @Input() data: any[];
    @Input() style = new ChartStyleBuilder();
    @Input() total: number;

    constructor(
        private chart: ChartComponent,
        private seriesService: PieSeriesChartService,
        private disposable: ChartDisposable,
    ) {
        const rectChange = chart.rectChange.subscribe(() => this.invalidate());

        this.disposable.add(() => rectChange.unsubscribe());
    }

    private invalidate() {
        this.seriesService.setState({
            data: this.data,
            style: this.style,
            total: this.total,
            rect: this.chart.rect,
            margin: this.chart.margin,
        });
    }
}
