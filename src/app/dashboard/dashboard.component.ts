import { Component, OnInit } from '@angular/core';
import { A2BBAuthService } from '../services/a2bb-auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Granter } from '../models/granter';
import { FormGroup } from '@angular/forms';
import { Const } from '../const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[];
  granters: Granter[];
  newUserName: string;
  newUserPass: string;
  newGranterId: string;
  selectedUser: User;
  selectedGranter: Granter;
  newUserInfo: string;
  newGranterInfo: string;
  linkGranterInfo: string;

  constructor(private _router: Router, private _a2bbAuthService: A2BBAuthService) { }

  ngOnInit() {
    this.refreshUsers();
    this.refreshGranters();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  selectGranter(granter: Granter) {
    this.selectedGranter = granter;
  }

  refreshUsers(): void {
    this._a2bbAuthService.get(Const.ID_SRV_ENDPOINT + '/api/admin/users').then((res) => {
      this.users = res.json() as User[];
    }).catch((err) => {
      console.log(err);
      this._router.navigate(['/login']);
    });
  }

  refreshGranters(): void {
    this._a2bbAuthService.get(Const.API_ENDPOINT + '/api/admin/granter').then((res) => {
      this.granters = res.json().payload as Granter[];
    }).catch((err) => {
      console.log(err);
      this._router.navigate(['/login']);
    });
  }

  createNewUser(form: FormGroup): void {
    const user = new User();
    user.userName = this.newUserName;
    let isOk = false;

    this._a2bbAuthService.post(Const.ID_SRV_ENDPOINT + '/api/admin/users', {
      user: user,
      password: this.newUserPass
    }).then((res) => {
      const response = res.json();

      if (response.code === 0) {
        this.newUserInfo = 'Ok!';
        isOk = true;
        return this.refreshUsers();
      }

      this.newUserInfo = response.message.trim();
      if (response.payload.errors) {
        response.payload.errors.forEach(e => {
          this.newUserInfo += '\n' + e.description;
        });
      }

      isOk = false;
    }).then(() => {
      if (isOk) {
        form.reset();
      }
    }).catch((err) => {
      console.log(err);
      this.newUserInfo = 'Unknown error: ' + JSON.stringify(err);
    });
  }

  linkGranter(): void {
    this.selectedGranter.subId = this.selectedUser.id;

    this._a2bbAuthService.put(Const.API_ENDPOINT + '/api/admin/granter/' + this.selectedGranter.id, this.selectedGranter).then((res) => {
      const response = res.json();

      if (response.code === 0) {
        this.linkGranterInfo = 'Ok!';
        return this.refreshGranters();
      }

      this.linkGranterInfo = 'Error: ' + response.message;
    }).catch((err) => {
      console.log(err);
      this.linkGranterInfo = 'Unknown error: ' + JSON.stringify(err);
      this.refreshGranters();
    });
  }

  createNewGranter(form: FormGroup): void {
    const granter = new Granter();
    granter.id = this.newGranterId;
    let isOk = false;

    this._a2bbAuthService.post(Const.API_ENDPOINT + '/api/admin/granter', granter).then((res) => {
      const response = res.json();

      if (response.code === 0) {
        this.newGranterInfo = 'Ok!';
        isOk = true;
        return this.refreshGranters();
      }

      this.newGranterInfo = 'Error: ' + response.message;

      isOk = false;
    }).then(() => {
      if (isOk) {
        form.reset();
      }
    }).catch((err) => {
      console.log(err);
      this.newGranterInfo = 'Unknown error: ' + JSON.stringify(err);
    });
  }

  deleteSelectedUser(): void {
    if (!this.selectedUser) {
      return;
    }

    this._a2bbAuthService.delete(Const.ID_SRV_ENDPOINT + '/api/admin/users/' +
        this.selectedUser.id).then((res) => {
      this.selectedUser = null;
      return this.refreshUsers();
    }).then(() => {
    }).catch((err) => {
      console.log(err);
    });
  }

  deleteSelectedGranter(): void {
    if (!this.selectedGranter) {
      return;
    }

    this._a2bbAuthService.delete(Const.API_ENDPOINT + '/api/admin/granter/' +
        this.selectedGranter.id).then((res) => {
      this.selectedGranter = null;
      return this.refreshGranters();
    }).then(() => {
    }).catch((err) => {
      console.log(err);
    });
  }
}
