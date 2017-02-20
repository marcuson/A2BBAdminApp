import { Component, OnInit } from '@angular/core';
import { A2BBAuthService } from '../services/a2bb-auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FormGroup } from '@angular/forms';
import { Const } from '../const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[];
  newUserName: string;
  newUserPass: string;
  selectedUser: User;
  newUserInfo: string;
  prova: any;

  constructor(private _router: Router, private _a2bbAuthService: A2BBAuthService) { }

  ngOnInit() {
    this.refreshUsers();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  refreshUsers(): void {
    this._a2bbAuthService.get(Const.ID_SRV_ENDPOINT + '/api/admin/users').then((res) => {
      this.users = res.json() as User[];
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

  deleteSelected(): void {
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
}
