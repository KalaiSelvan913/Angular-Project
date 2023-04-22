import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service'
import{HttpClient, HttpHeaders}from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { windowCount } from 'rxjs';
// import 'jspdf-autotable';

declare var $: any;
export interface CommonDto {
  status: String;
  responseDto: any;
  responseData: any;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  baseURl : string = "http://localhost:9090/excel";
  dataList: any;
  dataLists:any;
  constructor(private myservice : AuthService, private http:HttpClient,
    private fb : FormBuilder, private router: Router) { }

    view = this.fb.group({
      userName:[''],
      password:[''],
      createBy:[''],
      createDate:[''],
      empId:[''],
      skill:['']
    });
  ngOnInit(): void {
    this.getAllData();
  }
  

   // For  JQuery Datatable
   getAllData() {
    this.myservice.getAllData().subscribe((Response: CommonDto) => {
      console.log(Response);
      this.dataList = Response.responseDto;
      $(document).ready(function () {
        $('#example').DataTable();
      });
      console.log(this.dataList)
      // var n = this.dataList.length;
      // localStorage.setItem("email", this.dataList[2].email);
     
    });
    }
    
    public openPDF(row:any): void {
      console.log(row.empId)
      window.open("http://localhost:9090/pdfs?EmpId="+row.empId)
      // this.myservice.pdf(this.view.value).subscribe((Response:CommonDto)=>{
      //   console.log(Response)
      //   if(Response.status=="Success"){
      //     Swal.fire({
      //       position: 'center',
      //       color:'red',
      //       icon: 'success',
      //       title: '<i class="fa fa-file-pdf-o"></i> PDF File is Exported',
      //       showConfirmButton: false,
      //       timer: 1500
      //     })
      //   }
      // })
        
      // let DATA: any = document.getElementById('table');
      // html2canvas(DATA).then((canvas) => {
      //   let fileWidth = 208;
      //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //   const FILEURI = canvas.toDataURL('image/png');
      //   let PDF = new jsPDF('p', 'mm', 'a4');
      //   let position = 0;
      //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      //   PDF.save('angular-demo.pdf');
      // });
      
     }
    
  exportAsXLSX(row:any){
    console.log(row.empId);
    window.open(this.baseURl+"?EmpId="+row.empId);
    // this.view.controls['empId'].setValue(row.empId)
    // this.myservice.excel1(row).subscribe((Response:any)=>{
    //   console.log(Response)
    //   if(Response.status == "Excel File Created Successfully"){
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       color:'Green',
    //       title: '<i class="fa fa-file-excel-o"></i> Excel File is Exported',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }
    // });
    // this.excelService.exportAsExcelFile(this.dataOfFootballers, 'sample_data');
  }
  

  excel(row:any){
    this.view.controls['empId'].setValue(row.empId)
    this.myservice.excel(this.view.value).subscribe((Response:CommonDto)=>{
      console.log(Response.responseData);
      console.log("worked")
    })
  }
  onEdit(row:any){
    localStorage.setItem("empId", row);
    this.router.navigateByUrl('/header/edit')
  }
}