import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { category, course, FilePath, lecturer} from '../shared/types';

@Injectable({
  providedIn: 'root'

})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLecturersList(): Observable<Array<lecturer>> {
    return this.http.get<Array<lecturer>>(`${environment.serverUrl}/lecturers`);
}

getCoursesList(): Observable<Array<course>> {
  return this.http.get<Array<course>>(`${environment.serverUrl}/courses`);
}

getCategoriesList():Observable<Array<category>> {
  return this.http.get<Array<category>>(`${environment.serverUrl}/categories`);
}

getCoursesByCategory(category_id:number):Observable<Array<course>> {
  return this.http.get<Array<course>>(`${environment.serverUrl}/courses/filter?id=${category_id}`);
}

getSortedCourses(column: string, direction: string): Observable<Array<course>> {
  return this.http.get<Array<course>>
      (`${environment.serverUrl}/courses?column=${column}&sort=${direction}`);
}

exportCoursesByCategory(category_id:number):  Observable<FilePath>{
 return this.http.get<FilePath>(`${environment.serverUrl}/courses/export?id=${category_id}`);
}

exportCourses():  Observable<FilePath>{
  return this.http.get<FilePath>(`${environment.serverUrl}/courses/export`);
}
}
