import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

import { FormsModule} from '@angular/forms';


import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import {environment} from '../environments/environment';

import { AuthService } from './servicios/auth.service';
import { PrivatePageComponent } from './components/private-page/private-page.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';


@NgModule({
   declarations: [
  AppComponent,
  HomePageComponent,
  NavbarComponent,
  RegisterPageComponent,
  LoginPageComponent,
  NotFoundPageComponent,
  PrivatePageComponent,
  SiteFooterComponent
],
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  AngularFireAuthModule,
  AngularFireModule.initializeApp(environment.firebaseconfig),
  FlashMessagesModule,
  NzCarouselModule
],
providers: [AuthService, FlashMessagesService],
bootstrap: [AppComponent]
})
export class AppModule { }
