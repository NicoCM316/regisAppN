import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTeacherPage } from './home-teacher.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTeacherPage
  },
  {
    path: 'qr',
    loadChildren: () => import('../qr/qr.module').then( m => m.QrPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTeacherPageRoutingModule {}
