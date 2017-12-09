import { camelize } from 'tslint/lib/utils';
import { HotelBooking } from './hotel-booking';
import { HotelBookingFilter } from './hotel-booking-filter';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BASE_URL } from '../crud-helper/base-url.token';
import { map, switchMap, tap, flatMap, take } from 'rxjs/operators';
import { bindCallback  } from 'rxjs/observable/bindCallback';
import { timer  } from 'rxjs/observable/timer';
import { parseString } from 'xml2js';

function pascalCaseToCamelCase(str: string) {
    return str.charAt(0).toLowerCase() + str.substr(1);
}

@Injectable()
export class HotelBookingService {
    
    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) { }

    hotelBookingList: HotelBooking[] = [];
  
    findById(id: string): Observable<HotelBooking> {
        let url = this.baseUrl + '/hotelbooking'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/xml');
        
        let parserOptions = { tagNameProcessors: [pascalCaseToCamelCase], explicitArray: false };                            

        return this
                .http
                .get(url, { headers, params, responseType: 'text'})
                .pipe(
                    switchMap(xmlString => {
                        let parseStringObservable = bindCallback(parseString);
                        return parseStringObservable(xmlString, parserOptions); 
                    }),
                    map(js => js[1].hotelBooking),
                );
    }

    load(filter: HotelBookingFilter): void {
        this.find(filter).subscribe(
            result => {
                this.hotelBookingList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: HotelBookingFilter): Observable<HotelBooking[]> {
        let url = this.baseUrl + '/hotelbooking';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "hotelId": filter.hotelId,
        };

        return this.http.get<HotelBooking[]>(url, {params, headers});
    }

    loadByUrl(url: string): Observable<HotelBooking> {
        return this.http.get<HotelBooking>(url);
    }

    save(entity: HotelBooking, urgent: boolean): Observable<string> {
        
        if (urgent) {
            return this.http.get<string>(this.baseUrl + '/error?code=403');
        }
        
        let url = this.baseUrl + '/hotelbooking';

        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        return this
            .http
            .post<HotelBooking>(url, entity, {headers, observe: 'response'})
            .pipe(
                map((response: HttpResponse<HotelBooking>) => {
                    console.debug('status', response.status);
                    console.debug('body', response.body);
                    return response.headers.get('Location');
                })
            );
    }
}

