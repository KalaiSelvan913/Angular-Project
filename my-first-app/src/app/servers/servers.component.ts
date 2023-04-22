import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  selector:'app-servers',
  // template: `<app-server></app-server>
  //             <app-server></app-server>`,
  templateUrl:'./servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
allowNewServer: boolean = false;
serverCreationStatus: string = 'No server was Created';
serverName :string = 'TestServerName';
serverCreated: boolean = false;
servers :string[]=['TestServer', 'TestServer 2'];
  constructor() { 
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000)
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server Was Created!, Name is '+ this.serverName;
  }

  onUpdateServerName(event: any){
    console.log(event)
    this.serverName = event.target.value;
  }

}
