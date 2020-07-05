import { LoginUser } from './../service/authentication.service';
import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: LoginUser;
  constructor(private authService: AuthenticationService) {
    this.authService.getUser().then((user) => this.user = user);
  }

  logout() {
    this.authService.logout();
  }
}
