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
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


    signupForm: FormGroup;
    formErrors: FormErrors = {
        'email': '',
        'password': '',
        'name': ''
    };
    validationMessages: ValidationMessages = {
        'email': {
            'required': 'Email Id is required',
            'email': 'Enter valid email',
        },
        'name': {
            'required': 'Name is required',
        },
        'password': {
            'required': 'Password is required',
        },
    };

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
        this.signupForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            name: ['', Validators.compose([Validators.required])],
            password: [''],
        });

        this.signupForm.valueChanges.subscribe(data => {
            this.formErrors = GlobalValidator.validateForm(this.signupForm, this.validationMessages);
        });
    }

    login() {
        if (this.signupForm.invalid) {
            this.formErrors = GlobalValidator.validateForm(this.signupForm, this.validationMessages, true);
            return;
        } else {

            const userData = Object.assign({}, this.signupForm.value);
            delete userData.confirmpassword;

            this.userService.signup(userData).subscribe(
                (res: LoginResponse) => {
                    if (res.statusCode !== 200) {
                        this.globalService.errorResponse(res.message);
                    } else {
                        this.globalService.setUserCredential(res.data);
                        this.globalService.successResponse(res.message);
                        this.signupForm.reset();
                    }
                },
                (err) => {
                    console.error(err);
                }
            )
        };
    }

}
