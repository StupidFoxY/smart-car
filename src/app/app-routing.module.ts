import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SmartCarComponent } from './smart-car/smart-car.component';

const routes: Routes = [
  { path:'', redirectTo:'/smart-car', pathMatch:'full' },
  { path:'smart-car', component: SmartCarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
