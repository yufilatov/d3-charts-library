import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class SandboxDataService {
    constructor(private http: HttpClient) { }

    getData(): Observable<any> {
        return this.http
            .get<any>(`assets/epl1819.json`)
            .pipe(
                map(data => data.data)
            );
    }
}
