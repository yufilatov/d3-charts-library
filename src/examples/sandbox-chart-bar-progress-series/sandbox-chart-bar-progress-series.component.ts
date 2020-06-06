import { Component, HostBinding, OnInit } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { DATA } from './data';

@Component({
  selector: 'app-sandbox-chart-progress-bar',
  templateUrl: './sandbox-chart-bar-progress-series.component.html',
  styleUrls: ['./sandbox-chart-bar-progress-series.component.scss'],
})
export class SandboxChartBarProgressSeriesComponent implements OnInit {
  clubs = this.getClubs(DATA);
  data = [];

  style =
    new ChartStyleBuilder()
      .for(ChartStyle.bar, d => {
        const fill =
          d > 55 ? '#80b436' :
            d >= 50 && d <= 55 ? '#feb74b' :
              d < 50 ? '#dd0d47' :
                '#dfe1e6';

        return { fill, size: 12, height: 20 };
      })
      .for(ChartStyle.label, d => {
        const text = `${d / 100}`;

        return { text, fontSize: 12, fontWeight: 600 };
      })
      .for(ChartStyle.animation, d => {

        return { duration: d * 50 + (100 - d) * 50, delay: 1000, format: '.1%' };
      });

  ngOnInit() {
    this.data = this.getPossession(DATA);
  }

  getPossession(data) {
    const result = [];
    data.forEach(team => result.push(team.possession));

    return result;
  }

  private getClubs(data) {
    const result = [];
    data.forEach(team => result.push(team.club));

    return result;
  }
}

