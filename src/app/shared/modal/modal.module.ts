import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { LoadingModule } from '../loading/loading.module';
import { ModalMutations } from '../services';
import { ModalComponent } from './components/modal.component';

@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    ButtonsModule,
    LoadingModule,
    IonicModule.forRoot()
  ],
  providers: [ModalMutations]
})
export class ModalModule { }
