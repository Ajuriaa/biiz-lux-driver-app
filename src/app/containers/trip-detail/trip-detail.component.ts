import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TRIP } from 'src/app/core/constants';
import { convertUtcToGmtMinus6 } from 'src/app/core/helpers';
import { ITrip } from 'src/app/interfaces';
import { TripQueries } from 'src/app/services';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit{
  public trip: ITrip = TRIP;
  public loading = true;
  public startTime = '00:00';
  public endTime = '00:00';

  constructor(
    private _router: Router,
    private tripQuery: TripQueries
  ){}

  ngOnInit(): void {
    const tripId = this._router.url.split('/').pop() || '';
    this.tripQuery.getTrip(+tripId).subscribe(({ data }) => {
      if (data) {
        this.trip = data.trip;
        this.loading = false;
        this.startTime = convertUtcToGmtMinus6(this.trip.startTime);
        this.endTime = convertUtcToGmtMinus6(this.trip.endTime || '');
      }
    });
  }

  public goHome(){
    this._router.navigate(['/home']);
  }
}
