import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApolloModule } from 'apollo-angular';
import { GraphqlService } from '../services/graphql.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { HomeComponent } from './containers';
import { ButtonsModule, HeaderModule } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(graphqlService: GraphqlService) {
    graphqlService.create();
  }
}
