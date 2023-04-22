import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DisplayComponent } from './display/display.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './service/auth.service';
import { DemoComponent } from './demo/demo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmailComponent } from './email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    DisplayComponent,
    EditComponent,
    HeaderComponent,
    LoginComponent,
    ViewComponent,
    DemoComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [DatePipe, AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
