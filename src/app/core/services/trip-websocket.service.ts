import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SharedDataService } from './shared-data.service';
import { WebsocketChannels } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class TripWebsocketService {
  private socket!: WebSocket;
  private tripId: string = '';
  private tracking = true;

  constructor(
    private sharedData: SharedDataService
  ) {}

  public unsubscribe(): void {
    const id = JSON.stringify({channel: 'CurrentTripChannel'});
    const payload = JSON.stringify({
      command: 'unsubscribe',
      identifier: id
    });
    this.socket.send(payload);
  }

  public notifyArrival() {
    const id = JSON.stringify({
      channel: 'CurrentTripChannel',
      trip_id: this.tripId
    });
    const data = JSON.stringify({action: 'send_data', info: {title: 'driverArrived'}, trip_id: this.tripId});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: data
    });
    this.socket.send(payload);
    this.tracking = false;
  }

  public finishTrip() {
    console.log('terminando viaje');
    const id = JSON.stringify({
      channel: 'CurrentTripChannel',
      trip_id: this.tripId
    });
    const data = JSON.stringify({action: 'send_data', info: {title: 'tripFinished'}, trip_id: this.tripId});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: data
    });
    this.socket.send(payload);
  }

  public sendCoordinates(): void {
    const id = JSON.stringify({
      channel: WebsocketChannels.TRIP,
      trip_id: this.tripId
    });
    // data = {title: 'driverCoords', driverCoords = {lat: 1, lng: 2}}
    const response = {title: 'driverCoords', driverCoords: { lat: 14.08028328277766, lng: -87.20765003957904 }};
    const wsData = JSON.stringify({action: 'send_data', info: response, trip_id: this.tripId});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: wsData
    });
    console.log('enviando: ', response);
    this.socket.send(payload);
  }

  public connectWebSocket(tripId: string) {
    this.tripId = tripId;
    this.socket = new WebSocket(environment.wsUrl);

    this.socket.onopen = () => {
      const id = JSON.stringify({
        channel: WebsocketChannels.TRIP,
        trip_id: tripId
      });
      const payload = JSON.stringify({
        command: 'subscribe',
        identifier: id
      });
      this.socket.send(payload);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if(this.tracking && data.type === 'ping') {
        this.sendCoordinates();
      }
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection died');
      }

      setTimeout(() => this.connectWebSocket(this.tripId), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
}
