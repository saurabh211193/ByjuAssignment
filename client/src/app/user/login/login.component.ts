import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { FormErrors, ValidationMessages, GlobalValidator } from '../../global-validator';

import { UserService } from '../user.service';
import { DynamicComponentService } from '../../shared/dynamic-component.service';
import { GlobalService } from '../../services/global.service';
import { AlertDialogComponent, AlertDialogOptionsI } from '../../shared/alert-dialog/alert-dialog.component';
import { LoginResponse } from '../user';
import browser from 'browser-detect';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    formErrors: FormErrors = {
        'email': '',
        'password': ''
    };
    validationMessages: ValidationMessages = {
        'email': {
            'required': 'Login Id is required',
            'email': 'Enter valid email',
        },
        'password': {
            'required': 'Password is required',
        }
    };
    userDetails: any;

    constructor(private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private dyComService: DynamicComponentService,
        private globalService: GlobalService) { }

    ngOnInit() {
        this.globalService.deleteUserCredential()
        this.buildForm();
    }

    buildForm() {
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required])],
        });

        this.loginForm.valueChanges.subscribe(data => {
            this.formErrors = GlobalValidator.validateForm(this.loginForm, this.validationMessages);
        });
    }

    login() {

        if (this.loginForm.invalid) {
            this.formErrors = GlobalValidator.validateForm(this.loginForm, this.validationMessages, true);
            return;
        } else {
            const userData = Object.assign({}, this.loginForm.value);


            this.userService.login(userData).subscribe(
                (res: LoginResponse) => {
                    if (res.statusCode !== 200) {
                        this.globalService.errorResponse(res.message);
                    } else {
                        this.globalService.setUserCredential(res.data);
                        this.router.navigate([`/dashboard`]);
                        // this.globalService.successResponse(res.message);
                        this.loginForm.reset();
                    }
                },
                (err) => {
                    console.error(err);
                }
            )
        }
    }


}

