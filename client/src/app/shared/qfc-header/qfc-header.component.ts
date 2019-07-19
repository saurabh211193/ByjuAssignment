
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-qfc-header',
    templateUrl: './qfc-header.component.html',
    styleUrls: ['./qfc-header.component.css']
})
export class QfcHeaderComponent implements OnInit {

    userDetails: any;;
    constructor(private router: Router,
        private globalService: GlobalService) { }

    ngOnInit() {
        this.userDetails = this.globalService.getUserCredential()['userData'];

    }
}
