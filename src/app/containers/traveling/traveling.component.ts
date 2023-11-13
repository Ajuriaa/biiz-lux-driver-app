import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_COORDS, TRIP } from 'src/app/core/constants';
import { MapService, SharedDataService, TripWebsocketService } from 'src/app/core/services';
import { firstValueFrom } from 'rxjs';
import { MarkerUrl } from 'src/app/core/enums';
import { TripMutations, TripQueries } from '../../services';
import { ITrip } from '../../interfaces';


@Component({
  selector: 'app-traveling',
  templateUrl: './traveling.component.html',
  styleUrls: ['./traveling.component.scss']
})
export class TravelingComponent implements OnInit {
  public loading = false;
  public map!: google.maps.Map;
  public trip: ITrip = TRIP;
  public tripId: string | number = 0;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;
  private endCoordinates = DEFAULT_COORDS;
  private carMarker: google.maps.Marker = new google.maps.Marker();
  private route!: google.maps.DirectionsRenderer;
  private oldRoute!: google.maps.DirectionsRenderer;
  private interval: any = 0;

  constructor(
    private sharedData: SharedDataService,
    private mapService: MapService,
    private _tripQuery: TripQueries,
    private _tripMutation: TripMutations,
    private _router: Router,
    private tripSocket: TripWebsocketService,
    private _route: ActivatedRoute
  ){}

  async ngOnInit() {
    this.currentCoordinates = await this.sharedData.setDefaultCoordinates();
    this.tripId = this._route.snapshot.url.join('/').split('/').pop() || 0;
    this.tripSocket.connectWebSocket(this.tripId.toString());
    const queryResponse = await firstValueFrom(this._tripQuery.getTrip(+this.tripId));
    this.trip = queryResponse.data.trip;
    this.endCoordinates = {lat: +this.trip.endLocation.lat, lng: +this.trip.endLocation.lng};
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    this.mapService.addMarker(this.endCoordinates, this.map, MarkerUrl.passenger);
    this.carMarker = this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.driver);
    this.route = this.mapService.renderRoute(this.currentCoordinates, this.endCoordinates, this.map);
    setTimeout(() => {
      this.map.panTo(this.currentCoordinates);
      this.map.setZoom(19);
    }, 1000);

    setTimeout(()=> this.trackCar(), 3000);

    this.interval = setInterval(() => {
      this.trackCar();
    }, 1000);
  }

  public center(): void {
    this.map.panTo(this.currentCoordinates);
    this.map.setZoom(19);
  }

  public finishTrip(): void {
    this._tripMutation.updateTripStatus(+this.tripId, 'completed');
    this.tripSocket.finishTrip();
    this._router.navigate(['/trip-detail', this.tripId]);
  }

  private async trackCar(){
    this.currentCoordinates = await this.sharedData.setDefaultCoordinates();
    this.carMarker.setPosition(this.currentCoordinates);
  }
}
