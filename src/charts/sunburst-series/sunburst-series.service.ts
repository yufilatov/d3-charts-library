import { Injectable, OnDestroy, EventEmitter, Renderer2 } from '@angular/core';

import * as d3 from 'd3';
import { IChartSeriesState, CHART_DEFAULT_SERIES_STATE } from '../common/chart-series';
import { ChartDisposable } from '../common/chart-disposable';
import { ChartService } from '../chart/chart.service';
import { nextId, ChartMath, hasParent } from '../kit';
import { IChartArcStyle, IChartLabelStyle, ChartStyle, IChartZoomStyle } from '../chart-style/chart-style';
import { ChartDrawFactory } from '../common/chart-draw.factory';

export interface IChartSunburstSeriesState extends IChartSeriesState {
    rings?: number;
}

const DEFAULT_STATE: IChartSunburstSeriesState = {
    ...CHART_DEFAULT_SERIES_STATE,
    rings: 2,
};

// TODO: just for the demo, further - calculate it.
const PERIMETER_LIMIT = 22;

@Injectable()
export class ChartSunburstSeriesService implements OnDestroy {
    private disposable = new ChartDisposable();
    private root: d3.Selection<SVGElement, string, SVGElement, number>;

    private id: string;
    state = DEFAULT_STATE;

    private zoom: (node: any) => void;
    // tslint:disable-next-line:variable-name
    private _selection: any[] = [];
    selectedNode: any;
    selectionChange = new EventEmitter<{ oldValue: any[], currentValue: any[] }>();

    set selection(currentValue: any[]) {
        if (this._selection !== currentValue) {
            const oldValue = this._selection;
            this._selection = currentValue;

            this.selectionChange.emit({ oldValue, currentValue });
            this.selectedNode = this.invalidateSelection(currentValue);
        }
    }

    get selection() {
        return this._selection;
    }

    constructor(private chartService: ChartService, renderer: Renderer2) {
        this.id = `chart-series-sunburst-${nextId()}`;

        const selector = { id: this.id, level: 0 };
        this.root = chartService.select(selector);
        this.root.classed('chart-series-sunburst', true);

        this.disposable.add(() => this.chartService.remove(selector));

        const svg = chartService.selectRoot().node() as SVGElement;
        this.disposable.add(
            renderer.listen(svg, 'click', () => {
                this.selection = [];
            }),
        );
    }

    setState(state: IChartSunburstSeriesState) {
        this.state = {
            ...this.state,
            ...state,
        };

        const { rect } = this.state;
        if (!rect.height || !rect.width) {
            return;
        }

        const { data, rings } = this.state;
        const maxDepth = this.maxDepth(data);

        this.state.scaleX = d3.scaleLinear().range([0, 2 * Math.PI]);
        this.state.scaleY = d3.scaleLinear().range([0, this.getRadius() + this.getRadius() / (rings + 1) * (maxDepth - rings)]);

        const { style, scaleX, scaleY } = this.state;

        const arcStyle = style.compile<IChartArcStyle>(ChartStyle.arc);
        const labelStyle = style.compile<IChartLabelStyle>(ChartStyle.label);

        const root = this.buildRoot(data);
        const arc = d3.arc()
            .startAngle(d => Math.max(0, Math.min(2 * Math.PI, scaleX(d.x0))))
            .endAngle(d => Math.max(0, Math.min(2 * Math.PI, scaleX(d.x1))))
            .innerRadius(d => Math.max(0, scaleY(d.y0)))
            .outerRadius(d => Math.max(scaleY(d.y0), scaleY(d.y1)));

        this.zoom = this.zoomFactory(arc);

        const shouldHide = d => d.depth > rings;
        const draw = ChartDrawFactory<number>(this.root, root.descendants());
        draw(`.chart-sunburst-arc`, {
            create: selection =>
                selection
                    .append('path'),
            update: selection =>
                selection
                    .attr('d', arc)
                    .attr('transform', `translate(${rect.width / 2}, ${rect.height / 2})`)
                    .attr('stroke', (d, i) => {
                        return d.depth > rings ? 'transparent' : arcStyle(d, i).stroke;
                    })
                    .attr('stroke-width', (d, i) => arcStyle(d, i).strokeWidth)
                    .attr('opacity', (d) => {
                        if (shouldHide(d)) {
                            return 0;
                        }

                        return d.depth === 1 ? 1 : 0.7;
                    })
                    .attr('fill', (d, i) => arcStyle(d, i).fill)
                    .on('click', (d) => {
                        const { event } = d3;
                        event.stopPropagation();

                        if (this.selection[0] !== d.data) {
                            this.selection = [d.data];
                        } else {
                            if (d.children) {
                                this.selection = d.parent ? [d.parent.data] : [d.data];
                            }
                        }

                    })
                    .on('mouseover', (d, i) => {
                        const arcStyleOver = style.compile<IChartArcStyle>(ChartStyle.arc);

                        this.root
                            .selectAll('.chart-sunburst-arc')
                            .filter(n => n === d)
                            .style('fill', () => {
                                const { changeSet, fill, fillHover } = arcStyleOver(d, i);
                                return changeSet.has('fillHover') ? fillHover : fill;
                            });
                    })
                    .on('mouseleave', (d, i) => {
                        const arcStyleLeave = style.compile<IChartArcStyle>(ChartStyle.arc);

                        this.root
                            .selectAll('.chart-sunburst-arc')
                            .filter(n => n === d)
                            .style('fill', () => {
                                return arcStyleLeave(d, i).fill;
                            });
                    }),
        });

        // const a = () => {
        //     console.log('asdf')
        // };

        // 1 === 1 && a();

        d3.selectAll('.chart-label').remove();

        // draw('.chart-label', {
        //     create: selection =>
        //         selection
        //             .append('foreignObject'),
        //     update: selection =>
        //         selection
        //             .attr('transform', (d, i) => this.translateLabel(d, i, arc))
        //             .attr('color', (d, i) => {
        //                 return labelStyle(d, i).color;
        //             })
        //             .attr('height', d => scaleY(d.y1) - scaleY(d.y0))
        //             .attr('width', d => scaleY(d.y1) - scaleY(d.y0))
        //             .attr('alignment-baseline', 'central')
        //             .attr('id', (d, i) => `${this.id}-label-${i}`)
        //             .attr('pointer-events', 'none')
        //             .attr('opacity', (d) => {
        //                 const deltaAngle = scaleX(d.x1) - scaleX(d.x0);
        //                 const r = Math.max(0, (scaleY(d.y0) + scaleY(d.y1)) / 2);
        //                 const perimeter = r * deltaAngle;

        //                 return perimeter < PERIMETER_LIMIT ? 0 : 1;
        //             })
        //             .html('')
        //             .append('xhtml:div')
        //             .classed('chart-text', true)
        //             .style('position', 'relative')
        //             .style('transform', d => this.translateText(d, scaleY(d.y1) - scaleY(d.y0)))
        //             .style('font-size', (d, i) => labelStyle(d, i).fontSize + 'px')
        //             .style('line-height', (d, i) => labelStyle(d, i).fontSize + 'px')
        //             .style('text-align', 'center')
        //             .style('background-color', (d, i) => labelStyle(d, i).backgroundColor)
        //             .text(d => d.parent ? d.data.name : ''),
        // });

        this.invalidateSelection(this.selection);
    }

    private drilldown(arc) {
        const { scaleX, scaleY, style, data, rings } = this.state;

        const maxDepth = this.maxDepth(data);

        const zoomStyle = style.compile<IChartZoomStyle>(ChartStyle.zoom);
        const { duration, enabled } = zoomStyle(null);
        let xd; let yd; let yr;

        const arcTween = (node) => {

            const radius = this.getRadius();

            const target = (node.children && node.children[0]);
            if (!target) {
                return () => { };
            }

            xd = d3.interpolate(scaleX.domain(), [target.x0, node.x1]);
            yd = d3.interpolate(scaleY.domain(), [target.y0, 1]);
            yr = d3.interpolate(scaleY.range(), [target.y0
                ? radius / (rings + 1)
                : 0, radius + (maxDepth - rings - node.depth) * radius / (rings + 1)]);

            return (d, i) => {
                return i
                    ? () => arc(d)
                    : (t) => {
                        scaleX.domain(xd(t));
                        scaleY.domain(yd(t)).range(yr(t));
                        return arc(d);
                    };
            };

        };

        return (search: any[]) => {
            if (enabled) {
                const nodes = [];
                let rootNode;

                this.root
                    .selectAll('.chart-sunburst-arc')
                    .filter((n) => {
                        if (search.indexOf(n.data) >= 0) {
                            nodes.push(n);
                        }

                        if (!rootNode) {
                            rootNode = n;
                        }

                        return true;
                    });

                const oldNode = this.selectedNode || null;
                let newNode = nodes[0] && nodes[0].parent ? nodes[0] : null;



                if (newNode === oldNode) {
                    newNode = newNode !== null ? newNode.parent : null;
                }

                if (newNode !== oldNode) {
                    if (newNode === null && oldNode.parent === null) {
                        return null;
                    }

                    const arcStyle = style.compile<IChartArcStyle>(ChartStyle.arc);
                    const labelStyle = style.compile<IChartLabelStyle>(ChartStyle.label);

                    if (oldNode && newNode) {
                        if (oldNode.parent === newNode.parent && !(newNode.children && newNode.children.length)) {
                            this.root
                                .selectAll('.chart-sunburst-arc')
                                .style('fill', (d, i) => arcStyle(d, i).fill);
                            return newNode;
                        }

                    }

                    let target = newNode || rootNode;
                    if (!(target.children && target.children.length)) {
                        target = target.parent;
                    }

                    const shouldHide = (d) => {
                        return !hasParent(target, d) || d.depth > target.depth + rings || d.depth <= target.depth;
                    };

                    d3
                        .selectAll('.chart-label')
                        .style('opacity', 0);

                    let transitionCount = 0;

                    this.root
                        .selectAll('.chart-sunburst-arc')
                        .transition()
                        .duration(duration)
                        .style('opacity', (d, i) => {
                            transitionCount = transitionCount + 1;

                            (shouldHide(d)) && console.log('Iopta');

                            if (this.selection.length === 0) {
                                return d.depth === 1 ? 1 : 0.7;
                            }

                            return target === d.parent ? 1 : 0.7;
                        })
                        .style('fill', (d, i) => arcStyle(d, i).fill)
                        .style('stroke', (d, i) => d.depth <= target.depth + rings
                            && d.depth > target.depth ? arcStyle(d, i).stroke : 'transparent')

                        .attrTween('d', arcTween(target))
                        .on('end', (d, i) => {
                            if (d.x0 >= target.x0 && ChartMath.less(d.x0, target.x1)) {
                                const labelId = `#${this.id}-label-${i}`;

                                d3.selectAll('.chart-label')
                                    .filter(n => n === d)
                                    .attr('transform', (n, c) => this.translateLabel(n, c, arc));

                                // d3.selectAll('.chart-label')
                                //     .filter(n => n === d)
                                //     .attr('transform', (n, c) => 'rotate(45)');

                                d3
                                    .selectAll(labelId)
                                    .style('height', scaleY(d.y1) - scaleY(d.y0))
                                    .style('width', scaleY(d.y1) - scaleY(d.y0))
                                    // .style('transform', (n, c) => this.translateText(n, scaleY(d.y1) - scaleY(d.y0)))
                                    .style('font-size', labelStyle(d, i).fontSize)
                                    .style('color', labelStyle(d, i).color)
                                    .filter(n => n.depth <= target.depth + rings && n.depth > target.depth)
                                    .style('opacity', (n) => {
                                        const deltaAngle = scaleX(n.x1) - scaleX(n.x0);
                                        const r = Math.max(0, (scaleY(n.y0) + scaleY(n.y1)) / 2);
                                        const perimeter = r * deltaAngle;

                                        return perimeter < PERIMETER_LIMIT ? 0 : 1;
                                    });

                            }
                        });

                    return newNode;
                }
            }
        };
    }

    private maxDepth(data) {
        const hierarchy = d3.hierarchy(data).sum(d => d.value).descendants();
        return hierarchy[hierarchy.length - 1].depth;
    }

    private buildRoot(data) {
        const hierarchy = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        return d3.partition()(hierarchy);
    }

    private getRadius() {
        const { rect } = this.state;
        return Math.min(rect.width, rect.height) / 2 - 10;
    }

    private translateLabel(d, i, arc) {
        const { rect, scaleY, scaleX } = this.state;
        const [cx, cy] = arc.centroid(d, i);
        const size = scaleY(d.y1) - scaleY(d.y0);
        const angle = (scaleX(d.x0) + scaleX(d.x1)) / 2 * 180 / Math.PI;

        return `translate(${rect.width / 2}, ${rect.height / 2})
                translate(${(cx)}, ${cy})
                translate(-${size / 2}, -${size / 2})`;
    }

    private translateText(d, s) {
        const { scaleX } = this.state;
        const angle = (scaleX(d.x0) + scaleX(d.x1)) / 2 * 180 / Math.PI;
        return `translate(${s / 2}px,${s / 2}px)
                translate(-50%, -50%)`;
    }

    private invalidateSelection(value: any[]) {
        if (this.zoom) {
            return this.zoom(value);
        }

        return null;
    }

    private zoomFactory(arc) {
        return this.drilldown(arc);
    }

    ngOnDestroy() {
        this.disposable.finalize();
    }


}
