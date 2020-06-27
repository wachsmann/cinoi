import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { google } from 'google-maps';
import { ToastController } from '@ionic/angular';
import {
    BackgroundGeolocation,
    BackgroundGeolocationConfig,
    BackgroundGeolocationEvents,
    BackgroundGeolocationResponse,
    BackgroundGeolocationLocationProvider,
} from '@ionic-native/background-geolocation/ngx';

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
    loading: any;
    private courseCoordinates: google.maps.LatLng[] = [];

    constructor(
        private backgroundGeolocation: BackgroundGeolocation,
        private platform: Platform,
        private toastController: ToastController) {
    }

    initTrack() {
        const config: BackgroundGeolocationConfig = {
            locationProvider: BackgroundGeolocationLocationProvider.DISTANCE_FILTER_PROVIDER,
            desiredAccuracy: 10,
            stationaryRadius: 10,
            distanceFilter: 20,
            interval: 5000
        };

        this.backgroundGeolocation.configure(config).then(() => {
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
                const currentPosition = new google.maps.LatLng(location.latitude, location.longitude);
                this.map.setCenter(currentPosition);
                this.marker.setPosition(currentPosition);
                this.courseCoordinates.push(currentPosition);
                this.polyline.setPath(this.courseCoordinates);
                this.backgroundGeolocation.finish();
            });

            this.backgroundGeolocation.on(BackgroundGeolocationEvents.stationary).subscribe((stationaryLocation) => {
                console.log(stationaryLocation);
            });
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.start).subscribe(() => {
                console.log('Iniciado serviço no Background');
            });
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.stop).subscribe(() => {
                console.log('Finalizado Serviço no Background');
            });

            this.backgroundGeolocation.on(BackgroundGeolocationEvents.error).subscribe((err) => {
                console.error(err);
            });
        });
        this.backgroundGeolocation.start();
    }
    ngOnInit() {
        this.slides.update().then(() => this.initMap());
    }

    ionViewWillLeave(){
        this.backgroundGeolocation.stop();
        this.backgroundGeolocation.removeAllListeners();
    }
    private initMap(): void {
        this.mapOptions = {
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
        this.platform.ready().then(() => this.initTrack());
    }
}
