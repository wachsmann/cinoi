import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService, User } from '../service/register.service';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    email: '',
    height: '',
    name: '',
    password: '',
    weight: 0
  };

  constructor(private registerService: RegisterService, private router: Router, private toastCtrl: ToastController, private authService: AuthenticationService) { }

  ngOnInit() { }

  register() {
    if (this.user.email != '' && this.user.height != '' && this.user.name != '' && this.user.password != '' && this.user.weight != 0) {
      this.registerService.addUser(this.user).then((res) => {
        this.authService.login(res.id);
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
