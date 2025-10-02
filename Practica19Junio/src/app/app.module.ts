import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { CreateAddressComponent } from './components/create-address/create-address.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListUsersComponent,
    CreateUserComponent,
    CreateAddressComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
