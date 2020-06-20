import { DATA } from './data';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
    selector: 'app-example-league-simulation',
    templateUrl: './example-league-simulation.component.html',
    styleUrls: ['./example-league-simulation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleLeagueSimulationComponent implements OnInit {
    data = DATA;
    pots = [1, 2, 3, 4];
    potsOneEights = [1, 2];

    groups = [];
    sortedGroups;

    oneEightsResults = [];
    quarterfinalsResults = [];
    semifinalsResults = [];
    finalResults = [];

    oneEighths = [];
    quarterfinals = [];
    quarterfinalTeams = [];
    semifinals = [];
    semifinalTeams = [];
    final = [];

    results = [];
    letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    day = 1;

    constructor() { }

    ngOnInit() {
        // define 4 teams from 4 different pots
        let pot1 = this.data.filter(a => a.pot === 1);
        let pot2 = this.data.filter(a => a.pot === 2);
        let pot3 = this.data.filter(a => a.pot === 3);
        let pot4 = this.data.filter(a => a.pot === 4);

        // add points to each team
        this.data.forEach(team => team = Object.assign(
            team,
            {
                points: 0,
                goals: [0, 0],
                pointsPerTeam: [0, 0, 0, 0],
                goalsDifferencePerTeam: [0, 0, 0, 0],
                awayGoalsPerTeam: [0, 0, 0, 0],
            }));

        // create an array of groups
        for (let i = 0; i < 8; i++) {
            this.groups.push([]);
        }

        // push teams to groups and pots
        for (const [i, group] of this.groups.entries()) {
            const team1 = pot1[Math.floor(Math.random() * pot1.length)];
            const team2 = pot2[Math.floor(Math.random() * pot2.length)];
            const team3 = pot3[Math.floor(Math.random() * pot3.length)];
            const team4 = pot4[Math.floor(Math.random() * pot4.length)];

            this.groups[i].push(team1, team2, team3, team4);
            this.sortedGroups = [...this.groups.map(a => ([...a]))];

            // remove selected teams from pots
            pot1 = pot1.filter(a => a.name !== team1.name);
            pot2 = pot2.filter(a => a.name !== team2.name);
            pot3 = pot3.filter(a => a.name !== team3.name);
            pot4 = pot4.filter(a => a.name !== team4.name);
        }
    }

    sortData(index: number) {
        return this.data.filter(a => a.pot === index);
    }

    sortDataPlayoff(index: number) {
        return [...this.sortedGroups].map(g => g[index]);
    }

    simulate(day) {
        switch (day) {
            case 1: {
                for (let i = 0; i < 8; i++) {
                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    if (matchResult1HomeTeam > matchResult1AwayTeam) {
                        this.groups[i][0].points = this.groups[i][0].points + 3;
                        this.groups[i][0].pointsPerTeam[1] = this.groups[i][0].pointsPerTeam[1] + 3;
                    } else {
                        if (matchResult1HomeTeam < matchResult1AwayTeam) {
                            this.groups[i][1].points = this.groups[i][1].points + 3;
                            this.groups[i][1].pointsPerTeam[0] = this.groups[i][1].pointsPerTeam[0] + 3;

                        } else {
                            this.groups[i][0].points = this.groups[i][0].points + 1;
                            this.groups[i][1].points = this.groups[i][1].points + 1;
                        }
                    }

                    if (matchResult2HomeTeam > matchResult2AwayTeam) {
                        this.groups[i][2].points = this.groups[i][2].points + 3;
                        this.groups[i][2].pointsPerTeam[3] = this.groups[i][2].pointsPerTeam[3] + 3;

                    } else {
                        if (matchResult2HomeTeam < matchResult2AwayTeam) {
                            this.groups[i][3].points = this.groups[i][3].points + 3;
                            this.groups[i][3].pointsPerTeam[2] = this.groups[i][3].pointsPerTeam[2] + 3;

                        } else {
                            this.groups[i][2].points = this.groups[i][2].points + 1;
                            this.groups[i][3].points = this.groups[i][3].points + 1;
                        }
                    }

                    // save extra data in case of equity
                    this.groups[i][0].goals[0] = this.groups[i][0].goals[0] + matchResult1HomeTeam;
                    this.groups[i][1].goals[0] = this.groups[i][1].goals[0] + matchResult1AwayTeam;
                    this.groups[i][2].goals[0] = this.groups[i][2].goals[0] + matchResult2HomeTeam;
                    this.groups[i][3].goals[0] = this.groups[i][3].goals[0] + matchResult2AwayTeam;

                    this.groups[i][1].goals[1] = this.groups[i][1].goals[1] + matchResult1HomeTeam;
                    this.groups[i][0].goals[1] = this.groups[i][0].goals[1] + matchResult1AwayTeam;
                    this.groups[i][3].goals[1] = this.groups[i][3].goals[1] + matchResult2HomeTeam;
                    this.groups[i][2].goals[1] = this.groups[i][2].goals[1] + matchResult2AwayTeam;

                    this.groups[i][0].goalsDifferencePerTeam[1] = this.groups[i][0].goalsDifferencePerTeam[1] + matchResult1HomeTeam - matchResult1AwayTeam;
                    this.groups[i][1].goalsDifferencePerTeam[0] = this.groups[i][1].goalsDifferencePerTeam[0] + matchResult1AwayTeam - matchResult1HomeTeam;
                    this.groups[i][2].goalsDifferencePerTeam[3] = this.groups[i][2].goalsDifferencePerTeam[3] + matchResult2HomeTeam - matchResult2AwayTeam;
                    this.groups[i][3].goalsDifferencePerTeam[2] = this.groups[i][3].goalsDifferencePerTeam[2] + matchResult2AwayTeam - matchResult2HomeTeam;

                    this.groups[i][1].awayGoalsPerTeam[0] = this.groups[i][1].awayGoalsPerTeam[0] + matchResult1AwayTeam;
                    this.groups[i][3].awayGoalsPerTeam[2] = this.groups[i][3].awayGoalsPerTeam[2] + matchResult2AwayTeam;

                    this.results.push(
                        { match: `${this.groups[i][0].name} - ${this.groups[i][1].name}`, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${this.groups[i][2].name} - ${this.groups[i][3].name}`, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );
                }
                break;
            }
            case 2: {
                for (let i = 0; i < 8; i++) {
                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    if (matchResult1HomeTeam > matchResult1AwayTeam) {
                        this.groups[i][1].points = this.groups[i][1].points + 3;
                        this.groups[i][1].pointsPerTeam[2] = this.groups[i][1].pointsPerTeam[2] + 3;

                    } else {
                        if (matchResult1HomeTeam < matchResult1AwayTeam) {
                            this.groups[i][2].points = this.groups[i][2].points + 3;
                            this.groups[i][2].pointsPerTeam[1] = this.groups[i][2].pointsPerTeam[1] + 3;

                        } else {
                            this.groups[i][1].points = this.groups[i][1].points + 1;
                            this.groups[i][2].points = this.groups[i][2].points + 1;
                        }
                    }

                    if (matchResult2HomeTeam > matchResult2AwayTeam) {
                        this.groups[i][3].points = this.groups[i][3].points + 3;
                        this.groups[i][3].pointsPerTeam[0] = this.groups[i][3].pointsPerTeam[0] + 3;

                    } else {
                        if (matchResult2HomeTeam < matchResult2AwayTeam) {
                            this.groups[i][0].points = this.groups[i][0].points + 3;
                            this.groups[i][0].pointsPerTeam[3] = this.groups[i][0].pointsPerTeam[3] + 3;

                        } else {
                            this.groups[i][3].points = this.groups[i][3].points + 1;
                            this.groups[i][0].points = this.groups[i][0].points + 1;
                        }
                    }

                    // save extra data in case of equity
                    this.groups[i][1].goals[0] = this.groups[i][1].goals[0] + matchResult1HomeTeam;
                    this.groups[i][2].goals[0] = this.groups[i][2].goals[0] + matchResult1AwayTeam;
                    this.groups[i][3].goals[0] = this.groups[i][3].goals[0] + matchResult2HomeTeam;
                    this.groups[i][0].goals[0] = this.groups[i][0].goals[0] + matchResult2AwayTeam;

                    this.groups[i][1].goals[1] = this.groups[i][1].goals[1] + matchResult1AwayTeam;
                    this.groups[i][2].goals[1] = this.groups[i][2].goals[1] + matchResult1HomeTeam;
                    this.groups[i][3].goals[1] = this.groups[i][3].goals[1] + matchResult2AwayTeam;
                    this.groups[i][0].goals[1] = this.groups[i][0].goals[1] + matchResult2HomeTeam;

                    this.groups[i][1].goalsDifferencePerTeam[2] = this.groups[i][1].goalsDifferencePerTeam[2] + matchResult1HomeTeam - matchResult1AwayTeam;
                    this.groups[i][2].goalsDifferencePerTeam[1] = this.groups[i][2].goalsDifferencePerTeam[1] + matchResult1AwayTeam - matchResult1HomeTeam;
                    this.groups[i][3].goalsDifferencePerTeam[0] = this.groups[i][3].goalsDifferencePerTeam[0] + matchResult2HomeTeam - matchResult2AwayTeam;
                    this.groups[i][0].goalsDifferencePerTeam[3] = this.groups[i][0].goalsDifferencePerTeam[3] + matchResult2AwayTeam - matchResult2HomeTeam;

                    this.groups[i][2].awayGoalsPerTeam[1] = this.groups[i][2].awayGoalsPerTeam[1] + matchResult1AwayTeam;
                    this.groups[i][0].awayGoalsPerTeam[3] = this.groups[i][0].awayGoalsPerTeam[3] + matchResult2AwayTeam;

                    this.results.push(
                        { match: `${this.groups[i][1].name} - ${this.groups[i][2].name}`, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${this.groups[i][3].name} - ${this.groups[i][0].name}`, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );
                }
                break;
            }
            case 3: {
                for (let i = 0; i < 8; i++) {
                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    if (matchResult1HomeTeam > matchResult1AwayTeam) {
                        this.groups[i][3].points = this.groups[i][3].points + 3;
                        this.groups[i][3].pointsPerTeam[1] = this.groups[i][3].pointsPerTeam[1] + 3;

                    } else {
                        if (matchResult1HomeTeam < matchResult1AwayTeam) {
                            this.groups[i][1].points = this.groups[i][1].points + 3;
                            this.groups[i][1].pointsPerTeam[3] = this.groups[i][1].pointsPerTeam[3] + 3;

                        } else {
                            this.groups[i][3].points = this.groups[i][3].points + 1;
                            this.groups[i][1].points = this.groups[i][1].points + 1;
                        }
                    }

                    if (matchResult2HomeTeam > matchResult2AwayTeam) {
                        this.groups[i][2].points = this.groups[i][2].points + 3;
                        this.groups[i][2].pointsPerTeam[0] = this.groups[i][2].pointsPerTeam[0] + 3;

                    } else {
                        if (matchResult2HomeTeam < matchResult2AwayTeam) {
                            this.groups[i][0].points = this.groups[i][0].points + 3;
                            this.groups[i][0].pointsPerTeam[2] = this.groups[i][0].pointsPerTeam[2] + 3;

                        } else {
                            this.groups[i][2].points = this.groups[i][2].points + 1;
                            this.groups[i][0].points = this.groups[i][0].points + 1;
                        }
                    }

                    // save extra data in case of equity
                    this.groups[i][3].goals[0] = this.groups[i][3].goals[0] + matchResult1HomeTeam;
                    this.groups[i][1].goals[0] = this.groups[i][1].goals[0] + matchResult1AwayTeam;
                    this.groups[i][2].goals[0] = this.groups[i][2].goals[0] + matchResult2HomeTeam;
                    this.groups[i][0].goals[0] = this.groups[i][0].goals[0] + matchResult2AwayTeam;

                    this.groups[i][3].goals[1] = this.groups[i][3].goals[1] + matchResult1AwayTeam;
                    this.groups[i][1].goals[1] = this.groups[i][1].goals[1] + matchResult1HomeTeam;
                    this.groups[i][2].goals[1] = this.groups[i][2].goals[1] + matchResult2AwayTeam;
                    this.groups[i][0].goals[1] = this.groups[i][0].goals[1] + matchResult2HomeTeam;

                    this.groups[i][3].goalsDifferencePerTeam[1] = this.groups[i][3].goalsDifferencePerTeam[1] + matchResult1HomeTeam - matchResult1AwayTeam;
                    this.groups[i][1].goalsDifferencePerTeam[3] = this.groups[i][1].goalsDifferencePerTeam[3] + matchResult1AwayTeam - matchResult1HomeTeam;
                    this.groups[i][2].goalsDifferencePerTeam[0] = this.groups[i][2].goalsDifferencePerTeam[0] + matchResult2HomeTeam - matchResult2AwayTeam;
                    this.groups[i][0].goalsDifferencePerTeam[2] = this.groups[i][0].goalsDifferencePerTeam[2] + matchResult2AwayTeam - matchResult2HomeTeam;

                    this.groups[i][3].awayGoalsPerTeam[1] = this.groups[i][3].awayGoalsPerTeam[1] + matchResult1AwayTeam;
                    this.groups[i][2].awayGoalsPerTeam[0] = this.groups[i][2].awayGoalsPerTeam[0] + matchResult2AwayTeam;

                    this.results.push(
                        { match: `${this.groups[i][3].name} - ${this.groups[i][1].name}`, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${this.groups[i][2].name} - ${this.groups[i][0].name}`, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );
                }
                break;
            }
            case 4: {
                for (let i = 0; i < 8; i++) {
                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    if (matchResult1HomeTeam > matchResult1AwayTeam) {
                        this.groups[i][1].points = this.groups[i][1].points + 3;
                        this.groups[i][1].pointsPerTeam[3] = this.groups[i][1].pointsPerTeam[3] + 3;
                    } else {
                        if (matchResult1HomeTeam < matchResult1AwayTeam) {
                            this.groups[i][3].points = this.groups[i][3].points + 3;
                            this.groups[i][3].pointsPerTeam[1] = this.groups[i][3].pointsPerTeam[1] + 3;

                        } else {
                            this.groups[i][1].points = this.groups[i][1].points + 1;
                            this.groups[i][3].points = this.groups[i][3].points + 1;
                        }
                    }

                    if (matchResult2HomeTeam > matchResult2AwayTeam) {
                        this.groups[i][0].points = this.groups[i][0].points + 3;
                        this.groups[i][0].pointsPerTeam[2] = this.groups[i][0].pointsPerTeam[2] + 3;

                    } else {
                        if (matchResult2HomeTeam < matchResult2AwayTeam) {
                            this.groups[i][2].points = this.groups[i][2].points + 3;
                            this.groups[i][2].pointsPerTeam[0] = this.groups[i][2].pointsPerTeam[0] + 3;

                        } else {
                            this.groups[i][0].points = this.groups[i][0].points + 1;
                            this.groups[i][2].points = this.groups[i][2].points + 1;
                        }
                    }

                    // save extra data in case of equity
                    this.groups[i][1].goals[0] = this.groups[i][1].goals[0] + matchResult1HomeTeam;
                    this.groups[i][3].goals[0] = this.groups[i][3].goals[0] + matchResult1AwayTeam;
                    this.groups[i][0].goals[0] = this.groups[i][0].goals[0] + matchResult2HomeTeam;
                    this.groups[i][2].goals[0] = this.groups[i][2].goals[0] + matchResult2AwayTeam;

                    this.groups[i][1].goals[1] = this.groups[i][1].goals[1] + matchResult1AwayTeam;
                    this.groups[i][3].goals[1] = this.groups[i][3].goals[1] + matchResult1HomeTeam;
                    this.groups[i][0].goals[1] = this.groups[i][0].goals[1] + matchResult2AwayTeam;
                    this.groups[i][2].goals[1] = this.groups[i][2].goals[1] + matchResult2HomeTeam;

                    this.groups[i][1].goalsDifferencePerTeam[3] = this.groups[i][1].goalsDifferencePerTeam[3] + matchResult1HomeTeam - matchResult1AwayTeam;
                    this.groups[i][3].goalsDifferencePerTeam[1] = this.groups[i][3].goalsDifferencePerTeam[1] + matchResult1AwayTeam - matchResult1HomeTeam;
                    this.groups[i][0].goalsDifferencePerTeam[2] = this.groups[i][0].goalsDifferencePerTeam[2] + matchResult2HomeTeam - matchResult2AwayTeam;
                    this.groups[i][2].goalsDifferencePerTeam[0] = this.groups[i][2].goalsDifferencePerTeam[0] + matchResult2AwayTeam - matchResult2HomeTeam;

                    this.groups[i][1].awayGoalsPerTeam[3] = this.groups[i][1].awayGoalsPerTeam[3] + matchResult1AwayTeam;
                    this.groups[i][2].awayGoalsPerTeam[0] = this.groups[i][2].awayGoalsPerTeam[0] + matchResult2AwayTeam;

                    this.results.push(
                        { match: `${this.groups[i][1].name} - ${this.groups[i][3].name}`, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${this.groups[i][0].name} - ${this.groups[i][2].name}`, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );
                }
                break;
            }
            case 5: {
                for (let i = 0; i < 8; i++) {
                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    if (matchResult1HomeTeam > matchResult1AwayTeam) {
                        this.groups[i][3].points = this.groups[i][3].points + 3;
                        this.groups[i][3].pointsPerTeam[2] = this.groups[i][3].pointsPerTeam[2] + 3;
                    } else {
                        if (matchResult1HomeTeam < matchResult1AwayTeam) {
                            this.groups[i][2].points = this.groups[i][2].points + 3;
                            this.groups[i][2].pointsPerTeam[3] = this.groups[i][2].pointsPerTeam[3] + 3;
                        } else {
                            this.groups[i][3].points = this.groups[i][3].points + 1;
                            this.groups[i][2].points = this.groups[i][2].points + 1;
                        }
                    }

                    if (matchResult2HomeTeam > matchResult2AwayTeam) {
                        this.groups[i][1].points = this.groups[i][1].points + 3;
                        this.groups[i][1].pointsPerTeam[0] = this.groups[i][1].pointsPerTeam[0] + 3;
                    } else {
                        if (matchResult2HomeTeam < matchResult2AwayTeam) {
                            this.groups[i][0].points = this.groups[i][0].points + 3;
                            this.groups[i][0].pointsPerTeam[1] = this.groups[i][0].pointsPerTeam[1] + 3;
                        } else {
                            this.groups[i][1].points = this.groups[i][1].points + 1;
                            this.groups[i][0].points = this.groups[i][0].points + 1;
                        }
                    }

                    // save extra data in case of equity
                    this.groups[i][3].goals[0] = this.groups[i][3].goals[0] + matchResult1HomeTeam;
                    this.groups[i][2].goals[0] = this.groups[i][2].goals[0] + matchResult1AwayTeam;
                    this.groups[i][1].goals[0] = this.groups[i][1].goals[0] + matchResult2HomeTeam;
                    this.groups[i][0].goals[0] = this.groups[i][0].goals[0] + matchResult2AwayTeam;

                    this.groups[i][3].goals[1] = this.groups[i][3].goals[1] + matchResult1AwayTeam;
                    this.groups[i][2].goals[1] = this.groups[i][2].goals[1] + matchResult1HomeTeam;
                    this.groups[i][1].goals[1] = this.groups[i][1].goals[1] + matchResult2AwayTeam;
                    this.groups[i][0].goals[1] = this.groups[i][0].goals[1] + matchResult2HomeTeam;

                    this.groups[i][3].goalsDifferencePerTeam[2] = this.groups[i][3].goalsDifferencePerTeam[2] + matchResult1HomeTeam - matchResult1AwayTeam;
                    this.groups[i][2].goalsDifferencePerTeam[3] = this.groups[i][2].goalsDifferencePerTeam[3] + matchResult1AwayTeam - matchResult1HomeTeam;
                    this.groups[i][1].goalsDifferencePerTeam[0] = this.groups[i][1].goalsDifferencePerTeam[0] + matchResult2HomeTeam - matchResult2AwayTeam;
                    this.groups[i][0].goalsDifferencePerTeam[1] = this.groups[i][0].goalsDifferencePerTeam[1] + matchResult2AwayTeam - matchResult2HomeTeam;

                    this.groups[i][3].awayGoalsPerTeam[2] = this.groups[i][3].awayGoalsPerTeam[2] + matchResult1AwayTeam;
                    this.groups[i][0].awayGoalsPerTeam[1] = this.groups[i][0].awayGoalsPerTeam[1] + matchResult2AwayTeam;

                    this.results.push(
                        { match: `${this.groups[i][3].name} - ${this.groups[i][2].name}`, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${this.groups[i][1].name} - ${this.groups[i][0].name}`, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );
                }
                break;
            }
            case 6: {
                for (let i = 0; i < 8; i++) {
                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    if (matchResult1HomeTeam > matchResult1AwayTeam) {
                        this.groups[i][2].points = this.groups[i][2].points + 3;
                        this.groups[i][2].pointsPerTeam[1] = this.groups[i][2].pointsPerTeam[1] + 3;
                    } else {
                        if (matchResult1HomeTeam < matchResult1AwayTeam) {
                            this.groups[i][1].points = this.groups[i][1].points + 3;
                            this.groups[i][1].pointsPerTeam[2] = this.groups[i][1].pointsPerTeam[2] + 3;
                        } else {
                            this.groups[i][2].points = this.groups[i][2].points + 1;
                            this.groups[i][1].points = this.groups[i][1].points + 1;
                        }
                    }

                    if (matchResult2HomeTeam > matchResult2AwayTeam) {
                        this.groups[i][0].points = this.groups[i][0].points + 3;
                        this.groups[i][0].pointsPerTeam[3] = this.groups[i][0].pointsPerTeam[3] + 3;
                    } else {
                        if (matchResult2HomeTeam < matchResult2AwayTeam) {
                            this.groups[i][3].points = this.groups[i][3].points + 3;
                            this.groups[i][3].pointsPerTeam[0] = this.groups[i][3].pointsPerTeam[0] + 3;
                        } else {
                            this.groups[i][0].points = this.groups[i][0].points + 1;
                            this.groups[i][3].points = this.groups[i][3].points + 1;
                        }
                    }

                    // save extra data in case of equity
                    this.groups[i][2].goals[0] = this.groups[i][2].goals[0] + matchResult1HomeTeam;
                    this.groups[i][1].goals[0] = this.groups[i][1].goals[0] + matchResult1AwayTeam;
                    this.groups[i][0].goals[0] = this.groups[i][0].goals[0] + matchResult2HomeTeam;
                    this.groups[i][3].goals[0] = this.groups[i][3].goals[0] + matchResult2AwayTeam;

                    this.groups[i][2].goals[1] = this.groups[i][2].goals[1] + matchResult1AwayTeam;
                    this.groups[i][1].goals[1] = this.groups[i][1].goals[1] + matchResult1HomeTeam;
                    this.groups[i][0].goals[1] = this.groups[i][0].goals[1] + matchResult2AwayTeam;
                    this.groups[i][3].goals[1] = this.groups[i][3].goals[1] + matchResult2HomeTeam;

                    this.groups[i][2].goalsDifferencePerTeam[1] = this.groups[i][2].goalsDifferencePerTeam[1] + matchResult1HomeTeam - matchResult1AwayTeam;
                    this.groups[i][1].goalsDifferencePerTeam[2] = this.groups[i][1].goalsDifferencePerTeam[2] + matchResult1AwayTeam - matchResult1HomeTeam;
                    this.groups[i][0].goalsDifferencePerTeam[3] = this.groups[i][0].goalsDifferencePerTeam[3] + matchResult2HomeTeam - matchResult2AwayTeam;
                    this.groups[i][3].goalsDifferencePerTeam[0] = this.groups[i][3].goalsDifferencePerTeam[0] + matchResult2AwayTeam - matchResult2HomeTeam;

                    this.groups[i][1].awayGoalsPerTeam[2] = this.groups[i][1].awayGoalsPerTeam[2] + matchResult1AwayTeam;
                    this.groups[i][3].awayGoalsPerTeam[0] = this.groups[i][3].awayGoalsPerTeam[0] + matchResult2AwayTeam;

                    this.results.push(
                        { match: `${this.groups[i][2].name} - ${this.groups[i][1].name}`, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${this.groups[i][1].name} - ${this.groups[i][0].name}`, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );
                }
                break;
            }
            case 7: {
                let pot1 = [...this.sortedGroups].map(g => g[0]);
                let pot2 = [...this.sortedGroups].map(g => g[1]);
                this.oneEighths = [...pot1, ...pot2];

                for (let i = 0; i < 8; i++) {
                    const team1 = pot1[Math.floor(Math.random() * pot1.length)];
                    pot1 = pot1.filter(a => a.name !== team1.name);

                    const team2 = pot2[Math.floor(Math.random() * pot2.length)];
                    pot2 = pot2.filter(a => a.name !== team2.name);

                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    this.oneEightsResults.push(
                        { match: `${team2.name} - ${team1.name}`, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${team1.name} - ${team2.name}`, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );

                    if (matchResult2HomeTeam + matchResult1AwayTeam > matchResult1HomeTeam + matchResult2AwayTeam) {
                        this.quarterfinals.push(team1);
                        this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                            {
                                comment: `${team1.name} won
                                ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} on aggregate`,
                            });
                    } else {
                        if (matchResult2HomeTeam + matchResult1AwayTeam < matchResult1HomeTeam + matchResult2AwayTeam) {
                            this.quarterfinals.push(team2);
                            this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                {
                                    comment: `${team2.name} won
                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} on aggregate`,
                                });
                        } else {
                            if (matchResult1AwayTeam > matchResult2AwayTeam) {
                                this.quarterfinals.push(team1);
                                this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                    {
                                        comment: `${team1.name} won
                                        ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} on away goals`,
                                    });
                            } else {
                                if (matchResult1AwayTeam < matchResult2AwayTeam) {
                                    this.quarterfinals.push(team2);
                                    this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                        {
                                            comment: `${team2.name} won
                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} on away goals`,
                                        });
                                } else {
                                    const extraGoals1 = Math.floor(Math.random() * 2);
                                    const extraGoals2 = Math.floor(Math.random() * 2);
                                    let penatlyGoals1 = Math.floor(Math.random() * 5);
                                    let penatlyGoals2 = Math.floor(Math.random() * 5);

                                    if (extraGoals1 > extraGoals2) {
                                        this.quarterfinals.push(team1);
                                        this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                            {
                                                comment:
                                                    `${team1.name} won
                                                    ${matchResult2HomeTeam + matchResult1AwayTeam + extraGoals1}:${matchResult1HomeTeam + matchResult2AwayTeam + extraGoals2}
                                                    on aggregate in extra time
                                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                    (${extraGoals1}:${extraGoals2})`,
                                            });
                                    } else {
                                        if (extraGoals1 < extraGoals2) {
                                            this.quarterfinals.push(team2);
                                            this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                {
                                                    comment:
                                                        `${team2.name} won
                                                        ${matchResult2HomeTeam + matchResult1AwayTeam + extraGoals1}:${matchResult1HomeTeam + matchResult2AwayTeam + extraGoals2}
                                                        on aggregate in extra time
                                                        ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                        (${extraGoals1}:${extraGoals2})`,
                                                });
                                        } else {
                                            if (matchResult1AwayTeam + extraGoals1 > matchResult2AwayTeam) {
                                                this.quarterfinals.push(team1);
                                                this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                    {
                                                        comment: `${team1.name} won on away goals in extra time
                                                        ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                        (${extraGoals1}:${extraGoals2})`,
                                                    });
                                            } else {
                                                if (matchResult1AwayTeam + extraGoals1 < matchResult2AwayTeam) {
                                                    this.quarterfinals.push(team2);
                                                    this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                        {
                                                            comment:
                                                                `${team2.name} won on away goals in extra time
                                                                ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                (${extraGoals1}:${extraGoals2})`,
                                                        });
                                                } else {
                                                    if (penatlyGoals1 > penatlyGoals2) {
                                                        this.quarterfinals.push(team1);
                                                        this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                            {
                                                                comment:
                                                                    `${team1.name} won on penalties
                                                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                    (${extraGoals1}:${extraGoals2})
                                                                    Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                            });
                                                    } else {
                                                        if (penatlyGoals1 < penatlyGoals2) {
                                                            this.quarterfinals.push(team2);
                                                            this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                                {
                                                                    comment:
                                                                        `${team2.name} won on penalties
                                                                        ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                        (${extraGoals1}:${extraGoals2}) Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                });
                                                        } else {
                                                            do {
                                                                penatlyGoals1 = penatlyGoals1 + Math.floor(Math.random() * 1);
                                                                penatlyGoals2 = penatlyGoals2 + Math.floor(Math.random() * 1);
                                                            } while (penatlyGoals1 === penatlyGoals2);

                                                            if (penatlyGoals1 > penatlyGoals2) {
                                                                this.quarterfinals.push(team1);
                                                                this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                                    {
                                                                        comment:
                                                                            `${team1.name} won on penalties
                                                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                            (${extraGoals1}:${extraGoals2}) Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                    });
                                                            } else {
                                                                this.quarterfinals.push(team2);
                                                                this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                                    {
                                                                        comment:
                                                                            `${team2.name} won on penalties
                                                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                            (${extraGoals1}:${extraGoals2}) Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                    });
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.quarterfinalTeams = [...this.quarterfinals];
                break;
            }
            case 8: {
                for (let i = 0; i < 4; i++) {
                    const team1 = this.quarterfinals[Math.floor(Math.random() * this.quarterfinals.length)];
                    this.quarterfinals = this.quarterfinals.filter(a => a.name !== team1.name);

                    const team2 = this.quarterfinals[Math.floor(Math.random() * this.quarterfinals.length)];
                    this.quarterfinals = this.quarterfinals.filter(a => a.name !== team2.name);

                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    this.quarterfinalsResults.push(
                        { match: `${team2.name} - ${team1.name} `, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${team1.name} - ${team2.name} `, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );

                    if (matchResult2HomeTeam + matchResult1AwayTeam > matchResult1HomeTeam + matchResult2AwayTeam) {
                        this.semifinals.push(team1);
                        this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                            {
                                comment: `${team1.name} won
                                ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} on aggregate`,
                            });
                    } else {
                        if (matchResult2HomeTeam + matchResult1AwayTeam < matchResult1HomeTeam + matchResult2AwayTeam) {
                            this.semifinals.push(team2);
                            this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                {
                                    comment: `${team2.name} won
                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} on aggregate`,
                                });
                        } else {
                            if (matchResult1AwayTeam > matchResult2AwayTeam) {
                                this.semifinals.push(team1);
                                this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                    { comment: `${team1.name} won on away goals` });
                            } else {
                                if (matchResult1AwayTeam < matchResult2AwayTeam) {
                                    this.semifinals.push(team2);
                                    this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                        { comment: `${team2.name} won on away goals` });
                                } else {
                                    const extraGoals1 = this.getRandomNumber(2);
                                    const extraGoals2 = this.getRandomNumber(2);
                                    let penatlyGoals1 = this.getRandomNumber(5);
                                    let penatlyGoals2 = this.getRandomNumber(5);

                                    if (extraGoals1 > extraGoals2) {
                                        this.semifinals.push(team1);
                                        this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                            {
                                                comment:
                                                    `${team1.name} won
                                                    ${matchResult2HomeTeam + matchResult1AwayTeam + extraGoals1}:${matchResult1HomeTeam + matchResult2AwayTeam + extraGoals2}
                                                    on aggregate in extra time
                                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                    (${extraGoals1}:${extraGoals2})`,
                                            });
                                    } else {
                                        if (extraGoals1 < extraGoals2) {
                                            this.semifinals.push(team2);
                                            this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                                {
                                                    comment:
                                                        `${team2.name} won
                                                        ${matchResult2HomeTeam + matchResult1AwayTeam + extraGoals1}:${matchResult1HomeTeam + matchResult2AwayTeam + extraGoals2}
                                                        on aggregate in extra time
                                                        ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                        (${extraGoals1}:${extraGoals2})`,
                                                });
                                        } else {
                                            if (matchResult1AwayTeam + extraGoals1 > matchResult2AwayTeam) {
                                                this.semifinals.push(team1);
                                                this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                                    {
                                                        comment:
                                                            `${team1.name} won on away goals in extra time
                                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                            (${extraGoals1}:${extraGoals2})`,
                                                    });
                                            } else {
                                                if (matchResult1AwayTeam + extraGoals1 < matchResult2AwayTeam) {
                                                    this.semifinals.push(team2);
                                                    this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                                        {
                                                            comment:
                                                                `${team2.name} won on away goals in extra time
                                                                ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                (${extraGoals1}:${extraGoals2})`,
                                                        });
                                                } else {
                                                    if (penatlyGoals1 > penatlyGoals2) {
                                                        this.semifinals.push(team1);
                                                        this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                                            {
                                                                comment:
                                                                    `${team1.name} won on penalties
                                                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                    (${extraGoals1}:${extraGoals2}) Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                            });
                                                    } else {
                                                        if (penatlyGoals1 < penatlyGoals2) {
                                                            this.semifinals.push(team2);
                                                            this.quarterfinalsResults[i * 2 + 1] = Object.assign(this.quarterfinalsResults[i * 2 + 1],
                                                                {
                                                                    comment:
                                                                        `${team2.name} won on penalties
                                                                        ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} (${extraGoals1}:${extraGoals2})
                                                                        Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                });
                                                        } else {
                                                            do {
                                                                penatlyGoals1 = penatlyGoals1 + Math.floor(Math.random() * 1);
                                                                penatlyGoals2 = penatlyGoals2 + Math.floor(Math.random() * 1);
                                                            } while (penatlyGoals1 === penatlyGoals2);

                                                            if (penatlyGoals1 > penatlyGoals2) {
                                                                this.semifinals.push(team1);
                                                                this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                                    {
                                                                        comment:
                                                                            `${team1.name} won on penalties
                                                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:
                                                                            ${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                            (${extraGoals1}:${extraGoals2}) Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                    });
                                                            } else {
                                                                this.semifinals.push(team2);
                                                                this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                                    {
                                                                        comment:
                                                                            `${team2.name} won on penalties
                                                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                            (${extraGoals1}:${extraGoals2})
                                                                            Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                    });
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.semifinalTeams = [...this.semifinals];
                break;
            }
            case 9: {
                for (let i = 0; i < 2; i++) {
                    const team1 = this.semifinals[Math.floor(Math.random() * this.quarterfinals.length)];
                    this.semifinals = this.semifinals.filter(a => a.name !== team1.name);
                    const team2 = this.semifinals[Math.floor(Math.random() * this.quarterfinals.length)];
                    this.semifinals = this.semifinals.filter(a => a.name !== team2.name);

                    const matchResult1HomeTeam = this.getRandomNumber(4);
                    const matchResult1AwayTeam = this.getRandomNumber(4);
                    const matchResult2HomeTeam = this.getRandomNumber(4);
                    const matchResult2AwayTeam = this.getRandomNumber(4);

                    this.semifinalsResults.push(
                        { match: `${team2.name} - ${team1.name} `, score: [matchResult1HomeTeam, matchResult1AwayTeam] },
                        { match: `${team1.name} - ${team2.name} `, score: [matchResult2HomeTeam, matchResult2AwayTeam] }
                    );

                    if (matchResult2HomeTeam + matchResult1AwayTeam > matchResult1HomeTeam + matchResult2AwayTeam) {
                        this.final.push(team1);
                        this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                            {
                                comment: `${team1.name} won
                                ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} on aggregate `,
                            });
                    } else {
                        if (matchResult2HomeTeam + matchResult1AwayTeam < matchResult1HomeTeam + matchResult2AwayTeam) {
                            this.final.push(team2);
                            this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                {
                                    comment: `${team2.name} won
                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam} on aggregate `,
                                });
                        } else {
                            if (matchResult1AwayTeam > matchResult2AwayTeam) {
                                this.final.push(team1);
                                this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                    { comment: `${team1.name} won on away goals` });
                            } else {
                                if (matchResult1AwayTeam < matchResult2AwayTeam) {
                                    this.final.push(team2);
                                    this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                        { comment: `${team2.name} won on away goals` });
                                } else {
                                    const extraGoals1 = this.getRandomNumber(2);
                                    const extraGoals2 = this.getRandomNumber(2);
                                    let penatlyGoals1 = this.getRandomNumber(5);
                                    let penatlyGoals2 = this.getRandomNumber(5);

                                    if (extraGoals1 > extraGoals2) {
                                        this.final.push(team1);
                                        this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                            {
                                                comment:
                                                    `${team1.name} won on
                                                    ${matchResult2HomeTeam + matchResult1AwayTeam + extraGoals1}:${matchResult1HomeTeam + matchResult2AwayTeam + extraGoals2}
                                                    on aggregate aggregate in extra time
                                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                    (${extraGoals1}:${extraGoals2})`,
                                            });
                                    } else {
                                        if (extraGoals1 < extraGoals2) {
                                            this.final.push(team2);
                                            this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                                {
                                                    comment:
                                                        `${team2.name} won
                                                        ${matchResult2HomeTeam + matchResult1AwayTeam + extraGoals1}:${matchResult1HomeTeam + matchResult2AwayTeam + extraGoals2}
                                                        on aggregate in extra time
                                                        ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                        (${extraGoals1}:${extraGoals2})`,
                                                });
                                        } else {
                                            if (matchResult1AwayTeam + extraGoals1 > matchResult2AwayTeam) {
                                                this.final.push(team1);
                                                this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                                    {
                                                        comment:
                                                            `${team1.name} won on away goals in extra time
                                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                            (${extraGoals1}:${extraGoals2})`,
                                                    });
                                            } else {
                                                if (matchResult1AwayTeam + extraGoals1 < matchResult2AwayTeam) {
                                                    this.final.push(team2);
                                                    this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                                        {
                                                            comment:
                                                                `${team2.name} won on away goals in extra time
                                                                ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                (${extraGoals1}:${extraGoals2})`,
                                                        });
                                                } else {
                                                    if (penatlyGoals1 > penatlyGoals2) {
                                                        this.final.push(team1);
                                                        this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                                            {
                                                                comment:
                                                                    `${team1.name} won on penalties
                                                                    ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                    (${extraGoals1}:${extraGoals2}) Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                            });
                                                    } else {
                                                        if (penatlyGoals1 < penatlyGoals2) {
                                                            this.final.push(team2);
                                                            this.semifinalsResults[i * 2 + 1] = Object.assign(this.semifinalsResults[i * 2 + 1],
                                                                {
                                                                    comment:
                                                                        `${team2.name} won on penalties ${matchResult2HomeTeam + matchResult1AwayTeam}:
                                                                        ${matchResult1HomeTeam + matchResult2AwayTeam} (${extraGoals1}:${extraGoals2})
                                                                        Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                });
                                                        } else {
                                                            do {
                                                                penatlyGoals1 = penatlyGoals1 + Math.floor(Math.random() * 1);
                                                                penatlyGoals2 = penatlyGoals2 + Math.floor(Math.random() * 1);
                                                            } while (penatlyGoals1 === penatlyGoals2);

                                                            if (penatlyGoals1 > penatlyGoals2) {
                                                                this.final.push(team1);
                                                                this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                                    {
                                                                        comment:
                                                                            `${team1.name} won on penalties
                                                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                            (${extraGoals1}:${extraGoals2}) Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                    });
                                                            } else {
                                                                this.final.push(team2);
                                                                this.oneEightsResults[i * 2 + 1] = Object.assign(this.oneEightsResults[i * 2 + 1],
                                                                    {
                                                                        comment:
                                                                            `${team2.name} won on penalties
                                                                            ${matchResult2HomeTeam + matchResult1AwayTeam}:${matchResult1HomeTeam + matchResult2AwayTeam}
                                                                            (${extraGoals1}:${extraGoals2}) Pen. (${penatlyGoals1}:${penatlyGoals2})`,
                                                                    });
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            }
            case 10: {
                const finalResultHomeTeam = this.getRandomNumber(4);
                const finalResultAwayTeam = this.getRandomNumber(4);

                this.finalResults.push({ match: `${this.final[0].name} - ${this.final[1].name} `, score: [finalResultHomeTeam, finalResultAwayTeam] });

                if (finalResultHomeTeam === finalResultAwayTeam) {
                    const extraGoals1 = this.getRandomNumber(2);
                    const extraGoals2 = this.getRandomNumber(2);

                    if (extraGoals1 === extraGoals2) {
                        let penaltyGoals1 = this.getRandomNumber(5);
                        let penaltyGoals2 = this.getRandomNumber(5);

                        if (penaltyGoals1 === penaltyGoals2) {
                            do {
                                penaltyGoals1 = penaltyGoals1 + this.getRandomNumber(1);
                                penaltyGoals2 = penaltyGoals2 + this.getRandomNumber(1);
                            } while (penaltyGoals1 === penaltyGoals2);
                            this.finalResults[0] = Object.assign(this.finalResults[0],
                                {
                                    comment: `Extra time ${extraGoals1}:${extraGoals2} Penalties ${penaltyGoals1}:${penaltyGoals2}`,
                                });
                        } else {
                            this.finalResults[0] = Object.assign(this.finalResults[0],
                                {
                                    comment: `Extra time ${extraGoals1}:${extraGoals2} Penalties ${penaltyGoals1}:${penaltyGoals2}`,
                                });
                        }
                    } else {
                        this.finalResults[0] = Object.assign(this.finalResults[0], { comment: `Extra time ${extraGoals1}:${extraGoals2}` });
                    }
                }
            }
        }

        this.sortedGroups = this.sortedGroups.map(g => g.sort((a, b) => {
            if (a.points > b.points) {
                return -1;
            } else {
                if (a.points < b.points) {
                    return 1;
                } else {
                    if (a.pointsPerTeam[b.pot - 1] > b.pointsPerTeam[a.pot - 1]) {
                        return -1;
                    } else {
                        if (a.pointsPerTeam[b.pot - 1] < b.pointsPerTeam[a.pot - 1]) {
                            return 1;

                        } else {
                            if (a.goalsDifferencePerTeam[b.pot - 1] > b.goalsDifferencePerTeam[a.pot - 1]) {
                                return -1;
                            } else {
                                if (a.goalsDifferencePerTeam[b.pot - 1] < b.goalsDifferencePerTeam[a.pot - 1]) {
                                    return 1;
                                } else {
                                    if (a.awayGoalsPerTeam[b.pot - 1] > b.awayGoalsPerTeam[a.pot - 1]) {
                                        return -1;
                                    } else {
                                        if (a.awayGoalsPerTeam[b.pot - 1] < b.awayGoalsPerTeam[a.pot - 1]) {
                                            return 1;
                                        } else {
                                            if (a.goals[0] - a.goals[1] > b.goals[0] - b.goals[1]) {
                                                return -1;
                                            } else {
                                                if (a.goals[0] - a.goals[1] < b.goals[0] - b.goals[1]) {
                                                    return 1;
                                                } else {
                                                    if (a.goals[0] > b.goals[0]) {
                                                        return -1;
                                                    } else {
                                                        if (a.goals[0] < b.goals[0]) {
                                                            return 1;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }));

        this.day = this.day + 1;
    }

    getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

}
