import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

    constructor(private globalService: GlobalService) { }

    ngOnInit() {

    }


}
