import { Injectable, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { nextId } from '../kit';
import { IChartSeriesState, CHART_DEFAULT_SERIES_STATE } from '../common/chart-series';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartService } from '../chart/chart.service';

export interface IChartYAxisState extends IChartSeriesState {
    range?: any[];
    ticks?: number[];
    reverse?: boolean;
}

const DEFAULT_STATE: IChartYAxisState = {
    ...CHART_DEFAULT_SERIES_STATE,
};

@Injectable()
export class ChartYAxisService implements OnDestroy {

    private disposable = new ChartDisposable();
    private root: d3.Selection<SVGElement, string, SVGElement, number>;

    constructor(private chartService: ChartService) {
        const selector = { id: `chart-y-axis-${nextId()}`, level: 0 };
        this.root = chartService.select(selector);

        this.disposable.add(() => this.chartService.remove(selector));
    }

    setState(state: IChartYAxisState) {
        const { rect, range, margin, ticks, reverse } = state;

        if (!rect.height || !rect.width) {
            return;
        }

        this.root.selectAll('.axis').remove();

        const scaleY = d3.scaleLinear()
            .domain([0, d3.max(range)])
            .range(this.getRange(reverse, rect));

        const y = d3.axisLeft()
            .scale(scaleY)
            .tickValues(ticks);

        this.root
            .append('g')
            .classed('axis', true)
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(y);
    }

    ngOnDestroy() {
        this.disposable.finalize();
    }

    getRange(reverse, rect) {
        return reverse ? [0, rect.height] : [rect.height, 0];
    }
}
