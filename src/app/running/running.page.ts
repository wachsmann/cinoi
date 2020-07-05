import { AuthenticationService, LoginUser } from './../service/authentication.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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

import { Route, Point, Person } from './model/running.model';
import Training from '../trainings/training.model';
import { App, AppState } from '@capacitor/core';
import moment from 'moment';
@Component({
    selector: 'app-running',
    templateUrl: './running.page.html',
    styleUrls: ['./running.page.scss'],
})
export class RunningPage implements OnInit {
    @ViewChild('sliderRef', { static: true }) protected slides: IonSlides;
    @ViewChild('mapa', { static: true }) protected mapa: ElementRef;
    @Input() public training: Training;
    private map: google.maps.Map;
    private mapOptions: google.maps.MapOptions;
    private marker: google.maps.Marker;
    private polyline: google.maps.Polyline;
    private courseCoordinates: google.maps.LatLng[] = [];
    private lastPoint: Point;
    private timer: any;
    private initialTime: number = Date.now();

    public person: Person;
    public runningTime: moment.Duration;
    public route: Route = new Route();
    public calories = 0;

    constructor(
        private backgroundGeolocation: BackgroundGeolocation,
        private platform: Platform,
        private toastController: ToastController,
        private authService: AuthenticationService) { }

    initTrack() {
        const config: BackgroundGeolocationConfig = {
            locationProvider: BackgroundGeolocationLocationProvider.DISTANCE_FILTER_PROVIDER,
            desiredAccuracy: 0,
            stationaryRadius: 5,
            stopOnTerminate: true,
            activityType: 'Fitness',
            notificationText: 'Cinoi está rastreando sua Rota!',
            notificationTitle: 'Rastreando Treino',
            distanceFilter: 5,
            interval: 5000
        };
        this.backgroundGeolocation.configure(config).then(() => {
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
                console.log('teste1');
                if (!location)
                    return;

                console.log('teste');
                const currentPosition = new google.maps.LatLng(location.latitude, location.longitude);
                this.map.setCenter(currentPosition);
                this.marker.setPosition(currentPosition);
                this.courseCoordinates.push(currentPosition);
                this.polyline.setPath(this.courseCoordinates);
                if (this.lastPoint){
                    this.calories += this.person.calculateCalories(this.route.getAverageSpeedPointToPoint(this.lastPoint, {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        time: location.time
                    }));
                }
                this.lastPoint = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    time: location.time
                };
                this.route.addPoint(this.lastPoint);
                // const timer = setTimeout(() => {
                //     if ((Date.now() - this.lastPoint.time) <= 5000) {
                //         return clearTimeout(timer);
                //     }
                // }, 5000);
                this.backgroundGeolocation.finish();
            });

            this.backgroundGeolocation.on(BackgroundGeolocationEvents.start).subscribe(() => {
                console.log('Iniciado serviço no Background');
            });
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.stop).subscribe(() => {
                console.log('Finalizado Serviço no Background');
            });

            this.backgroundGeolocation.on(BackgroundGeolocationEvents.error).subscribe((err: any) => {
                this.toastController.create({
                    message: err,
                    duration: 2000
                });
            });
        });

        this.backgroundGeolocation.start();
    }
    ngOnInit() {
        this.slides.update()
        .then(() => this.authService.getUser())
        .then(user => {
            this.person = new Person(user.height, user.weight);
            this.initMap();
            this.initTimerForegroundCount();
            App.addListener('appStateChange', (state: AppState) => {
                if (!state.isActive)
                    return clearInterval(this.timer);

                this.initTimerForegroundCount();
            });
        });
    }

    initTimerForegroundCount(): void {
        this.runningTime = moment.duration(Date.now() - this.initialTime);
        this.timer = setInterval(() => this.runningTime = moment.duration(Date.now() - this.initialTime), 1000);
    }

    ionViewWillLeave() {
        clearInterval(this.timer);
        google.maps.event.clearListeners(this.map, 'idle');
        this.backgroundGeolocation.stop();
        this.backgroundGeolocation.removeAllListeners();
    }

    public formatDuration(duration: moment.Duration): string {
        const hours = `${duration.hours() < 10 ? '0' + duration.hours() : duration.hours()}`;
        const minutes = `${duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes()}`;
        const seconds = `${duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds()}`;
        return `${hours}:${minutes}:${seconds}`;
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
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
            this.platform.ready().then(() => this.initTrack());
        });

        this.marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            map: this.map,
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
