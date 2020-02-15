import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { SandboxDataService } from '../sandbox-dataservice';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-example-chart-area',
    templateUrl: './example-chart-area-series.component.html',
    styleUrls: ['./example-chart-area-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleChartAreaSeriesComponent implements OnInit {
    constructor(private dataService: SandboxDataService) { }
    data$: Observable<any>
    data = [[1996, 10], [2000, 29], [2019, 0]];

    margin = { left: 30, top: 10, right: 10, bottom: 40 };

    ticksX = [];
    ticksY = [];
    range = {
        x: [1995, 2020],
        y: [100, 0],
    };

    style =
        new ChartStyleBuilder()
            .for(ChartStyle.circle, (d, i) => {
                const fill = d > 5 ? '#709a28' : d > 2 ? '#f7a704' : '#c23612';

                return { fill };
            })
            .for(ChartStyle.line, (d, i) => {

                return { stroke: 'steelblue', strokeWidth: 2 };
            });

    ngOnInit() {
        this.data$ = this.dataService
            .getHistoryData()
            .pipe(
                map(clubs => clubs[0].points.map((x, i) => [i + 1996, x])));

        for (let i = 1995; i < 2021; i++) {
            this.ticksX.push(i);
        }

        for (let i = 5; i < 110; i = i + 5) {
            this.ticksY.push(i);
        }
    }

}
