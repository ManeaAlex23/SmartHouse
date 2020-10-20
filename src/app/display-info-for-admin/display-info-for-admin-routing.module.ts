import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayInfoForAdminPage } from './display-info-for-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayInfoForAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayInfoForAdminPageRoutingModule {}
