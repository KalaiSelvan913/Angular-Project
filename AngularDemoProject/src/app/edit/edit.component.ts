import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

export interface CommonDto {
  status: String;
  responseData: any;
  responseDto: any;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder, private myservice: AuthService, private router: Router) { }
  viewForm = this.fb.group({
    empId: [''],
    userName: [''],
    password: [''],
    email: [''],
    createdBy: [''],
    createdDate: [''],
    skills:['']
  })
  ngOnInit(): void {
    var empId = localStorage.getItem("empId");
    console.log(empId)
    this.myservice.getDataById(empId).subscribe((Response) => {
      console.log(Response);
      var password = Response.responseData.password
      console.log(password)
      let encoded: string = atob(password);
      console.log("Decrypte = " + encoded);

      // console.log(this.viewForm.controls)
      this.viewForm.controls['empId'].setValue(Response.responseData.empId);
      this.viewForm.controls['userName'].setValue(Response.responseData.userName);
      this.viewForm.controls['password'].setValue(encoded);
      this.viewForm.controls['email'].setValue(Response.responseData.email);
      this.viewForm.controls['createdBy'].setValue(Response.responseData.createdBy);
      this.viewForm.controls['createdDate'].setValue(Response.responseData.createdDate)
      this.viewForm.controls['skills'].setValue(Response.responseData.skill);

    })
  }

  saveEdit() {
    console.log(this.viewForm.value);
    // var password = this.viewForm.value.password
    // let encoded: string = btoa(password);
    // console.log("Encrypte = "+encoded);
    // var encode = encoded
    // this.viewForm.controls['password'].setValue(encoded)
    this.myservice.saveEdit(this.viewForm.value).subscribe((Data: any) => {
      console.log(Data)
      if (Data.status == "Success") {
        Swal.fire(
          'Updated Successfully',
          'Edited Data are Saved',
          'success'
        )
        this.router.navigateByUrl("/header/display")
      }
    });
  }

}