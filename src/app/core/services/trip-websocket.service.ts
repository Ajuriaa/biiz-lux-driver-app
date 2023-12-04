import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { WebsocketChannels } from '../enums';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class TripWebsocketService {
  private socket!: WebSocket;
  private tripId = '';
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
    const response = {title: 'driverCoords', driverCoords: { lat: this.sharedData.getCoordinates().lat, lng: this.sharedData.getCoordinates().lng }};
    const wsData = JSON.stringify({action: 'send_data', info: response, trip_id: this.tripId});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: wsData
    });
    this.socket.send(payload);
  }

  public sendDriverStatus(status: string): void {
    const id = JSON.stringify({
      channel: WebsocketChannels.TRIP,
      trip_id: this.tripId
    });
    const response = {title: 'driverStatus', status: status};
    const wsData = JSON.stringify({action: 'send_data', info: response, trip_id: this.tripId});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: wsData
    });
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

      if(data.message.title === 'tripStatus') {
        const status = this.tracking ? 'awaiting' : 'traveling';
        this.sendDriverStatus(status);
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
