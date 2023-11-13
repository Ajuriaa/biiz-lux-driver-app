import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ICoordinate, IDriver } from '../interfaces';
import { DEFAULT_COORDS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private coordinates = DEFAULT_COORDS;
  private closeDriversCoordinates: ICoordinate[] = [];
  private closeDrivers : IDriver[] = [{id : 0, coordinates : DEFAULT_COORDS}];
  private marker = new google.maps.Marker();
  private destinationMarker = new google.maps.Marker();
  private driverCoords: ICoordinate = DEFAULT_COORDS;
  private tripDistance = 0;

  public async setDefaultCoordinates(): Promise<ICoordinate> {
    const coords = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
    this.coordinates= { lat: coords.coords.latitude, lng: coords.coords.longitude };
    return this.coordinates;
  }

  public getTripDistance(): number {
    return this.tripDistance/1000;
  }

  public setTripDistance(distance: number): void {
    this.tripDistance += distance;
  }

  public getCoordinates() {
    return this.coordinates;
  }

  public setDriverCoordinates(drivers: IDriver[]) {
    this.closeDrivers = drivers;
    this.closeDriversCoordinates = this.closeDrivers.map(driver => driver.coordinates);
  }

  public setCurrentMarker(marker: google.maps.Marker) {
    this.marker = marker;
  }

  public getCurrentMarker() {
    return this.marker;
  }

  public setDestinationMarker(marker: google.maps.Marker) {
    this.destinationMarker = marker;
  }

  public getDestinationMarker() {
    return this.destinationMarker;
  }

  public getDriverCoordinates() {
    return this.closeDriversCoordinates;
  }

  public setDriverCoord(coords: ICoordinate): void {
    this.driverCoords = coords;
  }

  public getDriverCoord(): ICoordinate {
    return this.driverCoords;
  }

  public resetData(): void {
    this.coordinates = DEFAULT_COORDS;
    this.closeDriversCoordinates = [];
    this.closeDrivers = [{id : 0, coordinates : DEFAULT_COORDS}];
    this.marker = new google.maps.Marker();
    this.destinationMarker = new google.maps.Marker();
    this.driverCoords = DEFAULT_COORDS;
  }
}
