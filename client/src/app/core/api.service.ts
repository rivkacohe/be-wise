import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { category, course, lecturer} from '../shared/types';

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
}
