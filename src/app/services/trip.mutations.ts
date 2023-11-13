import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ToastComponent } from 'src/app/shared/toaster';
import { HttpHeaders } from '@angular/common/http';
import { CookieHelper } from 'src/app/core/helpers';

const updateTripStatus = gql `
  mutation updateTripStatus($tripId: Int!, $status: String!){
    updateTripStatus(tripId: $tripId, status: $status)
  }
`;

@Injectable()
export class TripMutations {
  private _mutateSub!: Subscription;

  constructor(private _apollo: Apollo, private toaster: ToastComponent) {}

  public updateTripStatus(tripId: number, status: string): Promise<boolean> {
    return new Promise ((resolve) => {
      if (this._mutateSub) { this._mutateSub.unsubscribe(); }
      this._mutateSub = this._apollo.mutate({
        mutation: updateTripStatus,
        variables: {
          tripId, status
        },
        context: {
          headers: new HttpHeaders().set('Authorization', this._getToken())
        }
      }).subscribe(({ data }: any) => {
        if (data) {
          this.toaster.successToast("Estado del viaje actualizado correctamente");
          resolve(data);
        }
      }, (error) => {
        this.toaster.errorToast(error.message);
      });
    });
  }

  private _getToken(): string {
    return CookieHelper.getToken();
  }
}
