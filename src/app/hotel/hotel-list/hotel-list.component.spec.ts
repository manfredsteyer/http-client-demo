import { async, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HotelListComponent } from "./hotel-list.component";
import { RouterTestingModule } from "@angular/router/testing";
import { BASE_URL } from "../../crud-helper/base-url.token";
import { HotelService } from "../hotel.service";
import { HttpTestingController } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe('HotelService', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                FormsModule
            ],
            declarations: [
                HotelListComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                HotelService,
                { provide: BASE_URL, useValue: '' }
            ]
        }).compileComponents();
    }));

    it('can load hotels by city', () => {

        let service: HotelService = TestBed.get(HotelService);
        let ctrl: HttpTestingController = TestBed.get(HttpTestingController);

        service.find({ city: 'Graz' }).subscribe(
            hotels => expect(hotels.length).toBe(2),
            err => fail(err)
        );

        let req = ctrl.expectOne('/hotel?city=Graz');
        expect(req.request.method).toBe('GET');
        
        req.flush([
            {id: 1, name: 'Hotel Mama'},
            {id: 2, name: 'Budget Hotel'}
        ]);

        ctrl.verify();
    });
});