import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BASE_URL } from '../../crud-helper/base-url.token';
import { ElementRef } from '@angular/core';
import { HttpEvent } from '@angular/common/http/src/response';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'hotel-edit',
  templateUrl: './hotel-edit.component.html'
})
export class HotelEditComponent implements OnInit {

    id: string;
    hotel: Hotel;
    errors: string;

    file: File;
    percentDone: number = 0;
    loggedIn: boolean;
    
    @ViewChild('img')
    img: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private hotelService: HotelService,
        @Inject(BASE_URL) private baseUrl: string,
        private renderer: Renderer2,
        private oauthService: OAuthService
    ) { 
    }

    ngOnInit() {

        this.loggedIn = this.oauthService.hasValidAccessToken();

        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Hotel());
                    return this.hotelService.findById(id)
                })
            )
            .subscribe(
                hotel => { 
                    this.hotel = hotel; 
                    this.errors = ''; 
                    this.download(this.hotel.id);
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }






    download(id: number): void {

        if (!id) return;

        this.hotelService.downloadFile(id).subscribe(
            blob => {
                this.setImage(blob);      
            },
            err => console.error('err', err)
        )
    }







    
    upload(files: File[]): void {
        let file = files[0];

        this.setImage(file);

        this.percentDone = 0;

        this
            .hotelService
            .uploadFile(this.hotel.id, file)
            .subscribe(
                event => this.handleHttpEvent(event),
                err => console.error('err', err)
            );
    }

    











    handleHttpEvent(event: HttpEvent<object>) {
        
        if (event.type === HttpEventType.UploadProgress) {
        
            this.percentDone = Math.round(event.loaded / event.total * 100);
          
        } else if (event instanceof HttpResponse) {
        
            this.percentDone = 100;
            console.debug('response', event);
        }
    } 









    setImage(file: Blob): void {

        if (file.type !== 'image/jpg' && file.type !== 'image/jpeg') return;
        
        let fileReader = new FileReader();
        fileReader.onload = (event: any) => {
            let dataUrl = event.target.result;
            this.renderer.setAttribute(this.img.nativeElement, 'src', dataUrl);
        }
        fileReader.readAsDataURL(file);
    }










    save() {
        this.hotelService.save(this.hotel).subscribe(
            hotel => { 
                this.hotel = hotel; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}