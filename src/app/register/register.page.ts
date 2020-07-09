import { Component, OnInit } from '@angular/core';
import { RegisterService, User } from '../service/register.service';
import { ToastController } from '@ionic/angular';
import { AuthenticationService, LoginUser } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    email: '',
    height: null,
    name: '',
    password: '',
    weight: null
  };

  constructor(
    private registerService: RegisterService,
    private toastCtrl: ToastController,
    private authService: AuthenticationService) { }

  ngOnInit() { }

  register() {
    if (this.user.email != '' && this.user.height != null && this.user.name != '' && this.user.password != '' && this.user.weight != null) {
      this.registerService.addUser(this.user).then((res) => {
        const loginUser: LoginUser = {
          id: res.id,
          email: this.user.email,
          height: this.user.height,
          name: this.user.name,
          password: this.user.password,
          weight: this.user.weight
        };
        this.authService.login(loginUser);
      }, err => {
        this.showToast('Erro ao realizar o cadastro, tenta novamente mais tarde!');
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
