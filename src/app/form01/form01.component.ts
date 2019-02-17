import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-form01',
  templateUrl: './form01.component.html',
  styleUrls: ['./form01.component.scss']
})
export class Form01Component implements OnInit {
   formGroup: FormGroup;
  constructor(    
    private formBulid : FormBuilder
    ) 
    { }

  ngOnInit() {
    this.formGroup = this.formBulid.group({
     firstName: [''],
     lastName:[''],
     email:[''],
     age:['']
    })
   }

   onSubmit(form: FormGroup){
     console.log(form);
     const {firstName, lastName, email, age} = form.value;
     const user = new User(firstName,lastName,email,age);
     console.log(user);
   }

}
