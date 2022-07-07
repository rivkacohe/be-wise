import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { lecturer} from '../shared/types';

@Injectable({
  providedIn: 'root'

})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLecturersList(): Observable<Array<lecturer>> {
    return this.http.get<Array<lecturer>>(`${environment.serverUrl}/lecturers`);
}
}
