import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl : String = 'http://localhost:9090';
  constructor(private http: HttpClient, private router:Router) { }

  // save(input:any): Observable<any> {  
  //   const headers={
  //     "content-type":"multipart/form-data"
  //   }
  //   return this.http.post(`${this.baseurl}`+'/save',input,{headers});
  // }
  getAllData(): Observable<any> {
    return this.http.get(`${this.baseurl}`+'/getAllData')
  }
  // saveAsPassword(): Observable<any> {
  //   return this.http.get(`${this.baseurl}`+'/saveAsPassword')
  // }
  saveExcel(): Observable<any> {
    const headers={
      "Content-type":"application/json"
    }
    return this.http.get<any[]>(`${this.baseurl}`+'/saveExcel',{headers})
  }
  excel(input:any): Observable<any> {   
    const headers={
      "Content-type": "application/json"
    }
    return this.http.post(`${this.baseurl}`+'/excel',input,{headers});
  }
  pdf(input:any):any{
    const headers = {
      "Content-type": "application/json"
    }
    return this.http.post(`${this.baseurl}`+'/pdf',input,{headers});
  }
  upload(file:any):Observable<any>{
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(`${this.baseurl}`+'/uploadExcel', formData)
  }
  uploadFile(file:any, input:any):Observable<any>{
    console.log("On Service: "+input.createdBy)
    let req = {
      "createdBy":input.createdBy,
      "createdOn":input.createdDate
    }
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("data", JSON.stringify(req))
    console.log(formData)
    return this.http.post(`${this.baseurl}`+'/uploadFile', formData);
  }
  fileDownload(input:any){
    console.log(input)
    const headers={
      "Content-type": "application/json"
    }
    return this.http.post(`${this.baseurl}`+'/downloadFiles',input,{headers});
  }
  save(input:any): Observable<any> {   
    const headers={
      "Content-type": "application/json"
    }
    return this.http.post(`${this.baseurl}`+'/saveData',input,{headers});
  }
  getDataById(input:any): Observable<any> {   
    const headers={
      "Content-type": "application/json"
    }
    return this.http.post(`${this.baseurl}`+"/getDataById?empId="+input,{},{headers});
  }
  saveEdit(input:any){
    const headers={
      "Content-type": "application/json"
    }
    return this.http.post(`${this.baseurl}`+'/saveEdit',input,{headers});
  }
  excel1(input:any): Observable<any> {   
    const headers={
      "Content-type": "application/json"
    }
    return this.http.post(`${this.baseurl}`+'/exportExcel',input,{headers});
  }
  login(input:any): Observable<any> {
    const headers = {
      "Content-type":"application/json"
    }
    return this.http.post(`${this.baseurl}`+'/loginValidation',input,{headers});
  }
  // gettoken(){  
  //   return !!localStorage.getItem("SeesionUser");  
  //   }
 
  // loggedIn(){
  //   return !!localStorage.getItem('token')
  // }
  // logoutUser(){
  //   localStorage.removeItem('token')
  //   this.router.navigate(['/login'])
  // }
  isUserLoggedIn(){
    let user = localStorage.getItem('user')
    // console.log(!(user===null))
    return !(user === null)
  }
  logout(){
    localStorage.removeItem('user')
  }
  emailGeneration(input:any):Observable<any>{
    const headers = {
      "Content-type":"application/json"
    }
    return this.http.post(`${this.baseurl}`+'/emailGeneration',input,{headers});
  }
  emailWithAttachment(file:any, input:any){
    const headers = {
      "Content-type":"application/json"
    }
    let data = {
      "emailTo": input.emailTo,
      "emailSubject": input.emailSubject,
      "emailMsg": input.emailMsg,
      "emailCc": input.emailCc
    }
    const formData = new FormData();
    for(var i=0; i< file.length; i++){
    formData.append('file', file[i]);}
    formData.append('data', JSON.stringify(data))
    return this.http.post(`${this.baseurl}`+'/emailWithAttachment', formData)
  }
}

