import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LecturersComponent } from './lecturers/lecturers/lecturers.component';

const routes: Routes = [
  {path:'home-component', component:HomeComponent},
  {path:'lecturers-component', component:LecturersComponent},
  {path:'courses-component', component:CoursesComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
