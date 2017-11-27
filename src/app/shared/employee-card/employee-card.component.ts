import { Component, Input, OnChanges } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'employee-card',
  templateUrl: './employee-card.component.html'
})

export class EmployeeCardComponent implements OnChanges {
  @Input() person: any;
  imgUrl: string;

  constructor() {
    this.imgUrl = 'assets/img/avatars/profile-placeholder.png';
  }

  ngOnChanges() {}


 }
