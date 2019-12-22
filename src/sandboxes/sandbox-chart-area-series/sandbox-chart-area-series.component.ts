import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';

@Component({
    selector: 'app-sandbox-chart-area',
    templateUrl: './sandbox-chart-area-series.component.html',
    styleUrls: ['./sandbox-chart-area-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxChartAreaSeriesComponent implements OnInit {

    data = [0, 2, 4, 5, 6, 1, 2, 3, 7, 5, 4, 3, 1, 6, 6, 5, 0];

    goals = [63, 62, 85, 59, 83];
    points = [72, 70, 93, 50, 87];
    margin = { left: 30, top: 10, right: 10, bottom: 40 };

    ticksX = [];
    ticksY = [];
    range = {
        x: [1992, 2019],
        y: [105, 0],
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
        for (let i = 1992; i < 2020; i++) {
            this.ticksX.push(i);
        }

        for (let i = 5; i < 110; i = i + 5) {
            this.ticksY.push(i);
        }
    }

}
