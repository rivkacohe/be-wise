import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { date } from 'joi';
import { ApiService } from 'src/app/core/api.service';
import { course, student } from 'src/app/shared/types';


@Component({
  selector: 'app-course-register',
  templateUrl: './course-register.component.html',
  styleUrls: ['./course-register.component.scss']
})
export class CoursCardComponent implements OnInit {



  show = true;
  @Input() courseCode = '';
  studentName: string = "";
  registerSuccess = false;
  public studentRegisterForm: FormGroup;

  onSumbit() {
    if (!this.studentRegisterForm.valid) {
      return;
    }

    this.apiService.addStudent(this.studentRegisterForm.value).subscribe({
      next: (data: student) => {
        this.studentName = `${this.studentRegisterForm.get('first_name')?.value} ${this.studentRegisterForm.get('last_name')?.value}`;
        this.registerSuccess = true
        this.resetRegisterForm();
      },
      error: (err) => console.error(err)
    })
  }
  constructor(private apiService: ApiService, public formBuilder: FormBuilder) {
    this.studentRegisterForm = this.formBuilder.group({
      first_name: new FormControl('', {
        validators: Validators.required
      }),
      last_name: new FormControl('', {
        validators: Validators.required
      }),
      address: new FormControl('', {
        validators: Validators.required
      }),
      gender: new FormControl('', {
        validators: Validators.required
      }),
      course_code: new FormControl('', {
        validators: Validators.required
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
    });
  }

  ngOnChanges(): void {
    this.studentRegisterForm.patchValue({ course_code: `${this.courseCode}` })
  }

  ngOnInit(): void {
  }

  resetRegisterForm() {
    this.studentRegisterForm.reset();

  }

}
