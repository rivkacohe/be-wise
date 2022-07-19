import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CoursCardComponent } from './course-card/cours-card.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursCardComponent
  ],
  imports: [
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
