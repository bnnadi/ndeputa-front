import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/services';

@Component({
    templateUrl: './list.timesheet.component.html'
})
export class ListTimesheetComponent implements OnInit {
    constructor(private us: UserService) {}

    ngOnInit() {
      // set the active tab to user Access
    }

    beforeChange($e: NgbTabChangeEvent) {
      if (this.us.getAccess() !== ($e.nextId || 'full')) {
        $e.preventDefault();
      }
    }
}
