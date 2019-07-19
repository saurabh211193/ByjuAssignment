import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { QfcHeaderComponent } from './qfc-header/qfc-header.component';

import { QfcInputComponent } from './qfc-input/qfc-input.component';
import { QfcLoaderComponent } from './qfc-loader/qfc-loader.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';


import { DynamicComponentService } from './dynamic-component.service';
import { LoaderService } from './loader.service';

@NgModule({
    declarations: [
        QfcHeaderComponent,
        QfcInputComponent,
        QfcLoaderComponent,
        AlertDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        QfcHeaderComponent,
        QfcInputComponent,
        QfcLoaderComponent,
        AlertDialogComponent,
    ],
    providers: [DynamicComponentService, LoaderService],
    entryComponents: [AlertDialogComponent]
})
export class SharedModule { }
