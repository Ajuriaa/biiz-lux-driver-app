import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SharedDataService, GlobalWebsocketService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private sharedDataService: SharedDataService,
    private websocket: GlobalWebsocketService,
    ) {
      this.websocket.connectWebSocket();
    }

  async ngOnInit(): Promise<void> {
    await this.checkGeolocationPermissions();
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
}
