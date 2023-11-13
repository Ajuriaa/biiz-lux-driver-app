import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth';
import { ProfileComponent } from './shared/profile/components';
import { CustomerServiceComponent } from './shared/customer-service/';
import { FaqComponent } from './shared/faq';
import { HomeComponent, PickUpComponent, TravelingComponent, TripComponent, TripDetailComponent } from './containers';
import { ModalComponent } from './shared/modal';

const routes: Routes = [
  { path: '', title: 'Login!', component: LoginComponent },
  {
    path: 'home',
    title: 'Inicio',
    component: HomeComponent
  },
  {
    path: 'trip',
    title: 'Viaje',
    component: TripComponent
  },
  {
    path: 'profile',
    title: 'Perfil',
    component: ProfileComponent
  },
  {
    path: 'customer-service',
    title: 'Servicio al cliente',
    component: CustomerServiceComponent
  },
  {
    path: 'faq',
    title: 'Preguntas frecuentes',
    component: FaqComponent
  },
  {
    path: 'pickup/:id',
    title: 'pickup',
    component: PickUpComponent
  },
  {
    path: 'traveling/:id',
    title: 'traveling',
    component: TravelingComponent
  },
  {
    path: 'trip-detail/:id',
    title: 'trip-detail',
    component: TripDetailComponent
  }

  // Errors routes
  // { path: 'error', title: 'Error', component: NotFoundErrorComponent },
  // { path: 'not-allowed',  title: 'No permitido', component: NotAllowedErrorComponent },
  // { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
