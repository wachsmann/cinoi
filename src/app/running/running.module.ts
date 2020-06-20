import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunningPageRoutingModule } from './running-routing.module';

import { RunningPage } from './running.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunningPageRoutingModule
  ],
  declarations: [RunningPage]
})
export class RunningPageModule {}
