import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelBookingService } from '../hotel-booking.service';
import { HotelBooking } from '../hotel-booking';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'hotel-booking-edit',
  templateUrl: './hotel-booking-edit.component.html'
})
export class HotelBookingEditComponent implements OnInit {

    id: string;
    hotelBooking: HotelBooking;
    errors: string;
    url: string;

    loggedIn: boolean;
    urgent: boolean;

    constructor(
        private route: ActivatedRoute,
        private hotelBookingService: HotelBookingService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                switchMap(p => {
                    if (p['id'] === 'new') {
                        let booking = new HotelBooking();
                        booking.hotelId = p['hotelId'];
                        booking.date = new Date().toISOString().split('T')[0];
                        booking.nights = 3;
                        return of(booking);
                    }
                    return this.hotelBookingService.findById(p['id'])
                })
            )
            .subscribe(
                hotelBooking => { 
                    this.hotelBooking = hotelBooking; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );

            
    }

    reload() {
        this.hotelBookingService.loadByUrl(this.url).subscribe(
            booking => this.hotelBooking = booking,
            err => console.error('err', err)
        );
    }

    save() {
        this.hotelBookingService.save(this.hotelBooking, this.urgent).subscribe(
            url => {
                this.url = url;
                this.reload();
            }, 
            err => console.error('error', err)
        );
    }

}