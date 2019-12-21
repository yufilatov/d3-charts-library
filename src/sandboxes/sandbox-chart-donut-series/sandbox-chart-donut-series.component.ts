import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { IChartArcStyle, ChartStyle } from 'src/charts/chart-style/chart-style';
import { DATA } from './data';

@Component({
    selector: 'app-sandbox-chart-donut',
    templateUrl: './sandbox-chart-donut-series.component.html',
    styleUrls: ['./sandbox-chart-donut-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxChartDonutSeriesComponent {

    data = DATA;

    style =
        new ChartStyleBuilder()
            .for(ChartStyle.arc, (d, i) => {
                const colors = ['#709a28', '#f7a704', '#c23612'];

                return { fill: colors[i], strokeWidth: 2 };
            })
            .for(ChartStyle.pie, () => {
                return { innerRadius: 70 };
            });
}
