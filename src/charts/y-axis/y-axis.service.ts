import { Injectable, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { nextId } from '../kit';
import { IChartSeriesState, CHART_DEFAULT_SERIES_STATE, createScaleY } from '../common/chart-series';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartService } from '../chart/chart.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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
    private state = {
        ...DEFAULT_STATE
    }

    constructor(private chartService: ChartService) {
        const selector = { id: `chart-y-axis-${nextId()}`, level: 0 };
        this.root = chartService.select(selector);

        this.disposable.add(() => this.chartService.remove(selector));
    }

    setState(state: IChartYAxisState): IChartYAxisState {
        this.state = {
            ...this.state,
            ...state,
        }
        const { rect, range, margin, ticks, reverse } = this.state;

        if (!rect.height || !rect.width) {
            return this.state;
        }

        this.root.selectAll('.axis').remove();

        const scaleY = createScaleY('linear', {
            ...state,
            data: [100, 0],
        });

        const y = d3.axisLeft()
            .scale(scaleY)
            .tickSizeOuter(0)
            .tickValues(ticks);

        this.root
            .append('g')
            .classed('axis', true)
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(y);

        return this.state;
    }

    ngOnDestroy() {
        this.disposable.finalize();
    }

    getRange(reverse, rect) {
        return reverse ? [rect.height, 0] : [0, rect.height];
    }
}
