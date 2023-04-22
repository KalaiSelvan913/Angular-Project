import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

export class ILogin {      
  emailId: string | undefined;    
  password: string | undefined;    
}  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // parentMessage = "message from parent"
  public showPassword: boolean = false;
   
  constructor(private fb:FormBuilder, private myservice:AuthService, private router:Router,
    private SpinnerService: NgxSpinnerService) { }
  loginForm = this.fb.group({
    email:[''],
    password:['']
  })
  ngOnInit(): void {
    
  }
  Spinner(){
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
    }, 1000);
  }
  login(){
    console.log(this.loginForm.value)
    // var password = this.loginForm.value.password
    // let encoded: string = btoa(password);
    // console.log("Encrypte = "+encoded);
    // var encode = encoded
    // this.loginForm.controls['password'].setValue(encoded)
    
    this.myservice.login(this.loginForm.value).subscribe((Response:any)=>{
      console.log(Response);
      if(Response.status=="Success"){
        // Swal.fire({
        //   title:'Successfully Logged In',
        //   color:'Green',
        //   icon:'success',
        // showConfirmButton: false,
        // timer:1500
        // })
        // var testObject = Response.responseData;
        // localStorage.setItem('data', JSON.stringify(testObject));
        localStorage.setItem('data', Response.responseData.empId)
        localStorage.setItem('user', Response.responseData.email)
        this.Spinner();
        this.router.navigateByUrl('/header/display')
      }else if(Response.status=="Failed"){
        Swal.fire({
         title: 'Invalid Credential',
         color:'red',
          icon:'error',
        }
        )
      }
    })
    
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
 
}