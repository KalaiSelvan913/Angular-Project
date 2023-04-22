import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  emailForm: any;
  file: string[] = [];
  constructor(private fb: FormBuilder, private service: AuthService) {}
  ngOnInit(): void {
    this.emailForm = this.fb.group({
      emailFrom: [''],
      emailTo: [''],
      emailMsg: [''],
      emailSubject: [''],
      emailCc: [''],
    });
  }
  // Send Button Fuction
  onSubmit() {
    if (localStorage.getItem('user') == 'kalai@gmail.com') {
      console.log(this.emailForm.value);
      console.log(this.emailForm.value.emailCc);
      // var str = this.emailForm.value.emailCc1
      // var newarr = str.split(", ");
      // console.log(newarr)
      // this.emailForm.controls['emailCC'].setValue(newarr)
      // console.log("After Conversion: "+this.emailForm.value)
      this.service
        .emailGeneration(this.emailForm.value)
        .subscribe((Response: any) => {
          console.log(Response);
          if (Response.status == 'Email Send Successfully') {
            Swal.fire('Mail Sended', 'Your Mail Send Succesfully', 'success');
            this.ngOnInit();
          }
        });
    } else {
      Swal.fire(
        'Not Autherized',
        'Your are Not Autherized to Send Mail',
        'warning'
      );
    }
  }
  sendAttachment() {
    if (localStorage.getItem('user') == 'kalai@gmail.com') {
      console.log(this.file);
      console.log(this.emailForm.value);
      this.service
        .emailWithAttachment(this.file, this.emailForm.value)
        .subscribe((Response: any) => {
          console.log(Response);
          if (Response.status == 'Email Send Successfully') {
            Swal.fire('Mail Sended', 'Your Mail Send Succesfully', 'success');
            this.ngOnInit();
          }
        });
    } else {
      Swal.fire(
        'Not Autherized',
        'Your are Not Autherized to Send Mail',
        'warning'
      );
    }
  }
  onChange(event: any) {
    this.file = event.target.files;
  }
}
