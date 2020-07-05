import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TrainingService, Training } from 'src/app/service/training.service';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.scss']
})
export class TrainingEditComponent implements OnInit {
  @Input() mode: string;
  @Input() training: Training | null;
  editing: Training;
  public formControl: FormGroup;
  public submitAttempt = false;
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
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
        distance: null,
        name: null,
        velocity: null
      };

    } else {
      this.editing = Object.assign({}, this.training);
    }
  }

  showSuccessAlert() {
    this.alertController.create({
      message: `Treino ${this.mode === 'new' ? 'cadastrado' : 'alterado'} com sucesso!`,
      backdropDismiss: false,
      keyboardClose: true,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.modalController.dismiss();
        }
      }]
    }).then(alert => alert.present());
  }

  showErrorAlert(error: string) {
    this.alertController.create({
      header: 'Erro',
      message: `Erro ao ${this.mode === 'new' ? 'cadastrar' : 'alterar'} treino:<br>${error}`,
      keyboardClose: true,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.alertController.dismiss();
        }
      }]
    }).then(alert => alert.present());
  }

  create() {
    this.submitAttempt = true;
    if (this.formControl.status === 'VALID') {
      this.trainingService.addTraining(this.editing);
      return this.showSuccessAlert();
    }
  }

  edit() {
    this.submitAttempt = true;
    if (this.formControl.status === 'VALID') {
      this.trainingService.updateTraining(this.editing);
      return this.showSuccessAlert();
    }
  }
}
