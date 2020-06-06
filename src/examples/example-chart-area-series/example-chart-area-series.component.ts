import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ExampleDataService } from '../example-data-service';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
    selector: 'app-example-chart-area',
    templateUrl: './example-chart-area-series.component.html',
    styleUrls: [
        './example-chart-area-series.component.scss',
        '../../styles/epl-emblems.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleChartAreaSeriesComponent implements OnInit {
    constructor(private dataService: ExampleDataService) { }

    data$: Observable<any>;

    margin = { left: 30, top: 10, right: 15, bottom: 40 };

    ticksX = [];
    ticksY = [];
    range = {
        x: [1996, 2019],
        y: [0, 100],
    };

    style =
        new ChartStyleBuilder()
            .for(ChartStyle.circle, () => {
                return { fill: '#ffdd00', radius: 5, stroke: '#000000' };
            })
            .for(ChartStyle.line, () => {
                return { fill: '#034694', strokeWidth: 0 };
            });

    ngOnInit() {
        this.data$ = this.dataService
            .getHistoryData()
            .pipe(
                map(clubs => clubs[0].points.map((x, i) => [i + 1996, x])));

        for (let i = 1995; i < 2020; i++) {
            this.ticksX.push(i);
        }

        for (let i = 5; i < 110; i = i + 5) {
            this.ticksY.push(i);
        }
    }
}
