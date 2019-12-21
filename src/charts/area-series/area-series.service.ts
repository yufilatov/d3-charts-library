import { Injectable, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { nextId, getLineCurve } from '../kit';
import { IChartSeriesState, CHART_DEFAULT_SERIES_STATE, createScaleX, createScaleY } from '../common/chart-series';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartService } from '../chart/chart.service';
import { ChartStyle } from '../chart-style/chart-style';

export interface IChartAreaSeriesState extends IChartSeriesState {
    curveType?: string;
}

const DEFAULT_STATE: IChartAreaSeriesState = {
    ...CHART_DEFAULT_SERIES_STATE,
};

@Injectable()
export class ChartAreaSeriesService implements OnDestroy {

    private disposable = new ChartDisposable();
    private root: d3.Selection<SVGElement, string, SVGElement, number>;
    private state = {
        ...DEFAULT_STATE,
        id: `chart-series-area-${nextId()}`,
    };

    constructor(private chartService: ChartService) {
        const selector = { id: 'chart-series-area', level: 0 };
        this.root = chartService.select(selector);

        this.disposable.add(() => this.chartService.remove(selector));
    }

    setState(state: IChartAreaSeriesState): IChartAreaSeriesState {

        const scaleX = createScaleX('linear', {
            ...state as IChartSeriesState,
            data: [0, state.data.length - 1],
        });

        const scaleY = createScaleY('linear', {
            ...state as IChartSeriesState,
            data: [10, 0],
        });

        this.state = {
            ...this.state,
            ...state,
            scaleX,
            scaleY,
        };

        const { data, style, rect, curveType } = this.state;

        if (!rect.height || !rect.width) {
            return this.state;
        }

        const line = d3.line()
            .x((d, i) => scaleX(i))
            .y(d => scaleY(d))
            .curve(getLineCurve(curveType));

        const lineStyle = style.compile(ChartStyle.line);
        const circleStyle = style.compile(ChartStyle.circle);

        this.root.selectAll('path').remove();
        this.root.selectAll('circle').remove();

        this.root
            .append('path')
            .datum(data)
            .attr('d', line)
            .classed('line', true)
            .attr('fill', (d, i) => lineStyle(d, i).fill)
            .attr('stroke', (d, i) => lineStyle(d, i).stroke)
            .attr('stroke-width', (d, i) => lineStyle(d, i).strokeWidth);

        return this.state;
    }

    ngOnDestroy() {
        this.disposable.finalize();
    }
}
