import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartYAxisService } from './y-axis.service';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartComponent } from '../chart/chart.component';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';

@Component({
    selector: 'app-chart-y-axis',
    template: '',
    styleUrls: ['./y-axis.component.scss'],
    providers: [
        ChartYAxisService,
        ChartDisposable,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // tslint:disable-next-line:use-view-encapsulation
    encapsulation: ViewEncapsulation.None,
})
export class YAxisChartComponent implements OnChanges {
    private disposable = new ChartDisposable();

    @Input() range: any[];
    @Input() ticks: number[] = [];
    @Input() style = new ChartStyleBuilder();
    @Input() reverse = false;

    constructor(private chart: ChartComponent, private seriesService: ChartYAxisService) {
        const rectChange = chart.rectChange.subscribe(() => this.invalidate());
        this.disposable.add(() => rectChange.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('range' || 'reverse' in changes) {
            this.invalidate();
        }
    }

    private invalidate() {
        this.seriesService.setState({
            range: this.range,
            style: this.style,
            rect: this.chart.rect,
            margin: this.chart.margin,
            ticks: this.ticks,
            reverse: this.reverse
        });
    }
}
