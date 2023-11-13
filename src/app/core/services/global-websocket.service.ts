import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/shared/modal';
import { Router } from '@angular/router';
import { WebsocketChannels } from '../enums';
import { CookieHelper } from '../helpers';
import { TripWebsocketService } from './trip-websocket.service';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root',
})

export class GlobalWebsocketService {
  private socket!: WebSocket;
  public messageSubject = new Subject<string>();

  constructor(
    private sharedData: SharedDataService,
    private tripSocket: TripWebsocketService,
    private modalCtrl: ModalController,
    private _router: Router
  ) {}

  async openModal(info: any) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        tripInfo: info
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    const id = JSON.stringify({channel: 'AvailableDriversChannel'});

    if(role === 'rejected'){
      const response = {title: 'driverResponse', passengerId: info.passenger_id, answer: 'rejected', tripId: 0};
      const wsData = JSON.stringify({action: 'send_data', info: response});
      const payload = JSON.stringify({
        command: 'message',
        identifier: id,
        data: wsData
      });
      this.socket.send(payload);
    }

    if(role === 'accepted'){
      this._router.navigate(['pickup', data]);
      const response = {title: 'driverResponse', passengerId: info.passenger_id, answer: 'accepted', tripId: data};
      const wsData = JSON.stringify({action: 'send_data', info: response});
      const payload = JSON.stringify({
        command: 'message',
        identifier: id,
        data: wsData
      });
      this.socket.send(payload);

      this.tripSocket.connectWebSocket(data);
      this.unsubscribe();
    }
  }

  public unsubscribe(): void {
    const id = JSON.stringify({channel: 'AvailableDriversChannel'});
    const payload = JSON.stringify({
      command: 'unsubscribe',
      identifier: id
    });
    this.socket.send(payload);
  }

  public sendCoordinates(coordsInfo: any) {
    const id = JSON.stringify({channel: 'AvailableDriversChannel'});
    const data = JSON.stringify({action: 'send_data', info: coordsInfo});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: data
    });
    this.socket.send(payload);
  }

  public connectWebSocket() {
    this.socket = new WebSocket(environment.wsUrl);

    this.socket.onopen = () => {
      const id = JSON.stringify({channel: WebsocketChannels.GLOBAL});
      const payload = JSON.stringify({
        command: 'subscribe',
        identifier: id
      });
      this.socket.send(payload);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = data.message;

      if(message === 'sendCoordinates'){
        // data = {title: 'driverCoordinates', driver: driverId, lat: 1, lng: 1}
        const data = {title: 'driverCoordinates', driver: +this._getPassengerId(), lat: this.sharedData.getCoordinates().lat, lng: this.sharedData.getCoordinates().lng };
        this.sendCoordinates(data);
      }

      if(message.title === 'driverRequest' && message.driver_id === +this._getPassengerId()){
        this.openModal(message);
      }
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection died');
      }

      setTimeout(() => this.connectWebSocket(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private _getPassengerId(): string {
    return CookieHelper.getUserInfo();
  }
}
