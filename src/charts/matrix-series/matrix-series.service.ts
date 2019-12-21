import { IChartLabelStyle, ChartStyle, IChartMatrixStyle } from '../chart-style/chart-style';
import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { ChartStyleBuilder } from '../chart-style/chart-style.builder';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartDrawFactory } from '../common/chart-draw.factory';
import { ChartService } from '../chart/chart.service';
import { IChartMargin } from '../common/chart-margin';
import { IChartRect } from '../common/chart-rect';
import { nextId } from '../kit';
import * as d3 from 'd3';

export interface IChartMatrixSeriesState {
  id?: string;
  type?: string;
  data?: { nodes: any[], links: any[], count?: any[] };
  style?: ChartStyleBuilder;
  rect?: IChartRect;
  margin?: IChartMargin;
  selectX?: string;
  selectY?: string;
  labelOffset?: number;
}

export type IChartMatrixOrderType = 'name' | 'group' | 'count';

@Injectable()
export class ChartMatrixSeriesService implements OnDestroy {
  private disposable = new ChartDisposable();
  private root: d3.Selection<SVGElement, string, SVGElement, number>;
  private state: IChartMatrixSeriesState;
  private _order: IChartMatrixOrderType;
  onOrderChange = new EventEmitter<string>();

  set order(order: IChartMatrixOrderType) {
    this._order = order;
    this.onOrderChange.emit(order);
    if (this.state) {
      this.invalidateOrder(order);
    }
  }

  get order() {
    return this._order;
  }

  constructor(private chartService: ChartService) {
    const selector = { id: `chart-series-matrix-${nextId()}`, level: 0 };
    this.root = chartService.select(selector);

    this.disposable.add(() => this.chartService.remove(selector));
  }

  setState(state: IChartMatrixSeriesState) {
    const { rect, data, style, labelOffset } = state;

    this.state = state;

    if (!rect.height || !rect.width) {
      return;
    }

    const datum = this.formatData(data);
    const orders = this.getOrders(datum);

    const chartSideLength = Math.min(rect.width, rect.height);
    const cellSideLength = (Math.min(rect.width, rect.height) - labelOffset) / datum.nodes.length;

    this.root
      .attr('transform', `translate(${(rect.width - chartSideLength) / 2},
                                    ${(rect.height - chartSideLength) / 2})`);

    const scaleSide = d3.scaleBand()
      .range([labelOffset, chartSideLength])
      .domain(orders[this.order]);
    const scaleOpacity = d3.scaleLinear().domain([0, 4]).clamp(true);
    const setColor = d3.scaleOrdinal(d3.schemeCategory10);

    const labelStyle = style.compile<IChartLabelStyle>(ChartStyle.label);
    const matrixStyle = style.compile<IChartMatrixStyle>(ChartStyle.matrix);

    const draw = ChartDrawFactory(this.root, datum.matrix);
    const drawBackground = ChartDrawFactory(this.root, [data]);

    drawBackground('.chart-background', {
      create: selection =>
        selection
          .append('rect'),
      update: selection =>
        selection
          .attr('fill', '#eee')
          .attr('width', chartSideLength - labelOffset)
          .attr('height', chartSideLength - labelOffset)
          .attr('transform', `translate(${labelOffset}, ${labelOffset})`),
    });

    draw('.chart-matrix-column', {
      create: selection =>
        selection
          .append('g'),
      update: selection =>
        selection
          .style('width', rect.width)
          .attr('transform', (d, i) => {
            return `translate(${scaleSide(i)}, 0)`;
          }),
    });

    draw('.chart-matrix-row', {
      create: selection =>
        selection
          .append('g'),
      update: selection =>
        selection
          .style('width', rect.width)
          .attr('transform', (d, i) => {
            return `translate(0,${scaleSide(i)})`;
          })

          .each((d, i) => {
            const currentNode = this.root.selectAll('.chart-matrix-row').filter(e => e === d);

            const drawCell = ChartDrawFactory(currentNode, d);
            drawCell('.chart-matrix-cell', {
              // tslint:disable-next-line:no-shadowed-variable
              create: selection =>
                selection
                  .append('rect'),
              // tslint:disable-next-line:no-shadowed-variable
              update: selection =>
                selection
                  .attr('chart-matrix-selector-hover', (e, c) => c)
                  .attr('x', (e, c) => scaleSide(c))
                  .attr('width', cellSideLength)
                  .attr('height', cellSideLength)
                  .style('fill-opacity', (e, c) => {
                    if (matrixStyle(e, c).opacity === 'default') {
                      return scaleOpacity(e.z);
                    }
                    return matrixStyle(e, c).opacity;
                  })
                  .style('fill', (e, c) => {
                    if (matrixStyle(e, c).color === 'default') {
                      return datum.nodes[e.x].group === datum.nodes[e.y].group ?
                        setColor(datum.nodes[e.x].group) : 'transparent';
                    }
                    return matrixStyle(e, c).color;
                  })
                  .on('mouseover', (e, c) => this.mouseover(c, d, i))
                  .on('mouseleave', (e, c) => this.mouseleave(c, d, i)),
            });

          }),
    });

    this.root.selectAll('.chart-matrix-row')
      .append('line')
      .attr('x1', chartSideLength - labelOffset)
      .attr('transform', `translate(${labelOffset})`)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    this.root.selectAll('.chart-matrix-column')
      .append('line')
      .attr('y1', chartSideLength - labelOffset)
      .attr('transform', `translate(0, ${labelOffset})`)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    draw('.chart-matrix-label-vertical', {
      create: selection =>
        selection
          .append('text'),
      update: selection =>
        selection
          .attr('x', labelOffset - 10)
          .attr('dy', cellSideLength)
          .attr('y', (d, i) => scaleSide(i) - 6)
          .attr('fill', (d, i) => labelStyle(d, i).color)
          .attr('text-anchor', 'end')
          .attr('font-size', (d, i) => labelStyle(d, i).fontSize)
          .attr('font-family', (d, i) => labelStyle(d, i).fontFamily)
          .text((e, c) => datum.nodes[c].name),
    });

    draw('.chart-matrix-label-horizontal', {
      create: selection =>
        selection
          .append('text'),
      update: selection =>
        selection
          .attr('x', (d, i) => scaleSide(i))
          .attr('dy', cellSideLength)
          .attr('fill', (d, i) => labelStyle(d, i).color)
          .attr('transform', (d, i) =>
            `translate(${scaleSide(i) - cellSideLength * 0.25},
                      ${scaleSide(i) + labelOffset - 10})rotate(-90)`)
          .attr('font-size', (d, i) => labelStyle(d, i).fontSize)
          .attr('font-family', (d, i) => labelStyle(d, i).fontFamily)
          .text((d, i) => datum.nodes[i].name),
    });

  }

  mouseover(c, d, i) {
    const { style } = this.state;

    const labelStyle = style.compile<IChartLabelStyle>(ChartStyle.label);

    this.root
      .selectAll('.chart-matrix-label-vertical')
      .filter(a => a === d)
      .attr('fill', labelStyle(d, i).colorHover);

    this.root
      .selectAll('.chart-matrix-label-horizontal')
      .filter((a, b) => b === c)
      .attr('fill', labelStyle(d, i).colorHover);
  }

  mouseleave(c, d, i) {
    const { style } = this.state;

    const labelStyle = style.compile<IChartLabelStyle>(ChartStyle.label);

    this.root
      .selectAll('.chart-matrix-label-vertical, .chart-matrix-label-horizontal ')
      .attr('fill', labelStyle(d, i).color);

  }

  invalidateOrder(order: IChartMatrixOrderType) {
    this.move(order);
  }

  getOrders(datum) {
    return {
      name: d3.range(datum.length).sort((a: any, b: any) => {
        return d3.ascending(datum.nodes[a].name, datum.nodes[b].name);
      }),
      count: d3.range(datum.length).sort((a: any, b: any) => {
        return datum.nodes[b].count - datum.nodes[a].count;
      }),
      group: d3.range(datum.length).sort((a: any, b: any) => {
        return datum.nodes[b].group - datum.nodes[a].group;
      }),
    };
  }

  formatData(data) {
    const matrix = [];
    const nodes = data.nodes;
    const length: number = nodes.length;

    nodes.forEach((node: any, i: number) => {
      node.index = i;
      node.count = 0;
      matrix[i] = d3.range(length).map((j: number) => {
        return {
          x: j,
          y: i,
          z: 0,
          data: {
            x: data.nodes[i],
            y: data.nodes[j],
          },
        };
      });
    });

    data.links.forEach((link) => {
      matrix[link.source][link.target].z += link.value;
      matrix[link.target][link.source].z += link.value;
      matrix[link.source][link.source].z += link.value;
      matrix[link.target][link.target].z += link.value;
      nodes[link.source].count += link.value;
      nodes[link.target].count += link.value;
    });

    return { matrix, nodes, length };
  }

  private move(order: IChartMatrixOrderType) {
    const { rect, data, labelOffset } = this.state;

    const chartSideLength = Math.min(rect.width, rect.height);
    const datum = this.formatData(data);
    const orders = this.getOrders(datum);

    const rectSideLength = (Math.min(rect.width, rect.height) - 70) / datum.nodes.length;

    const scaleSide = d3.scaleBand()
      .range([labelOffset, chartSideLength])
      .domain(orders[order]);

    const duration = 2000;
    const delay = duration - 1500;

    this.root
      .selectAll(`.chart-matrix-column`)
      .transition()
      .duration((d, i) => duration)
      .delay((d, i) => delay + 50 * i * 2)
      .attr('transform', (d, i) => {
        return `translate(${scaleSide(i)}, 0)`;
      });

    this.root
      .selectAll(`.chart-matrix-row`)
      .transition()
      .duration((d, i) => duration + 50 * i)
      .delay((d, i) => 50 * i)
      .attr('transform', (d, i) => {
        return `translate(0,${scaleSide(i)})`;
      })
      .each((d, i) => {
        this.root
          .selectAll(`.chart-matrix-cell`).filter(a => d.includes(a))
          .transition()
          .duration((e, c) => duration)
          .delay((e, c) => delay + 50 * c * 2)
          .attr('x', (e, c) => scaleSide(c));

      });

    this.root
      .selectAll('.chart-matrix-label-vertical')
      .transition()
      .duration((d, i) => duration + 50 * i)
      .delay((d, i) => 50 * i)
      .attr('y', (d, i) => scaleSide(i) - 6);

    this.root
      .selectAll('.chart-matrix-label-horizontal')
      .transition()
      .duration((d, i) => duration)
      .delay((d, i) => delay + 50 * i * 2)
      .attr('x', (d, i) => scaleSide(i))
      .attr('transform', (d, i) =>
        `translate(${scaleSide(i) - rectSideLength * 0.25}, ${scaleSide(i) + labelOffset - 10})rotate(-90)`);
  }

  ngOnDestroy() {
    this.disposable.finalize();
  }
}
