import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { DATA } from './data';
import * as d3 from 'd3';

@Component({
    selector: 'app-sandbox-chart-icicle',
    templateUrl: './sandbox-chart-icicle-series.component.html',
    styleUrls: ['./sandbox-chart-icicle-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxChartIcicleSeriesComponent {

    data = DATA;
    color = d3.scaleOrdinal(d3.schemeCategory10);

    style =
        new ChartStyleBuilder()
            .for(ChartStyle.cell, d => {
                let fill;

                while (d.depth > 1) {
                    d = d.parent;
                }
                fill = this.color(d.data.name);

                return { fill };
            })
            .for(ChartStyle.label, d => {

                const text = `${d.data.name}: ${d.value}`;

                return { text };
            });

}
