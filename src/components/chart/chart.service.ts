import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { elementsFromPoint } from '../kit';
export interface IChartLevel {
    id: string;
    level: number;
}

@Injectable()
export class ChartService {
    private svg: d3.Selection<SVGElement, undefined, HTMLElement, undefined> = null;
    private defs: d3.Selection<SVGElement, undefined, SVGElement, undefined> = null;
    private maxLevel = 0;

    constructor(private elementRef: ElementRef, renderer: Renderer2) {
        const svg = renderer.createElement('svg', 'svg') as SVGElement;
        const defs = renderer.createElement('defs', 'svg') as SVGElement;

        renderer.appendChild(svg, defs);
        renderer.appendChild(elementRef.nativeElement, svg);

        this.svg = d3.select<SVGElement, undefined>(svg);
        this.defs = d3.select<SVGElement, undefined>(defs);
    }

    selectRoot(): d3.Selection<HTMLElement, undefined, HTMLElement, undefined> {
        return d3.select(this.elementRef.nativeElement);
    }

    selectDefs(): d3.Selection<SVGElement, undefined, SVGElement, undefined> {
        return this.defs;
    }

    select({ id, level }: IChartLevel): d3.Selection<SVGElement, string, SVGElement, number> {
        this.maxLevel = Math.max(this.maxLevel, level);

        const layers = this.svg
            .selectAll<SVGElement, number>('.chart-z-index')
            .data(Array.from({ length: this.maxLevel + 1 }, (x, i) => i));

        const layer = layers
            .enter()
            .append<SVGElement>('g')
            .attr('class', 'chart-z-index')
            .merge(layers)
            .filter(d => d === level);

        const selection = layer.selectAll<SVGElement, string>(`#${id}`).data([id]);

        return selection
            .enter()
            .append<SVGElement>('g')
            .attr('id', id)
            .merge(selection);
    }

    remove({ id, level }: IChartLevel): void {
        this.svg
            .selectAll<SVGElement, number>(`.chart-z-index`)
            .filter(d => d === level)
            .select(`#${id}`)
            .remove();
    }

    removeEvent(target: string) {
        this.svg
            .selection.on(target, null);
    }

    hitTest(point: [number, number]): any[] {
        const svg = this.svg.node();
        const elements = elementsFromPoint(point[0], point[1]);

        const isNotRoot = x => x !== svg;
        const path = _.takeWhile(elements, isNotRoot);
        return elements.length !== path.length ? path : [];
    }
}
