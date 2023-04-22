import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'


export interface Common{
  status: String;
  responseDto: any;
  responseData: any;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  file: File | undefined;
  public showPassword: boolean = false;
  submitted =false;
  excelFile: any = File;
  changeImage: any;
  dataList:any;
  myDate = new Date();
  textValue: any;
  constructor(private fb: FormBuilder, private myservice: AuthService, private datepipe:DatePipe) { }
  creationForm = this.fb.group({
    userName: ['',Validators.required],
    password: ['',[Validators.required, Validators.minLength(6)]],
    createdBy: ['',Validators.required],
    createdDate: [this.datepipe.transform(new Date(),'yyyy-MM-dd')],
    email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    skills: this.fb.array([]),
    send:''
  });
  fileDownload = this.fb.group({
    fileId : [''],
    fileCreater:[''],
    fileDate:['']
  })
  
  ngOnInit(): void {
    this.addSkills(); 
    this.getAllData();
  //  var maxDate = "2022-06-07"
  //   var date:any = new Date();
  //   console.log(date)
  //   var todayDate:any = date.getDate();
  //   var month:any = 1+date.getMonth();
  //   var year:any = date.getFullYear();
  //   if(todayDate < 10){
  //     todayDate ='0'+todayDate;
  //   }
  //   if(month < 10){month ='0'+month;}
  
  //   maxDate = year+"-"+month+"-"+todayDate;
  //   console.log(maxDate)
    // this.creationForm.controls['createdDate'].setValue(maxDate)
  }
  
  
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  get f(){
    return this.creationForm.controls;
  }
  
  

  // submit() {
  //   console.log(this.creationForm.value);
  //   let formObj : FormData = new FormData();
  //   let req = {"userName":this.creationForm.get("userName")?.value,
  //   "password":this.creationForm.get("password")?.value,
  //   "createdBy":this.creationForm.get("createdBy")?.value,
  //   "createdDate":this.creationForm.get("createdDate")?.value,
  //               }
  //     formObj.append("file", this.excelFile);
  //     formObj.append("data", JSON.stringify(req))

  //   this.myservice.save(formObj).subscribe((Response) => {
  //     console.log(Response)
  //     if (Response.status == "Success") {
  //       this.creationForm.reset();

  //     }
  //   });
  // }

  submit(){
    this.submitted=true;
      // console.log(this.profileForm.controls)
    // console.log(this.f['name'].errors);
    if(this.creationForm.invalid){
      return;
    }else{
    console.log(this.creationForm.value);
    console.log(this.creationForm.value.skills[0].skill)
    let send =[];
    for (var _i = 0; _i < this.creationForm.value.skills.length; _i++) {
            var say = this.creationForm.value.skills[_i].skill;
            
            send.push(say);
    }  
    console.log(send);
    this.creationForm.controls['send'].setValue(send);
    console.log(this.creationForm.value);
    // var password = this.creationForm.value.password
    // let encoded: string = btoa(password);
    // console.log("Encrypte = "+encoded);
    // var encode = encoded
    // this.creationForm.controls['password'].setValue(encode)
    this.myservice.save(this.creationForm.value).subscribe((Response) => {
           console.log(Response)
           if (Response.status == "Success") {
             this.creationForm.reset();
             this.ngOnInit();
            this.submitted = false; 
            Swal.fire(
              'Saved Successfully',
              'Enter  Data are Saved',
              'success'
            )
            
           }
           if(Response.status=="Failed"){
            Swal.fire(
              'Duplicated Email',
              'You Entered Existing Email ID',
              'warning'
            )
          }           
         });
  }
}
  // upload() {
  //   this.myservice.upload().subscribe((Response) => {
  //     console.log(Response)
  //   })
  // }
  fileChange(val: any) {
    this.excelFile = val.files[0];
    // alert(this.excelFile.size)
  }
  change($event: any) {
    this.changeImage = true;
  }
  // submit(){       this.Submitted=true;    if(this.Data.invalid){      return;    }    else{                  let formObj : FormData = new FormData();
  //   let req = {        "userName":this.Data.get("userName")?.value,        "password":this.Data.get("password")?.value,        "createdBy":this.Data.get("createdBy")?.value,        "createdOn":this.Data.get("createdOn")?.value      }
  //   formObj.append("file",this.excelFile);      formObj.append("data", JSON.stringify(req))
  //   this.service.save(formObj).subscribe((response)=>{        if(response == "SUCCESS"){         this.Submitted=false;      this.Data.reset();      Swal.fire({        position: 'center',        icon: 'success',        title: 'Successfully saved',        showConfirmButton: false,        timer: 1500          })        }
  //   console.log(response);            })      }    }
  uploadToDb(){
    console.log(this.file)
    this.myservice.upload(this.file).subscribe(
      (event:any)=>{
        if (typeof(event)=== 'object'){} 
      }
    )
  }
 
  uploadFileToDb(){
    console.log(this.file)
    this.myservice.uploadFile(this.file, this.creationForm.value).subscribe((event:any)=>{
      if(typeof(event) === 'object'){}
      console.log(event)
      console.log(event.responseData.id)
      Swal.fire(
        'File Uploaded Successfully',
        'Your File Id is '+event.responseData.id,
        'success'
      )
      this.creationForm.reset()
      this.ngOnInit();
    })
  }
  downloadById(){
    console.log(this.fileDownload.value.fileId)
   
    window.open("http://localhost:9090/downloadFile?fileById="+this.fileDownload.value.fileId);
    
  }
  downloadFile(){
    if(this.fileDownload.value.fileId == ''){
      this.fileDownload.controls['fileId'].setValue(null);
    }
    if(this.fileDownload.value.fileCreater == ''){
      this.fileDownload.controls['fileCreater'].setValue(null);
    }
    if(this.fileDownload.value.fileDate == ''){
      this.fileDownload.controls['fileDate'].setValue(null);
    }
    window.open("http://localhost:9090/downloadFiles?"+
    "fileCreater="+this.fileDownload.value.fileCreater+"&fileDate="+this.fileDownload.value.fileDate);
    // console.log(this.fileDownload.value)
    // this.myservice.fileDownload(this.fileDownload.value)
  }
  onChange(event:any){
    this.file = event.target.files[0];
  }
  get skills() : FormArray {
    return this.creationForm.get("skills") as FormArray
  }
  
  newSkill(): FormGroup {
    return this.fb.group({
      skill: ''
    })
 }
 addSkills() {
  this.skills.push(this.newSkill());
}
removeSkill(i:number) {
  this.skills.removeAt(i);
}
getAllData(){
  this.myservice.getAllData().subscribe((list:any)=>{
    console.log(list.responseDto);
    this.dataList = list.responseDto
  })
}
}
