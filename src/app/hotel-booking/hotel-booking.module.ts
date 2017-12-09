import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotelBookingListComponent } from './hotel-booking-list/hotel-booking-list.component';
import { HotelBookingEditComponent } from './hotel-booking-edit/hotel-booking-edit.component';
import { HotelBookingService } from './hotel-booking.service';
import { HOTEL_BOOKING_ROUTES } from './hotel-booking.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(HOTEL_BOOKING_ROUTES)
  ],
  declarations: [
    HotelBookingListComponent,
    HotelBookingEditComponent
  ],
  providers: [
    HotelBookingService
  ],
  exports: [
  ]
})
export class HotelBookingModule { }
