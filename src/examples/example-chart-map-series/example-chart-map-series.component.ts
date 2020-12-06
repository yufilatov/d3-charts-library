import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { convertUmlauts } from 'src/charts/kit';
import * as d3 from 'd3';

@Component({
    selector: 'app-example-chart-map',
    templateUrl: './example-chart-map-series.component.html',
    styleUrls: [
        './example-chart-map-series.component.scss',
        '../../styles/germany-lands-logos.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleChartMapSeriesComponent {
    show = false;
    turbo;

    color = d3.scaleLinear()
        .domain([2000000, 18000000])
        .range(['#c1a166', '#4c3100']);

    style = new ChartStyleBuilder()
        .for(ChartStyle.arc, (d, i) => {

            return { fill: this.color(d.properties.population), strokeWidth: 1, stroke: '#000000', fillHover: '#006666' };
        });

    showData(data) {
        this.show = true;
        this.turbo = data;
    }

    getLogo(name) {
        return name ? `logo logo-${convertUmlauts(name.toLowerCase().replace(/\s+/g, '-'))}` : '';
    }

    getLogoBig(name) {
        return name ? `logo-big logo-${convertUmlauts(name.toLowerCase().replace(/\s+/g, '-'))}` : '';
    }
}
