import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LecturersComponent } from './lecturers/lecturers/lecturers.component';

const routes: Routes = [
  {path:'home-component', component:HomeComponent},
  {path:'lecturers-component', component:LecturersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
