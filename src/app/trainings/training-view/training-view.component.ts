import { TrainingEditComponent } from './../training-edit/training-edit.component';
import { RunningPage } from './../../running/running.page';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { TrainingService, Training } from 'src/app/service/training.service';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.scss'],
})
export class TrainingViewComponent implements OnInit {
  @Input() training: Training;
  constructor(
    private modalController: ModalController,
    private trainingService: TrainingService,
    private alertController: AlertController) { }

  ngOnInit() {
    if (!this.training) {
      this.modalController.dismiss();
      throw new Error('Objeto do tipo "Training" inválido');
    }
    this.trainingService.getTrainingById(this.training.id).subscribe(training => {
      this.training = training;
    });
  }

  async startTraining() {
    const startTraining = await this.modalController.create({
      component: RunningPage,
      componentProps: {
        training: this.training
      }
    });
    return await startTraining.present();
  }

  async editTraining() {
    const editTraining = await this.modalController.create({
      component: TrainingEditComponent,
      componentProps: {
        mode: 'edit',
        training: this.training
      }
    });
    await editTraining.present();
    await editTraining.onWillDismiss();
    this.trainingService.getTrainingById(this.training.id).subscribe(training => {
      this.training = training;
    });
  }

  async deleteTraining() {
    const alert = await this.alertController.create({
      header: 'Excluindo Treino',
      message: 'Deseja realmente excluir este treino?',
      buttons: [{
        text: 'Não'
      },
      {
        text: 'Sim',
        handler: () => {
          this.trainingService.deleteTraining(this.training.id);
          this.modalController.dismiss();
        }
      }]
    });
    await alert.present();
  }
}
