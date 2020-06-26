import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { TrainingsPage } from './trainings.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class TrainingsPageRoutingModule {}
