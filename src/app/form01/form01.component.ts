import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-form01',
  templateUrl: './form01.component.html',
  styleUrls: ['./form01.component.scss']
})
export class Form01Component implements OnInit {
  
    // formBuild:FormBuilder; //ภายนอกใช้ชื่อเต็ม ภายในใช้ชื่อย่อ
    formGroup: FormGroup;
    constructor( // ของใน constructor ไม่สามารถนำออกมาข้างนอกได้
      private formBuild: FormBuilder
    ) {
      // this.formBuild = fb; // สร้างชื่อขึ้นมาเพื่อเอาไว้เก็บค่า
    }
  
    ngOnInit() {
      this.formGroup = this.formBuild.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [this.emailValidator]],
        age: []
      })
    }
  
    emailValidator(control: AbstractControl) {
      const value: string = control.value;
      if (value && value.includes('@')) {
        return null;
      }
      return {
        email: true
      }
    }
  
    onSubmit(form: FormGroup) {
      console.log(form.valid, form.invalid); //valid,invalid จะไม่มีทางเป็น true ทั้งคู่หรือ false ทั้งคู่
      console.log((<FormControl>form.get('firstName')).errors);
  
      if (!form.invalid) {
        const { firstName, lastName, email, age } = form.value;
        const user = new User(firstName, lastName, email, age);
        console.log(user);
      } else {
        [
          'firstName',
          'lastName',
          'email',
          'age'].forEach((key: string) => {
            console.log(form.get(key).errors);
            form.get(key).markAsTouched();
          })
      }
    }
  }