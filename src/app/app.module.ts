import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzSelectModule } from 'ng-zorro-antd/select';

import {environment} from '../environments/environment';

import { AuthService } from './servicios/auth.service';
import { SearchModalService } from './servicios/search-modal.service';
import { PrivatePageComponent } from './components/private-page/private-page.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';

import { registerLocaleData } from '@angular/common';
import { NZ_I18N, es_ES } from 'ng-zorro-antd';
import es from '@angular/common/locales/es';

registerLocaleData(es);

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
  ReactiveFormsModule,
  AngularFireAuthModule,
  AngularFireModule.initializeApp(environment.firebaseconfig),
  FlashMessagesModule,
  BrowserAnimationsModule,
  NzCarouselModule,
  NzModalModule,
  NzCascaderModule,
  NzSelectModule
],
providers: [AuthService, FlashMessagesService, SearchModalService, { provide: NZ_I18N, useValue: es_ES}],
bootstrap: [AppComponent]
})
export class AppModule { }
