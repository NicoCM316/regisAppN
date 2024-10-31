import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeStudentPage } from './home-student.page';

const routes: Routes = [
  {
    path: '',
    component: HomeStudentPage
  },
  {
    path: 'scanner',
    loadChildren: () => import('../scanner/scanner.module').then( m => m.ScannerPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeStudentPageRoutingModule {}
