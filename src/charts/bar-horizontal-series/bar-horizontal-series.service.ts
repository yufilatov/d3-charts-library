import { Injectable, OnDestroy } from '@angular/core';
import { IChartSeriesState, CHART_DEFAULT_SERIES_STATE, createScaleX, createScaleY } from '../common/chart-series';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartService } from '../chart/chart.service';
import { nextId } from '../kit';
import { ChartDrawFactory } from '../common/chart-draw.factory';
import { ChartStyle } from '../chart-style/chart-style';
import * as d3 from 'd3';

export interface IChartBarSeriesState extends IChartSeriesState {
  total?: number;
  animation?: boolean;
}

const DEFAULT_STATE: IChartBarSeriesState = {
  ...CHART_DEFAULT_SERIES_STATE,
  type: 'bar',
  total: 100,
};

@Injectable()
export class ChartBarHorizontalSeriesService implements OnDestroy {

  private disposable = new ChartDisposable();
  private root: d3.Selection<SVGElement, string, SVGElement, number>;
  private state = {
    ...DEFAULT_STATE,
    id: `chart-series-bar-${nextId()}`,
  };

  constructor(private chartService: ChartService) {
    const selector = { id: this.state.id, level: 0 };
    this.root = chartService.select(selector);
    this.root.classed('chart-series-bar', true);

    this.disposable.add(() => this.chartService.remove(selector));
  }

  setState(state: IChartBarSeriesState): IChartBarSeriesState {
    this.state = {
      ...this.state,
      ...state,
    };

    const { data, style, animation, total } = this.state;

    const scaleX = createScaleX('linear', {
      ...state as IChartSeriesState,
      data: [0, total],
    });

    const scaleY = createScaleY('band', {
      ...state as IChartSeriesState,
    });

    this.state = {
      ...this.state,
      ...state,
      scaleX,
      scaleY,
    };

    const barStyle = style.compile(ChartStyle.bar);
    const labelStyle = style.compile(ChartStyle.label);
    const animationStyle = style.compile(ChartStyle.animation);

    let draw;
    const format = d3.format(animationStyle(null, 0).format);

    // draw('.kf-chart-bar-vertical', {
    //   create: selection =>
    //     selection
    //       .append('rect'),
    //   update: selection =>
    //     selection
    //       .attr('width', scaleX(total) - scaleX(0))
    //       .attr('height', (d, i) => barStyle(d, i).height)
    //       .attr('vertical-align', 'middle')
    //       .attr('x', scaleX(0))
    //       .attr('y', (d, i) => scaleY(i))
    //       .attr('fill', (d, i) => barStyle(d, i).background),
    // });

    for (let i = 0; i < data.length; i++) {
      draw = ChartDrawFactory(this.root, data[i]);
      draw(`.kf-chart-bar-value-${nextId()}`, {
        create: selection =>
          selection
            .append('rect'),
        update: selection =>
          selection
            .classed('animated-bar', true)
            .attr('width', d => animation ? 0 : scaleX(d) - scaleX(0))
            .attr('height', (d, c) => barStyle(d, c).size)
            .attr('transform', (d, c) => {
              let previous = 0;
              for (let j = 0; j < c; j++) {
                previous = previous + data[i][j];
              }
              return `translate(${c > 0 ? scaleX(previous) - scaleX(0) : 0} ,${-barStyle(d, i).size / 2})`;
            })
            .attr('x', scaleX(0))
            .attr('y', (d, c) => scaleY(i))
            .attr('fill', (d, c) => barStyle(d, c).fill)
      });
    }


    // if (label !== 'none') {
    //   draw('.kf-chart-label', {
    //     create: selection =>
    //       selection
    //         .append('text'),
    //     update: selection =>
    //       selection
    //         .attr('x', () => {
    //           if (label === 'start') {
    //             return scaleX(0) - 10;
    //           } return scaleX(total) + 10;
    //         })
    //         .attr('y', (d, i) => scaleY(i) + scaleY(0) / 2)
    //         .style('text-anchor', () => {
    //           if (label === 'start') {
    //             return 'end';
    //           } return 'start';
    //         })
    //         .attr('vertical-align', 'middle')
    //         .attr('font-size', (d, i) => labelStyle(d, i).fontSize)
    //         .attr('fill', (d, i) => labelStyle(d, i).color)
    //         .attr('font-weight', (d, i) => labelStyle(d, i).fontWeight)
    //         .attr('transform', (d, i) => {
    //           if (labelStyle(d, i).padding !== null) {
    //             return `translate(${-scaleX(total) - 10 + scaleX(d) + labelStyle(d, i).padding}, 0)`;
    //           }
    //         })
    //         .text((d, i) => animation ? format(0) : labelStyle(d, i).text),
    //   });
    // }

    if (animation) {

      this.root.selectAll('.animated-bar')
        .transition()
        .duration((d, i) => animationStyle(d, i).duration)
        .attr('width', d => scaleX(d) - scaleX(0))
        .delay((d, i) => animationStyle(d, i).delay);

      this.root.selectAll('text')
        .transition()
        .duration((d, i) => animationStyle(d, i).duration)
        .delay((d, i) => animationStyle(d, i).delay)
        .on('start', function repeat() {
          d3.active(this)
            .tween('text', (d, i) => {
              const that = d3.select(this);
              const _i = d3.interpolate('0', `${labelStyle(d, i).text}`);
              return function (t) { that.text(format(_i(t))); };
            });

        });
    }

    return this.state;
  }

  ngOnDestroy() {
    this.disposable.finalize();
  }
}
