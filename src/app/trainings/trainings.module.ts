import { TrainingViewComponent } from './training-view/training-view.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingsPageRoutingModule } from './trainings-routing.module';

import { TrainingsPage } from './trainings.page';
import { TrainingComponent } from './training-list/training/training.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingsPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TrainingsPage,
    TrainingListComponent,
    TrainingComponent,
    TrainingEditComponent,
    TrainingViewComponent
  ]
})
export class TrainingsPageModule {}
