import { Component, OnInit } from '@angular/core';
import { ChartStyleBuilder } from 'src/charts/chart-style/chart-style.builder';
import { ChartStyle } from 'src/charts/chart-style/chart-style';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExampleDataService } from '../example-data-service';

@Component({
    selector: 'app-example-chart-bar-vertical',
    templateUrl: './example-chart-bar-vertical-series.component.html',
    styleUrls: [
        './example-chart-bar-vertical-series.component.scss',
        '../../styles/epl-emblems.scss',
    ],
})

export class ExampleChartBarVerticalSeriesComponent implements OnInit {
    constructor(private dataService: ExampleDataService) { }

    data$: Observable<any>;
    clubs$: Observable<any>;

    margin = { left: 30, bottom: 25, right: 20, top: 20 };
    range = { x: [0, 21], y: [0, 130] };

    ticksX = [];
    ticksY = [];

    seasons = [20, 19, 18, 17, 16, 15];

    colors = ['#709a28', '#87ba30', '#c23612', '#e0471f'];

    selectedSeason = 19;

    style = new ChartStyleBuilder()
        .for(ChartStyle.bar, (d, i) => {

            return { fill: this.colors[i], background: '#f1f3ca', size: 25 };
        })
        .for(ChartStyle.label, (d) => {
            const text = `${d}%`;

            return { text, fontSize: 9, fontWeight: 600 };
        });

    ngOnInit() {
        for (let i = 1; i < Math.max(...this.range.x); i++) {
            this.ticksX.push(i);
        }

        for (let i = 5; i < Math.max(...this.range.y); i += 5) {
            this.ticksY.push(i);
        }

        this.data$ = this.dataService.getData(`${this.selectedSeason - 1}${this.selectedSeason}`).pipe(
            map(x => x.map(club => [club.goals.for.home, club.goals.for.away])));

        this.clubs$ = this.dataService.getData(`${this.selectedSeason - 1}${this.selectedSeason}`).pipe(
            map(x => x.map(club => club)));
    }

    getLogo(club) {
        return `logo logo-${club.replace(/\s+/g, '-').toLowerCase()}`;
    }

    updateData(scored = true, conceded = false) {
        if (scored && conceded) {
            this.colors = ['#709a28', '#87ba30', '#c23612', '#e0471f'];

            this.data$ = this.dataService.getData(`${this.selectedSeason - 1}${this.selectedSeason}`).pipe(
                map(x => x.map(club => [club.goals.for.home, club.goals.for.away, club.goals.against.home, club.goals.against.away])));
        } else {
            if (scored) {
                this.colors = ['#709a28', '#87ba30'];

                this.data$ = this.dataService.getData(`${this.selectedSeason - 1}${this.selectedSeason}`).pipe(
                    map(x => x.map(club => [club.goals.for.home, club.goals.for.away])));
            } else {
                if (conceded) {
                    this.colors = ['#c23612', '#e0471f'];

                    this.data$ = this.dataService.getData(`${this.selectedSeason - 1}${this.selectedSeason}`).pipe(
                        map(x => x.map(club => [club.goals.against.home, club.goals.against.away])));
                } else {
                    this.data$ = empty();
                }
            }
        }

        this.clubs$ = this.dataService.getData(`${this.selectedSeason - 1}${this.selectedSeason}`).pipe(
            map(x => x.map(club => club)));
    }

    getSeason(season) {
        return `20${season - 1}/20${season}`;
    }

}
