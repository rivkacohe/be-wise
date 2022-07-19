import { Component,NgModule, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { categoriesValue, category, course } from 'src/app/shared/types';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  
  courses!: Array<course>;
  categories!: Array<category>;

  selectedCategory:categoriesValue='All';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCourse();
    this.getCategories();
  }
  
  getCourse(){
 this.apiService.getCoursesList().subscribe({
  next: (data: Array<course>) => { this.courses = data },
  error: (err) => console.error(err),
  complete: () => (console.log(this.courses)),
 })
  }

  getCategories(){
    this.apiService.getCategoriesList().subscribe({
      next: (data: Array<category>) => { this.categories = data },
      error: (err) => console.error(err),
      complete: () => (console.log(this.categories)),    })
  }

  getCoursesBycategory(){
    
    console.log((this.selectedCategory));
    
    if (this.selectedCategory ==='All'){
      this.getCourse();
      return;
    }
    this.apiService.getCoursesByCategory(this.selectedCategory).subscribe({
      next: (data: Array<course>) => { this.courses = data },
  error: (err) => console.error(err),
  complete: () => (console.log(this.courses)),
  })}
}
