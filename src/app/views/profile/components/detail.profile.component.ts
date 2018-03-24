import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services';
import { User } from 'app/models';

@Component({
    templateUrl: './detail.profile.component.html'
})
export class DetailProfileComponent implements OnInit {
    user: User;
    constructor(private us: UserService) {}

    ngOnInit() {
        this.user = this.us.getCurrentUser();
    }

    updateProfile() {
        console.log('Updating Profile...')
    }

    addPhone() {
        console.log('Adding Phone Number...')
    }

    addAddress() {
        console.log('Adding Address...')
    }
}