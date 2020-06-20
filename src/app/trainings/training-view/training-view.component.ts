import { TrainingsService } from './../trainings.service';
import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Training from '../training.model';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.scss']
})
export class TrainingViewComponent implements OnInit {
  @Input() mode: string;
  @Input() training: Training | null;
  editing: Training;
  public formControl: FormGroup;
  public submitAttempt = false;
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private trainingService: TrainingsService,
    private alertController: AlertController) {
    this.formControl = this.formBuilder.group({
      nome: ['', Validators.required],
      distancia: ['', Validators.required],
      velocidade: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.mode === 'new') {
      this.editing = {
        id: -1,
        distance: null,
        name: null,
        velocity: null
      };
    } else {
      this.editing = Object.assign({}, this.training);
    }
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      message: `Treino ${this.mode === 'new' ? 'cadastrado' : 'alterado'} com sucesso!`,
      backdropDismiss: false,
      keyboardClose: true,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.modalController.dismiss();
        }
      }]
    });
    await alert.present();
  }

  async showErrorAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: `Erro ao ${this.mode === 'new' ? 'cadastrar' : 'alterar'} treino:<br>${error}`,
      keyboardClose: true,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.alertController.dismiss();
        }
      }]
    });
    await alert.present();
  }

  create() {
    this.submitAttempt = true;
    if (this.formControl.status === 'VALID') {
      this.trainingService.add(this.editing);
      return this.showSuccessAlert();
    }
    this.showErrorAlert('Erro de teste');
  }

  edit() {
    this.submitAttempt = true;
    if (this.formControl.status === 'VALID'){
      this.trainingService.set(this.editing);
      return this.showSuccessAlert();
    }
    this.showErrorAlert('Erro de teste');
  }
}
