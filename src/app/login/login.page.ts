import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../service/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = {
    email: '',
    password: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private toastCtrl: ToastController,
    private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    if (this.user.email != '' && this.user.password != '') {
      this.authenticationService.checkUser(this.user).subscribe(res => {
        if (res.length > 0) {
          this.authService.login(res[0].id);
        }
        else {
          this.showToast('Usuário não encontrado, tente novamente!');
        }
      });
    } else {
      this.showToast('Preencha todos os campos!');
    }
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
