import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApolloModule } from 'apollo-angular';
import { GraphqlService } from '../services/graphql.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { HomeComponent, PickUpComponent, TravelingComponent, TripComponent, TripDetailComponent } from './containers';
import { ButtonsModule, HeaderModule } from './shared';
import { ModalMutations } from './shared/services';
import { TripMutations } from './services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TripComponent,
    PickUpComponent,
    TravelingComponent,
    TripDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    AuthModule,
    ButtonsModule,
    HeaderModule,
    IonicModule.forRoot()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ModalMutations,
    TripMutations
  ]
})
export class AppModule {
  constructor(graphqlService: GraphqlService) {
    graphqlService.create();
  }
}
