import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SharedDataService, GlobalWebsocketService } from 'src/app/core/services';
import { getClosestDriver } from 'src/app/core/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public directionsService: google.maps.DirectionsService;
  public time = '-- mins';

  constructor(
    private sharedDataService: SharedDataService,
    private websocket: GlobalWebsocketService,
    ) {
      this.websocket.connectWebSocket();
      this.directionsService = new google.maps.DirectionsService();
    }

  async ngOnInit(): Promise<void> {
    await this.checkGeolocationPermissions();
    this.websocket.getDriverCoordinates();
    setTimeout(() => this.getDriverTime(), 4000);
  }


  public test(){
    this.getDriverTime();
  }

  private async checkGeolocationPermissions(): Promise<any> {
    const permissions = await Geolocation.checkPermissions();
    if (permissions.location === 'granted') {
      this.sharedDataService.setDefaultCoordinates();
      return;
    }
    this.requestGeolocation();
  }

  private async requestGeolocation(): Promise<any> {
    await Geolocation.requestPermissions();
    setTimeout(() => {
      this.checkGeolocationPermissions();
    }, 500);
  }

  // This function is used to get the time it will take for the driver to arrive at the passenger's location.
  // The function uses the Google Maps Directions API to get the time.
  private getDriverTime(): void {
    const currentCoordinates = this.sharedDataService.getCoordinates();
    const driverCoords = getClosestDriver(currentCoordinates, this.sharedDataService.getDriverCoordinates());

    const request = {
      origin: driverCoords,
      destination: currentCoordinates,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.PESSIMISTIC
      }
    };

    this.directionsService.route(request, (result, status) => {
      if (status == 'OK' && result) {
        this.time = result?.routes[0]?.legs[0]?.duration_in_traffic?.text || '10 mins';
      } else {
        this.time = '99 mins';
      }
    });
  }
}
