import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { CookieService } from './cookie.service';
import { DynamicComponentService } from '../shared/dynamic-component.service';

import { AlertDialogComponent, AlertDialogOptionsI } from '../shared/alert-dialog/alert-dialog.component';

@Injectable()
export class GlobalService {
    privateIp: any = '';
    private userDetails = new Subject<any>();
    constructor(private cookieService: CookieService,
        private http: HttpClient,
        private dyComService: DynamicComponentService) {
    }

    getUserCredential() {

        if (sessionStorage.getItem(('user'))) {
            const obj = atob(sessionStorage.getItem(('user')));
            return JSON.parse(obj);
        } else {
            sessionStorage.clear();
        }

    }

    setUserCredential(userCredential) {


        this.deleteUserCredential()
        let user = btoa(JSON.stringify(userCredential));
        sessionStorage.setItem('user', user);
        this.cookieService.setCookie('user', user.toString(), 7);
    }

    deleteUserCredential() {
        // this.cookieService.deleteCookie('user');
        localStorage.clear();
        sessionStorage.clear();
    }


    private initializeReqOptions(queryParams?: HttpParams) {
        const reqOptions = new Object();

        let headers = new HttpHeaders();
        reqOptions['params'] = queryParams;

        return reqOptions;
    }

    successResponse(successMessage) {
        const options: AlertDialogOptionsI = {
            title: 'Success',
            message: successMessage,
            confirmText: 'OK'
        };
        this.response(options);
    }

    errorResponse(errorMesaage) {
        const options: AlertDialogOptionsI = {
            title: 'Error',
            message: errorMesaage,
            confirmText: 'OK'
        };
        this.response(options);
    }

    response(options) {
        this.dyComService.loadComponent(AlertDialogComponent, options).subscribe((data) => {
            console.log(data);
        });
    }

}

