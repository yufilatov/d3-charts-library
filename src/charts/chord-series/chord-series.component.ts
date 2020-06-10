import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { ChartComponent } from '../chart/chart.component';
import { ChordSeriesChartService } from './chord-series.service';

@Component({
    selector: 'app-chart-series[type="chord"]',
    templateUrl: './chord-series.component.html',
    styleUrls: ['./chord-series.component.scss'],
    providers: [
        ChartDisposable,
        ChordSeriesChartService,
    ],
})
export class ChordSeriesChartComponent implements OnChanges {
    @Input() data: any[];
    @Input() style = new ChartStyleBuilder();

    constructor(
        private chart: ChartComponent,
        private seriesService: ChordSeriesChartService,
        private disposable: ChartDisposable,
    ) {
        const rectChange = chart.rectChange.subscribe(() => this.invalidate());

        this.disposable.add(() => rectChange.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data) {
            this.invalidate();
        }
    }

    private invalidate() {
        this.seriesService.setState({
            data: this.data,
            style: this.style,
            rect: this.chart.rect,
            margin: this.chart.margin,
        });
    }
}
