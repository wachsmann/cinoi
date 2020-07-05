import { AuthenticationService, LoginUser } from './../service/authentication.service';
import { TrainingViewComponent } from './training-view/training-view.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import Training from './training.model';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.page.html',
  styleUrls: ['./trainings.page.scss']
})
export class TrainingsPage {
  public usuario: LoginUser;
  public loadingObject: Promise<HTMLIonLoadingElement>;
  @ViewChild('trainingList') trainingList: TrainingListComponent;
  constructor(
    public loadingController: LoadingController,
    private modalController: ModalController,
    private authService: AuthenticationService) {
      this.usuario = this.authService.getUser();
  }

  ionViewWillEnter(){
    this.trainingList.update();
  }

  async addNewTraining() {
    const modal = await this.modalController.create({
      component: TrainingEditComponent,
      componentProps: {
        mode: 'new'
      }
    });
    await modal.present();
    await modal.onWillDismiss();
  }
  async editTraining(training: Training) {
    const modal = await this.modalController.create({
      component: TrainingViewComponent,
      componentProps: {
        training
      }
    });
    await modal.present();
    await modal.onWillDismiss();
  }
  initLoadAnimation() {
    this.loadingObject = this.loadingController.create({
      message: 'Carregando...',
    });
    this.loadingObject.then(loadObject => loadObject.present());
  }
  finishLoadAnimation() {
    this.loadingObject.then(loadObject => loadObject.dismiss());
  }
}
