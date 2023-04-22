import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DemoComponent } from './demo/demo.component';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { EmailComponent } from './email/email.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'login', component:LoginComponent,},
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, 
  {path:'header', component:HeaderComponent,canActivate:[AuthGuard],
  children:[
    {path:'create', component:CreateComponent},
  {path:'view', component:ViewComponent},
  {path:"edit", component:EditComponent},
  {path:"display", component:DisplayComponent},
  {path:'email', component:EmailComponent}
  ],},
  {path:'create', component:CreateComponent},
  {path:'view', component:ViewComponent},
  {path:'demo', component:DemoComponent},
  {path:'email', component:EmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
