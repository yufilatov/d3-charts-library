import { Injectable, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { nextId } from '../kit';
import { IChartSeriesState, CHART_DEFAULT_SERIES_STATE } from '../common/chart-series';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartService } from '../chart/chart.service';
import { ChartStyle } from '../chart-style/chart-style';
import { ChartDrawFactory } from '../common/chart-draw.factory';

export interface IChartXAxisState extends IChartSeriesState {
    range?: any[];
    ticks?: number[];
}

const DEFAULT_STATE: IChartXAxisState = {
    ...CHART_DEFAULT_SERIES_STATE,
};

@Injectable()
export class ChartXAxisService implements OnDestroy {

    private disposable = new ChartDisposable();
    private root: d3.Selection<SVGElement, string, SVGElement, number>;

    constructor(private chartService: ChartService) {
        const selector = { id: `chart-x-axis-${nextId()}`, level: 0 };
        this.root = chartService.select(selector);

        this.disposable.add(() => this.chartService.remove(selector));
    }

    setState(state: IChartXAxisState) {
        const { rect, range, margin, ticks } = state;

        if (!rect.height || !rect.width) {
            return;
        }

        this.root.selectAll('.axis').remove();

        const scaleX = d3.scaleLinear()
            .domain([d3.min(range), d3.max(range)])
            .range([0, rect.width]);

        const x = d3.axisBottom()
            .scale(scaleX)
            .tickValues(ticks)
            .tickFormat((d) => d3.format('.0f')(d));

        this.root
            .append('g')
            .classed('axis', true)
            .attr('transform', `translate(${margin.left}, ${rect.height})`)
            .call(x);

    }

    ngOnDestroy() {
        this.disposable.finalize();
    }
}
