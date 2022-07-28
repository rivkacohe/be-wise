import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { category, course, FilePath, lecturer, student} from '../shared/types';

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

getFilteredCourses(column:string, filter: string|number):Observable<Array<course>> {
  return this.http.get<Array<course>>(`${environment.serverUrl}/courses/filter?column=${column}&filter=${filter}`);
}

getSortedCourses(column: string, direction: string): Observable<Array<course>> {
  return this.http.get<Array<course>>
      (`${environment.serverUrl}/courses?column=${column}&sort=${direction}`);
}

exportFilteredCourses(column:string, filter: string|number):  Observable<FilePath>{
 return this.http.get<FilePath>(`${environment.serverUrl}/courses/export?column=${column}&filter=${filter}`);
}

exportCourses():  Observable<FilePath>{
  return this.http.get<FilePath>(`${environment.serverUrl}/courses/export`);
}

addStudent(student: student): Observable<student>{
       return this.http.post<student>(
            `${environment.serverUrl}/courses/register`,
            student,
            { headers: { 'Content-Type': 'application/json' } }
        )
}
}
