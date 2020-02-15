import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { IChartArcStyle, ChartStyle } from 'src/charts/chart-style/chart-style';
import { DATA } from './data';

@Component({
    selector: 'app-sandbox-chart-double-donut',
    templateUrl: './sandbox-chart-double-donut-series.component.html',
    styleUrls: ['./sandbox-chart-double-donut-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxChartDoubleDonutSeriesComponent {

    data = DATA;
    counter = 0;

    style =
        new ChartStyleBuilder()
            .for(ChartStyle.arc, (d, i) => {
                const colors = ['#94c31a', '#bedb75', '#f7a704', '#faca68'];
                const fill = colors[this.counter];
                this.counter = this.counter < 3 ? this.counter + 1 : 0;

                return { fill, strokeWidth: 2 };
            })
            .for(ChartStyle.pie, () => {
                return { innerRadius: 70 };
            });
}
