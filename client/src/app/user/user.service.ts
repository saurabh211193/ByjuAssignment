import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpRequestService } from '../services/http-request.service';

@Injectable()
export class UserService {

    constructor(private http: HttpRequestService) { }

    login(data): Observable<Object> {
        return this.http.post('user/login', data);
    }

    signup(data): Observable<Object> {
        return this.http.post('user/signup', data);
    }

    verifyUser(data): Observable<Object> {
        return this.http.post(`user/verify`, data);
    }
}
