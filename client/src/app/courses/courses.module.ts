import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CoursCardComponent } from './course-register/course-register.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule, 

  ],
  exports:[
    CoursesComponent,
    CoursCardComponent
  ]
})
export class CoursesModule { }
