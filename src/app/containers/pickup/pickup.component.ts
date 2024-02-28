import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_COORDS, TRIP, USERABLE } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { SharedDataService, GlobalWebsocketService, MapService, TripWebsocketService } from 'src/app/core/services';
import { ITrip, IUserable } from 'src/app/interfaces';
import { TripMutations, TripQueries } from 'src/app/services';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickUpComponent implements OnInit, OnDestroy {
  public loading = true;
  public map!: google.maps.Map;
  public trip: ITrip = TRIP;
  public message = '';
  public isModalOpen = false;
  public driverMarker = new google.maps.Marker();
  private interval: any = 0;
  public passenger: IUserable = USERABLE;
  public tripId = '';
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  @ViewChild(IonModal) modal?: IonModal;
  private currentCoordinates = DEFAULT_COORDS;

  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private tripQuery: TripQueries,
    private tripSocket: TripWebsocketService,
    private globalSocket: GlobalWebsocketService,
    private _tripMutation: TripMutations,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef, 10);
    this.tripId = this._route.snapshot.url.join('/').split('/').pop() || '';
    this.tripQuery.getTrip(+this.tripId).subscribe(({ data }) => {
      if (data) {
        this.trip = data.trip;
        this.passenger = data.trip.passenger;
        this.placeMarkersAndRoute();
        this.loading = false;
      }
    });

    this.interval = setInterval(() => {
      this.updateMarker();
      this.tripSocket.sendCoordinates();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
    clearInterval(this.interval);
  }

  public notifyArrival(): void {
    this.isModalOpen = true;
  }

  public cancel(): void {
    this.isModalOpen = false;
  }

  public accept(): void {
    this.isModalOpen = false;
    setTimeout(() => {
      this._router.navigate(['traveling', this.tripId]);
      this._tripMutation.updateTripStatus(+this.tripId, 'enroute');
      this.tripSocket.notifyArrival();
    }, 300);
  }

  private placeMarkersAndRoute(): void {
    this.driverMarker = this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.driver);
    const passengerCoords = {lat: +this.trip.startLocation.lat, lng: +this.trip.startLocation.lng};
    this.mapService.addMarker(passengerCoords, this.map, MarkerUrl.passenger);
    this.mapService.renderRoute(this.currentCoordinates, passengerCoords, this.map, false, false);
  }

  private updateMarker(): void {
    this.driverMarker.setPosition(this.sharedDataService.getCoordinates());
  }
}
