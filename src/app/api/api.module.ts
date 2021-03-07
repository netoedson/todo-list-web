import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthApi } from './auth/auth.api';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthApi]
})
export class ApiModule { }
