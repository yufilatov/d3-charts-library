import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { IChartArcStyle, ChartStyle } from 'src/charts/chart-style/chart-style';
import { DATA } from './data';

@Component({
    selector: 'app-sandbox-chart-pie',
    templateUrl: './sandbox-chart-pie-series.component.html',
    styleUrls: ['./sandbox-chart-pie-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxChartPieSeriesComponent {

    data = DATA;

    style =
        new ChartStyleBuilder()
            .for(ChartStyle.arc, (d, i) => {
                const colors = ['#709a28', '#f7a704', '#c23612'];

                return { fill: colors[i], strokeWidth: 2 };
            });

}
