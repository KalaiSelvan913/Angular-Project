import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../service/auth.service';

declare var $: any;
export interface CommonDto {
  status: String;
  responseDto: any;
  responseData: any;
}
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input() childMessage: string | undefined;
  baseURl : string = "http://localhost:9090/excel";
  dataList: any;
  dataLists:any;
  display = this.fb.group({
    empId:[''],
    userName:[''],
    password:[''],
    createBy:[''],
    createDate:[''],
  });
  constructor(private fb:FormBuilder, private myservice:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getAllData();
    let encoded: string = btoa("myPassword!");
console.log("Encrypte = "+encoded);

  }
  getAllData() {
    // var retrieveObject:any = localStorage.getItem('data');
    // var obj = JSON.parse(retrieveObject);
    // console.log(obj.empId)
    // this.dataList = obj
    var data = localStorage.getItem('data')
    console.log("In Display Page "+data)
    this.myservice.getDataById(data).subscribe((Response:any)=>{
      console.log(Response)
      this.dataList = Response.responseData
      $(document).ready(function () {
        $('#example').DataTable({searching: false, paging: false, info: false});
      });
      console.log(this.dataList)
//       let encoded: string = atob("bXlQYXNzd29yZCE=");
// console.log("Decrypte = "+encoded);
    })
    // console.log('retrievedObject', JSON.parse(retrieveObject));
      
      // this.getAllData();
      // var n = this.dataList.length;
      // localStorage.setItem("email", this.dataList[2].email);
    }
    
    public openPDF(row:any): void {
      // this.view.controls['empId'].setValue(row.empId)
      console.log(row.empId)
      window.open("http://localhost:9090/pdfs?EmpId="+row.empId) 
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
    this.display.controls['empId'].setValue(row.empId)
    this.myservice.excel(this.display.value).subscribe((Response:CommonDto)=>{
      console.log(Response.responseData);
    })
  }
  onEdit(row:any){
    localStorage.setItem("empId", row);
    this.router.navigateByUrl('/header/edit')
  }
}