import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { categoriesValue, category, course, CourseSort, FilePath, sortColumn } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses!: Array<course>;
  categories!: Array<category>;
  selectedCategory: categoriesValue = 'All';
  tableSort!: CourseSort;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCourse();
    this.getCategories();

    this.tableSort = {
      column: 'name',
      dirAsc: true
    };
  }

  getCourse() {
    this.apiService.getCoursesList().subscribe({
      next: (data: Array<course>) => { this.courses = data },
      error: (err) => console.error(err),
      complete: () => (console.log(this.courses)),
    })
  }

  getCategories() {
    this.apiService.getCategoriesList().subscribe({
      next: (data: Array<category>) => { this.categories = data },
      error: (err) => console.error(err),
      complete: () => (console.log(this.categories)),
    })
  }

  getCoursesBycategory() {

    console.log((this.selectedCategory));

    if (this.selectedCategory === 'All') {
      this.getCourse();
      return;
    }
    this.apiService.getCoursesByCategory(this.selectedCategory).subscribe({
      next: (data: Array<course>) => { this.courses = data },
      error: (err) => console.error(err),
      complete: () => (console.log(this.courses)),
    })
  }

  sortCourses(column: sortColumn) {
    if (this.tableSort.column === column) {
      this.tableSort.dirAsc = !this.tableSort.dirAsc;
    } else {
      this.tableSort.column = column;
      this.tableSort.dirAsc = true;
    }

    const direction = this.tableSort.dirAsc ? 'ASC' : 'DESC';

    this.apiService.getSortedCourses(column, direction).subscribe({
      next: (data: Array<course>) => {
        this.courses = data;
      },
      error: (err) => console.error(err),
    });
  }

  displaySort(column: sortColumn): string {
    if (this.tableSort.column === column) {
      return this.tableSort.dirAsc ? 'bi-chevron-up' : 'bi-chevron-down';
    }
    return 'bi-chevron-expand';
  }
  exportCoursesData() {
    if (this.selectedCategory === 'All') {
      this.apiService.exportCourses().subscribe({
        next: (data: FilePath) => {
          window.open(`${environment.serverUrl}/${data.name}`);
      },
      error: (err) => console.error(err),
      })
      return;
    }
    this.apiService.exportCoursesByCategory(this.selectedCategory).subscribe({
      next: (data: FilePath) => {
        window.open(`${environment.serverUrl}/${data.name}`);
    },
    error: (err) => console.error(err),
    })

  }
}
