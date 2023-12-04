import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ToastComponent } from 'src/app/shared/toaster';
import { HttpHeaders } from '@angular/common/http';
import { CookieHelper } from 'src/app/core/helpers';
import { ITripInfo } from 'src/app/interfaces';


const createTrip = gql `
  mutation createTrip( $passengerId: Int!, $vehicleId: Int!, $tripAttributes: TripInput!){
    createTrip( passengerId: $passengerId, vehicleId: $vehicleId, tripAttributes: $tripAttributes
    ){
      id
    }
  }
`;

@Injectable()
export class ModalMutations {
  private _mutateSub!: Subscription;

  constructor(private _apollo: Apollo, private toaster: ToastComponent) {}

  public createTrip(passengerId: number, vehicleId: number, tripAttributes: ITripInfo): Promise<any> {
    return new Promise ((resolve) => {
      if (this._mutateSub) { this._mutateSub.unsubscribe(); }
      this._mutateSub = this._apollo.mutate({
        mutation: createTrip,
        variables: {
          passengerId, vehicleId, tripAttributes
        },
        context: {
          headers: new HttpHeaders().set('Authorization', this._getToken())
        }
      }).subscribe(({ data }: any) => {
        if (data) {
          this.toaster.successToast("Dirección creada correctamente");
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
