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
    selector: 'app-user-verify',
    templateUrl: './user-verify.component.html',
    styleUrls: ['./user-verify.component.css']
})
export class UserVerifyComponent implements OnInit {


    verifyUserForm: FormGroup;
    formErrors: FormErrors = {
        'verifyToken': '',
    };
    validationMessages: ValidationMessages = {
        'verifyToken': {
            'required': 'Token is required',
        },
    };

    constructor(private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private dyComService: DynamicComponentService,
        private globalService: GlobalService
    ) { }

    ngOnInit() {
        this.globalService.deleteUserCredential()
        this.buildForm();
    }

    buildForm() {
        this.verifyUserForm = this.fb.group({
            verifyToken: ['', Validators.compose([Validators.required])],

        });

        this.verifyUserForm.valueChanges.subscribe(data => {
            this.formErrors = GlobalValidator.validateForm(this.verifyUserForm, this.validationMessages);
        });
    }

    verifyUser() {
        if (this.verifyUserForm.invalid) {
            this.formErrors = GlobalValidator.validateForm(this.verifyUserForm, this.validationMessages, true);
            return;
        } else {

            const userData = Object.assign({}, this.verifyUserForm.value);


            this.userService.verifyUser(userData).subscribe(
                (res: LoginResponse) => {
                    if (res.statusCode !== 200) {
                        this.globalService.errorResponse(res.message);
                    } else {
                        this.globalService.successResponse(res.message);
                    }
                },
                (err) => {
                    console.error(err);
                }
            )
        }
    }

}
