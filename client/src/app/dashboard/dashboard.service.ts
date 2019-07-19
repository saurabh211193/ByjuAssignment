import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpRequestService } from '../services/http-request.service';

@Injectable()
export class DashboardService {

    constructor(private http: HttpRequestService) { }

    getAllCompanies(options): Observable<any> {
        return this.http.post('company/allcompanies', null, options);
    }

    markFav(data): Observable<any> {
        return this.http.post(`company/userfavourite`, data);
    }

    getFavCompanies(userId): Observable<any> {
        return this.http.post(`company/favourite/${userId}`);
    }
}


