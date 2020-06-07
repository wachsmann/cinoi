import { TrainingListComponent } from './training-list/training-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingsPageRoutingModule } from './trainings-routing.module';

import { TrainingsPage } from './trainings.page';
import { TrainingComponent } from './training-list/training/training.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingsPageRoutingModule
  ],
  declarations: [TrainingsPage, TrainingListComponent, TrainingComponent]
})
export class TrainingsPageModule {}
