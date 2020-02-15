import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class SandboxDataService {
    constructor(private http: HttpClient) { }

    getData(season): Observable<any> {
        return this.http
            .get<any>(`assets/epl${season}.json`)
            .pipe(
                map(data => data.data)
            );
    }

    getHistoryData(): Observable<any> {
        return this.http
            .get<any>(`assets/epl-clubs-position.json`)
            .pipe(
                map(data => data.data)
            );
    }
}
