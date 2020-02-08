import { Component } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { DATA_FOR, DATA_AGAINST } from './data';
import { Observable } from 'rxjs';
import { SandboxDataService } from '../sandbox-dataservice';

@Component({
  selector: 'app-sandbox-chart-bar-horizontal',
  templateUrl: './sandbox-chart-bar-horizontal-series.component.html',
  styleUrls: ['./sandbox-chart-bar-horizontal-series.component.scss']
})

export class SandboxChartBarHorizontalSeriesComponent {
  data$: Observable<any>;
  data = [];
  clubs = [];

  constructor(dataService: SandboxDataService) {
    dataService.getGoalsData().subscribe(x => {
      this.data = [[]].concat(x.map(club => [club.for.home, club.for.away])),
        this.clubs = x.map(club => club.club);
    });
  }

  dataFor = DATA_FOR;
  dataAgainst = DATA_AGAINST;
  prevDuration = 0;

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
