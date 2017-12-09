import { Routes } from '@angular/router';
import { HotelBookingListComponent } from './hotel-booking-list/hotel-booking-list.component';
import { HotelBookingEditComponent } from './hotel-booking-edit/hotel-booking-edit.component';

export const HOTEL_BOOKING_ROUTES: Routes = [
  {
    path: 'hotel-booking',
    component: HotelBookingListComponent
  },
  {
    path: 'hotel-booking/:id',
    component: HotelBookingEditComponent
  }
]
