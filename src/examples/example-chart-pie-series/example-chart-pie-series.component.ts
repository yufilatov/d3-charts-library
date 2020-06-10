import { DATA } from './data';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-example-chart-pie',
    templateUrl: './example-chart-pie-series.component.html',
    styleUrls: ['./example-chart-pie-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleChartPieSeriesComponent {
    data = DATA;

    style = new ChartStyleBuilder()
        .for(ChartStyle.arc, (d, i) => {
            const colors = ['#709a28', '#f7a704', '#c23612'];

            return { fill: colors[i], strokeWidth: 2 };
        });
}
