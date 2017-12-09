import { Hotel } from './hotel';
import { HotelFilter } from './hotel-filter';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { BASE_URL } from '../crud-helper/base-url.token';

@Injectable()    
export class HotelService {
    
    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) { }

    hotelList: Hotel[] = [];
  
    findById(id: string): Observable<Hotel> {
        let url = this.baseUrl + '/hotel'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Hotel>(url, {params, headers});
    }
    
    load(filter: HotelFilter): void {
        this.find(filter).subscribe(
            result => {
                this.hotelList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: HotelFilter): Observable<Hotel[]> {
        let url = this.baseUrl + '/hotel';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "city": filter.city,
        };

        return this.http.get<Hotel[]>(url, {params, headers});
    }

    save(entity: Hotel): Observable<Hotel> {
        let url = this.baseUrl + '/hotel';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Hotel>(url, entity, {headers});
    }








    downloadFile(id: number): Observable<any> {
        let url = `${this.baseUrl}/picture/hotels/${id}`;

        return this.http.get(url, { responseType: 'blob' });
    }




    






    uploadFile(id: number, file: File): Observable<HttpEvent<object>> {
        let url = `${this.baseUrl}/picture/hotels/${id}`;

        return this
                .http
                .put(url, file, {reportProgress: true, observe: 'events'});
    }









}

