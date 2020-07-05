import { LoginUser } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: LoginUser;
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);
  }
  logout() {
    this.authService.logout();
  }
}
