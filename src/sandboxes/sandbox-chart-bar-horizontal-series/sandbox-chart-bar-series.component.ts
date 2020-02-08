import { Component, HostBinding } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { DATA_FOR, DATA_AGAINST } from './data';

@Component({
  selector: 'app-sandbox-chart-bar',
  templateUrl: './sandbox-chart-bar-series.component.html',
  styleUrls: ['./sandbox-chart-bar-series.component.scss']
})
export class SandboxChartBarHorizontalSeriesComponent {

  dataFor = DATA_FOR;
  dataAgainst = DATA_AGAINST;
  prevDuration = 0;

  data = [[], [14, 40, 5], [30, 50, 5], [20, 50, 6], [10, 20, 40], [30, 30, 30], [30, 30, 30], [30, 30, 30], [30, 30, 30], [30, 30, 30], [30, 30, 30]];

  styleFor =
    new ChartStyleBuilder()
      .for(ChartStyle.bar, (d, i) => {
        const fill = i === 0 ? '#94c31a' : i === 1 ? '#bedb75' : '#f8f8f8';

        return { fill, height: 20, offsetLeft: 25 };
      })
      .for(ChartStyle.label, (d) => {
        const text = 'Club Name';
        return { text, fontSize: 10 };
      })
      .for(ChartStyle.animation, (d, i) => {
        const duration = d * 10 + (100 - d) * 10;
        const delay = this.prevDuration;
        this.prevDuration = (i + 1) % 3 > 0 ? this.prevDuration + duration - 210 : 0;

        return { duration, delay, format: '.0' };
      });

  styleAgainst =
    new ChartStyleBuilder()
      .for(ChartStyle.bar, (d, i) => {
        const fill = i === 0 ? '#f7a704' : i === 1 ? '#faca68' : '#f8f8f8';

        return { fill, height: 20, offsetLeft: 25 };
      })
      .for(ChartStyle.label, (d) => {
        const text = 'Club Name';
        return { text, fontSize: 10 };
      })
      .for(ChartStyle.animation, (d, i) => {
        const duration = d * 10 + (100 - d) * 10;
        const delay = this.prevDuration;
        this.prevDuration = (i + 1) % 3 > 0 ? this.prevDuration + duration - 210 : 0;

        return { duration, delay };
      });

  style =
    new ChartStyleBuilder()
      .for(ChartStyle.bar, (d, i) => {
        const colors = ['#e00c50', '#f7a704', '#94c31a'];
        return { fill: colors[i], background: '#f1f3ca', size: 8 };
      })
      .for(ChartStyle.label, (d) => {
        const text = `${d}%`;
        return { text, fontSize: 9, fontWeight: 600 };
      });
}
