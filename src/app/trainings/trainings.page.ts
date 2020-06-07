import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingsService } from './trainings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.page.html',
  styleUrls: ['./trainings.page.scss']
})
export class TrainingsPage implements OnInit {
  public usuario: string;
  public loadingObject: Promise<HTMLIonLoadingElement>;
  @ViewChild('trainingList') trainingList: TrainingListComponent;
  constructor(private route: ActivatedRoute, private trainingsService: TrainingsService, public loadingController: LoadingController) {
    this.usuario = this.route.snapshot.paramMap.get('usuario');
  }
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.trainingList.update();
  }
  addNewTraining() {
    this.trainingsService.add({
      distance: 0,
      end: '',
      start: '',
      id: -1,
      name: 'Teste de treino'
    });
    this.trainingList.update();
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
