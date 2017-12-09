import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FlightModule } from './flight/flight.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HotelModule } from './hotel/hotel.module';
import { HotelBookingModule } from './hotel-booking/hotel-booking.module';
import { BASE_URL } from './crud-helper/base-url.token';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { OAuthStorage, OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot([{ 
      path: '**',
      component: HomeComponent
    }]),
    OAuthModule.forRoot(),
    FlightModule,
    HotelModule,
    HotelBookingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    { provide: BASE_URL, useValue: 'http://www.angular.at/api'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },



    { provide: OAuthStorage, useValue: sessionStorage }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }