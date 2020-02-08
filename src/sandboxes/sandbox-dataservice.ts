import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IChartData } from './sandbox-data-model';
import { map } from 'rxjs/operators';

@Injectable()
export class SandboxDataService {
    constructor(private http: HttpClient) { }

    getGoalsData(): Observable<any> {
        return this.http
            .get<any>(`assets/epl1819.json`)
            .pipe(
                map((data) => data.data.map(x => x.goals)),
            );
    }
}
