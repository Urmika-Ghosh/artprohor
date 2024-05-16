import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
// import { MethodService } from 'src/app/Service/method.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  addForm!: FormGroup;
  selectedImg: any;
  formValues:any;
  
  click:boolean=false

  ngOnInit(): void {
    this.addForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit()
  {

  }
}
