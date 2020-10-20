import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayInfoForAdminPageRoutingModule } from './display-info-for-admin-routing.module';

import { DisplayInfoForAdminPage } from './display-info-for-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayInfoForAdminPageRoutingModule
  ],
  declarations: [DisplayInfoForAdminPage]
})
export class DisplayInfoForAdminPageModule {}
