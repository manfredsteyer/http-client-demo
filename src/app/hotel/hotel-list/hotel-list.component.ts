import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HotelFilter } from '../hotel-filter';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';
import { BASE_URL } from '../../crud-helper/base-url.token';


@Component({
    selector: 'hotel',
    templateUrl: 'hotel-list.component.html'
})
export class HotelListComponent {

    filter = new HotelFilter();
    selectedHotel: Hotel;

    get hotelList(): Hotel[] {
        return this.hotelService.hotelList;
    }

    constructor(
        private hotelService: HotelService,
        @Inject(BASE_URL) public baseUrl: string
    ) {
    }

    ngOnInit() {
    }

    search(): void {
        this.hotelService.load(this.filter);
    }

    select(selected: Hotel): void {
        this.selectedHotel = selected;
    }

}
