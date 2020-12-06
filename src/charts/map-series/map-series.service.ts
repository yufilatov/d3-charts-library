import { Injectable, EventEmitter } from '@angular/core';
import { nextId } from '../kit';
import { IChartSeriesState, CHART_DEFAULT_SERIES_STATE } from '../common/chart-series';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartService } from '../chart/chart.service';
import { ChartStyle } from '../chart-style/chart-style';
import { ChartDrawFactory } from '../common/chart-draw.factory';
import { DATA } from './germany';
import * as d3 from 'd3';

const DEFAULT_STATE: IChartSeriesState = {
    ...CHART_DEFAULT_SERIES_STATE,
};

@Injectable()
export class MapSeriesChartService {
    private root: d3.Selection<SVGElement, string, SVGElement, number>;
    private state = {
        ...DEFAULT_STATE,
        id: `chart-series-map-germany-${nextId()}`,
    };

    mouseover = new EventEmitter<any>();
    mouseleave = new EventEmitter<any>();

    constructor(
        private chartService: ChartService,
        private disposable: ChartDisposable,
    ) {
        const selector = { id: this.state.id, level: 0 };
        this.root = chartService.select(selector);

        this.disposable.add(() => this.chartService.remove(selector));
    }

    setState(state: IChartSeriesState) {
        const { rect, style } = state;

        if (!rect.height || !rect.width) {
            return;
        }

        this.root.selectAll('path').remove();

        const bounds = d3.geoBounds(DATA);
        const bottomLeft = bounds[0];
        const topRight = bounds[1];
        const rotLong = -(topRight[0] + bottomLeft[0]) / 2;
        const center = [(topRight[0] + bottomLeft[0]) / 2 + rotLong, (topRight[1] + bottomLeft[1]) / 2];

        let projection = d3.geoAlbers()
            .parallels([bottomLeft[1], topRight[1]])
            .rotate([rotLong, 0, 0])
            .translate([rect.width / 2, rect.height / 2])
            .center(center);

        const bottomLeftPx = projection(bottomLeft);
        const topRightPx = projection(topRight);
        const scaleFactor = 1.00 * Math.min(rect.width / (topRightPx[0] - bottomLeftPx[0]), rect.height / (-topRightPx[1] + bottomLeftPx[1]));

        projection = d3.geoAlbers()
            .parallels([bottomLeft[1], topRight[1]])
            .rotate([rotLong, 0, 0])
            .translate([rect.width / 2, rect.height / 2])
            .scale(scaleFactor * 0.975 * 1000)
            .center(center);

        const path = d3.geoPath()
            .projection(projection);

        const datum = DATA.features;

        const pathStyle = style.compile(ChartStyle.arc);

        const draw = ChartDrawFactory(this.root, datum);

        draw(`.chart-map-series-land-${nextId()}`, {
            create: selection =>
                selection
                    .append('path'),
            update: selection =>
                selection
                    .attr('d', path)
                    .attr('chart-map-selector-hover', true)
                    .classed('chart-map-series-land', true)
                    .attr('fill', (d, i) => pathStyle(d, i).fill)
                    .attr('stroke-width', (d, i) => pathStyle(d, i).strokeWidth)
                    .attr('stroke', (d, i) => pathStyle(d, i).stroke)
                    .on('mouseover', (d, i) => {
                        this.root
                            .selectAll('.chart-map-series-land')
                            .filter(a => a === d)
                            .transition()
                            .delay(100)
                            .attr('fill', pathStyle(d, i).fillHover);

                        this.mouseover.emit(d);
                    })
                    .on('mouseleave', (d, i) => {
                        this.root
                            .selectAll('.chart-map-series-land')
                            .filter(a => a === d)
                            .transition()
                            .delay(100)
                            .attr('fill', pathStyle(d, i).fill);

                        this.mouseleave.emit();
                    }),
        });
    }
}
