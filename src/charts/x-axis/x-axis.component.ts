import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartXAxisService } from './x-axis.service';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartComponent } from '../chart/chart.component';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';

@Component({
    selector: 'app-chart-x-axis',
    template: '',
    styleUrls: ['./x-axis.component.scss'],
    providers: [
        ChartXAxisService,
        ChartDisposable,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:use-view-encapsulation
    encapsulation: ViewEncapsulation.None,
})
export class XAxisChartComponent implements OnChanges {
    private disposable = new ChartDisposable();

    @Input() range: any[];
    @Input() style = new ChartStyleBuilder();
    @Input() ticks: number[] = [];

    constructor(private chart: ChartComponent, private seriesService: ChartXAxisService) {
        const rectChange = chart.rectChange.subscribe(() => this.invalidate());
        this.disposable.add(() => rectChange.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('range' in changes) {
            this.invalidate();
        }
    }

    private invalidate() {
        this.seriesService.setState({
            range: this.range,
            style: this.style,
            rect: this.chart.rect,
            margin: this.chart.margin,
            ticks: this.ticks
        });
    }
}
