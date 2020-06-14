import { Injectable } from '@angular/core';
import { nextId, getLineCurve } from '../kit';
import { ChartService } from '../chart/chart.service';
import { ChartDisposable } from '../common/chart-disposable';
import { IChartPieSeriesState } from '../line-series/line-series.service';
import { createScaleX, IChartSeriesState, createScaleY, CHART_DEFAULT_SERIES_STATE } from '../common/chart-series';
import { ChartStyle } from '../chart-style/chart-style';
import { ChartDrawFactory } from '../common/chart-draw.factory';
import * as d3 from 'd3';

const DEFAULT_STATE: IChartSeriesState = {
    ...CHART_DEFAULT_SERIES_STATE,
};

@Injectable()
export class CircularPackageSeriesService {
    private root: d3.Selection<SVGElement, string, SVGElement, number>;
    private state = {
        ...DEFAULT_STATE,
        id: `chart-series-circular-package-${nextId()}`,
    };

    constructor(
        private chartService: ChartService,
        private disposable: ChartDisposable,
    ) {
        const selector = { id: this.state.id, level: 0 };

        this.root = chartService.select(selector);
        this.disposable.add(() => this.chartService.remove(selector));
    }

    setState(state: IChartPieSeriesState) {
        this.state = {
            ...this.state,
            ...state,
        };

        const { style, rect, data } = this.state;

        if (!rect.height || !rect.width) {
            return this.state;
        }

        this.root.selectAll('circle').remove();

        const datum = data;

        const color = d3.scaleOrdinal()
            .domain(['Asia', 'Europe', 'Africa', 'Oceania', 'Americas'])
            .range(d3.schemeSet1);

        const size = d3.scaleLinear()
            .domain([0, 1400000000])
            .range([10, 50]);

        const simulation = d3.forceSimulation()
            .force('center', d3
                .forceCenter()
                .x(rect.width / 2)
                .y(rect.height / 2))
            .force('charge', d3
                .forceManyBody()
                .strength(.1))
            .force('collide', d3
                .forceCollide()
                .strength(.2)
                .radius(d => (size(d.value) + 2.5))
                .iterations(2));

        const dragStarted = (d) => {
            if (!d3.event.active) {
                simulation.alphaTarget(.03).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        };

        const dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        const dragEnded = (d) => {
            if (!d3.event.active) {
                simulation.alphaTarget(.03);
            }
            d.fx = null;
            d.fy = null;
        };

        const draw = ChartDrawFactory(this.root, datum);
        draw('.chart-circular-package-circle', {
            create: selection =>
                selection
                    .append('circle'),
            update: selection =>
                selection
                    .attr('class', 'node')
                    .attr('r', d => size(d.value))
                    .attr('cx', rect.width / 2)
                    .attr('cy', rect.height / 2)
                    .style('fill', d => color(d.region))
                    .style('fill-opacity', 0.8)
                    .attr('stroke', 'black')
                    .style('stroke-width', 1)
                    .call(d3.drag()
                        .on('start', dragStarted)
                        .on('drag', dragged)
                        .on('end', dragEnded)),
        });

        simulation
            .nodes(datum)
            .on('tick', () => {
                this.root.selectAll('.node')
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);
            });

        return this.state;
    }
}
