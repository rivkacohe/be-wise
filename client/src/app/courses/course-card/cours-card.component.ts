import { Component, Input, OnInit } from '@angular/core';
import { course } from 'src/app/shared/types';


@Component({
  selector: 'app-cours-card',
  templateUrl: './cours-card.component.html',
  styleUrls: ['./cours-card.component.scss']
})
export class CoursCardComponent implements OnInit {
 
  @Input() course:course={
    code: '',
    name: '',
    description: '',
    price:0,
    start_date: new Date,
    num_of_classes:0,
    category:'',
    first_name:'',
  last_name:'',}
  

  constructor() { }

  ngOnInit(): void {
  }

}
