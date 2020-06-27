import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunningPageRoutingModule } from './running-routing.module';

import { RunningPage } from './running.page';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunningPageRoutingModule
  ],
  declarations: [RunningPage],
  providers: []
})
export class RunningPageModule {}
