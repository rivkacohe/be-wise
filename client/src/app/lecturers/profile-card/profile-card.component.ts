import { Component,Input, OnInit } from '@angular/core';
import { lecturer } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() lecturer:lecturer={
    id:0,
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    country_id: 0,
    started_teaching: new Date,
    image: '' 
  }
  

  claculateExperience(date:Date){
    var today = new Date();
    var startedDate = new Date(date);
    console.log(startedDate);
    
    var age = today.getFullYear() - startedDate.getFullYear();
    var m = today.getMonth() - startedDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startedDate.getDate())) {
        age--;
    }
    return age;
  }
  getServerUrl (){
  return environment.serverUrl;
  }

  constructor() { }

  ngOnInit(): void {


   
  }

}

