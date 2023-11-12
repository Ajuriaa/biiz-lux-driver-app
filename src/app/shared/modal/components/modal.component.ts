import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService, SharedDataService, GlobalWebsocketService } from 'src/app/core/services';
import { IDriver } from 'src/app/core/interfaces';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { ModalController } from '@ionic/angular';
import { ModalMutations } from '../../services';
import { ITripInfo } from 'src/app/interfaces';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';
const MOCK = {
  title: "driverRequest",
  driver_id: 1,
  start_coords: { lat: 14.063517244410047, lng: -87.22157054822655 },
  end_coords: { lat: 14.0955772, lng: -87.190318 },
  passenger_id: 1,
  fare: 144,
  start_location: "location",
  destination_location: "test",
};

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy{
  @Input() public tripInfo: any = MOCK;
  public loading = true;
  public map!: google.maps.Map;
  public drivers : IDriver[] = [];
  public imageUrl = IMAGE_URL;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;

  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private modalMutation: ModalMutations,
    private websocketService: GlobalWebsocketService,
    private modalControl: ModalController
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    this.addMarkers();
    await this.renderRoutes();
    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
  }

  public addMarkers(): void {
    this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.driver);
    this.mapService.addMarker(this.tripInfo.start_coords, this.map, MarkerUrl.passenger);
    this.mapService.addMarker(this.tripInfo.end_coords, this.map, MarkerUrl.passenger);
  }

  public async renderRoutes(): Promise<void> {
    this.mapService.renderRoute(
      this.currentCoordinates,
      this.tripInfo.start_coords,
      this.map, false, false
    );
    this.mapService.renderRoute(
      this.tripInfo.start_coords,
      this.tripInfo.end_coords,
      this.map
    );
  }

  public rejectTrip(): Promise<boolean> {
    return this.modalControl.dismiss(null, 'rejected');
  }

  public async startTrip(): Promise<boolean> {
    console.log(this.sharedDataService.getTripDistance())
    const passengerId = this.tripInfo.passenger_id;
    const vehicleId = 2;
    const trip: ITripInfo = {
      startLocation: this.tripInfo.start_coords,
      endLocation: this.tripInfo.end_coords,
      startAddress: this.tripInfo.start_location,
      endAddress: this.tripInfo.destination_location,
      startTime: this.tripInfo.start_time,
      distance: this.sharedDataService.getTripDistance(),
      status: 'active',
      fare: this.tripInfo.fare,
    };

    const mutationRespone = await this.modalMutation.createTrip(passengerId, vehicleId, trip);

    if (mutationRespone) {
      const tripId = +mutationRespone.createTrip.id;
      return this.modalControl.dismiss(tripId, 'accepted');
    }

    return this.modalControl.dismiss(0, 'rejected');
  }
}
