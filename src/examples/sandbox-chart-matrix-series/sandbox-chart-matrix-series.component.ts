import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DATA_GT } from './data';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';

@Component({
  selector: 'app-sandbox-chart-matrix',
  templateUrl: './sandbox-chart-matrix-series.component.html',
  styleUrls: ['./sandbox-chart-matrix-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxChartMatrixSeriesComponent {

  data = DATA_GT;
  order = 'name';
  chart = 1;

  options = [
    { name: 'Action' },
    { name: 'Another action' },
    { name: 'Something else here' },
    { isDivider: true },
    { name: 'Separated link' },
  ];

  style =
    new ChartStyleBuilder()
      .for(ChartStyle.label, () => {
        return { fontSize: 15, color: '#000', colorHover: '#ff0000' };
      });

  onOrderDropdownClick(order: string) {
    this.order = order;
  }

  onChange(event) {
    this.order = event.target.value;
  }

}
