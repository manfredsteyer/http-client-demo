import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HotelBookingFilter } from '../hotel-booking-filter';
import { HotelBookingService } from '../hotel-booking.service';
import { HotelBooking } from '../hotel-booking';

@Component({
    selector: 'hotel-booking',
    templateUrl: 'hotel-booking-list.component.html'
})
export class HotelBookingListComponent {

    filter = new HotelBookingFilter();
    selectedHotelBooking: HotelBooking;

    get hotelBookingList(): HotelBooking[] {
        return this.hotelBookingService.hotelBookingList;
    }

    constructor(private hotelBookingService: HotelBookingService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.hotelBookingService.load(this.filter);
    }

    select(selected: HotelBooking): void {
        this.selectedHotelBooking = selected;
    }

}
