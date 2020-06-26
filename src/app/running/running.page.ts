import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { google } from 'google-maps';
@Component({
    selector: 'app-running',
    templateUrl: './running.page.html',
    styleUrls: ['./running.page.scss'],
})
export class RunningPage implements OnInit {
    @ViewChild('sliderRef', { static: true }) protected slides: IonSlides;
    @ViewChild('mapa', { static: true }) protected mapa: ElementRef;
    private map: google.maps.Map;
    private mapOptions: google.maps.MapOptions;
    private marker: google.maps.Marker;
    private polyline: google.maps.Polyline;

    public distance: string = "5,80";
    public time: string = "00:30:12";
    public calories: number = 670;
    public average_speed: string = "5,80";
    public target_speed: number = 10;
    // marker: Marker;
    // map: GoogleMap;
    loading: any;
    // coursePolyline: Polyline;
    private courseCoordinates: google.maps.LatLng[] = [
        new google.maps.LatLng({ lat: -27.236593, lng: -48.648517 }),
        new google.maps.LatLng({ lat: -27.236593, lng: -48.648517 }),
        new google.maps.LatLng({ lat: -27.236501, lng: -48.648484 }),
        new google.maps.LatLng({ lat: -27.236513, lng: -48.648393 }),
        new google.maps.LatLng({ lat: -27.236561, lng: -48.648009 }),
        new google.maps.LatLng({ lat: -27.236637, lng: -48.647338 })
    ];

    constructor(private platform: Platform) {
    }

    ngOnInit() {
        this.slides.update().then(() => this.initMap());
    }

    private initMap(): void {
        const latLng: google.maps.LatLng = new google.maps.LatLng(-19.919157, -43.938547);
        this.mapOptions = {
            center: latLng,
            zoom: 18,
            tilt: 30,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'cooperative'
        };
        this.map = new google.maps.Map(this.mapa.nativeElement, this.mapOptions);
        this.marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: latLng,
            map: this.map
        });
        this.polyline = new google.maps.Polyline({
            path: this.courseCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1.0,
            map: this.map
        });
    }
}
