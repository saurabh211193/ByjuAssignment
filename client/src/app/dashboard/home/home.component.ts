import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpParams } from '@angular/common/http';

import { GlobalService } from '../../services/global.service';
import { DashboardService } from '../dashboard.service';

import { FormErrors, ValidationMessages, GlobalValidator } from '../../global-validator';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    searchForm: FormGroup;
    companies: any;
    userDetails: any;
    favCompanies: any;

    constructor(private router: Router,
        private fb: FormBuilder,
        private globalService: GlobalService,
        private dashboardService: DashboardService) { }

    ngOnInit() {
        this.userDetails = this.globalService.getUserCredential();
        this.buildForm();
        this.getAllCompanies();
        this.getFavCompanies();
    }

    buildForm() {
        this.searchForm = this.fb.group({
            name: [''],
        });

        // this.loginForm.valueChanges.subscribe(data => {
        //     this.formErrors = GlobalValidator.validateForm(this.loginForm, this.validationMessages);
        // });
    }

    getAllCompanies() {
        console.log(this.searchForm.value)
        let params = new HttpParams();
        params = params.set('name', this.searchForm.value.name || '')

        this.dashboardService.getAllCompanies(params).subscribe(
            (res) => {
                this.companies = res.data;
            },
            (err) => {
                console.error(err);
            }
        )
    }

    markFav(company) {
        const companyData = Object.assign({}, {
            userId: this.userDetails.userId,
            companyId: company.companyId,
            isFav: 1,
        });

        this.dashboardService.markFav(companyData).subscribe(
            (res) => {
                this.getAllCompanies();
            },
            (err) => {
                console.error(err);
            }
        )
    }

    getFavCompanies() {

        this.dashboardService.getFavCompanies(this.userDetails.userId).subscribe(
            (res) => {
                this.favCompanies = res.data;
            },
            (err) => {
                console.error(err);
            }
        )
    }
}
