import { Component, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { DATA } from './data';
import * as d3 from 'd3';
import { findDescendants } from 'src/charts/kit';

@Component({
  selector: 'app-sandbox-chart-sunburst',
  templateUrl: './sandbox-chart-sunburst-series.component.html',
  styleUrls: ['./sandbox-chart-sunburst-series.component.scss'],
})
export class SandboxChartSunburstSeriesComponent {
  constructor(ref: ChangeDetectorRef) {
    this.changeDetection = ref;
  }

  @HostBinding('class.sandbox-chart-sunburst-drilldown') hostClass = true;

  data = DATA;

  changeDetection;
  chart = 1;

  selection = [];
  matches = [];
  selectionSource = 'default';

  breadcrumb: any[] = [];
  breadcrumbSelection = this.data;

  color = d3.scaleOrdinal(d3.schemeCategory10);

  style =
    new ChartStyleBuilder()
      .for(ChartStyle.arc, (node) => {
        const level = node.parent ? node.data.level : '';

        let fill =
          level === 1 ? '#45b7de' :
            level === 2 ? '#566fd6' :
              level === 3 ? '#32b5a0' :
                'transparent';

        const fillHover =
          level === 1 ? '#399dbf' :
            level === 2 ? '#4358ad' :
              level === 3 ? '#299987' :
                'transparent';

        if (node.data === this.selection[0]) {
          fill = fillHover;
        }

        return { fill, fillHover };
      })
      .for(ChartStyle.label, () => {
        const color = '#000';
        const fontSize = 12;

        return { color, fontSize };
      })
      .for(ChartStyle.zoom, () => {
        return { duration: 800 };
      });

  breadcrumbStyle =
    new ChartStyleBuilder()
      .for(ChartStyle.label, (d, i) => {
        const level = this.selection[0].level;

        let labelColor;

        if (i === this.breadcrumb.length - 1) {
          labelColor = '#000';
        } else {

          if (this.chart === 1) {
            labelColor =
              level === 1 ? '#45b7de' :
                level === 2 ? '#566fd6' : '#32b5a0';
          } else {
            labelColor = this.color(this.breadcrumb[1].name);
          }
        }

        return { color: labelColor };
      });

  onSelectionChange(value: any[]) {
    if (this.selectionSource !== 'default') {
      this.selectionSource = 'default';
      return;
    }

    switch (value.length) {
      case 0:
        this.breadcrumb = [];
        return;
      case 1:
        const node = value[0];
        this.breadcrumb = this.findPath(node, this.data);
        this.selection = value;
        break;
    }
  }

  onControlChange(value: any) {
    if (JSON.stringify(value) !== JSON.stringify(this.selection)) {
      this.selection = [value];
      this.breadcrumb = value;
    }
  }

  onBreadcrumbChange(value: any) {
    if (value !== this.selection[0]) {
      this.selection = [value];
      this.breadcrumb = this.findPath(value, this.data);
    }
  }

  formatBreadcrumb(value: any) {
    return value.name;
  }

  private findPath(node, root) {
    if (node === root) {
      return [root];
    }

    const path = [root];

    if (root.children) {
      root.children.forEach((n) => {

        const nodes = findDescendants(n).concat(n);
        if (nodes.indexOf(node) >= 0) {
          path.push(...this.findPath(node, n));
        }
      });
    }

    return path;
  }

}
