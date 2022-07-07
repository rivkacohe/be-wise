import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { lecturer } from 'src/app/shared/types';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.scss']
})
export class LecturersComponent implements OnInit {
  lecturers!: Array<lecturer>;
 
  

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getLucturer();
  }

  getLucturer(){
    this.apiService.getLecturersList().subscribe({
      next: (data: Array<lecturer>) => { this.lecturers = data },
      error: (err) => console.error(err),
      complete: () => (console.log(this.lecturers)),
    }) 
  }
}


