<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import { IonPage, IonContent } from '@ionic/vue'
import TicketBg from '@/components/TicketBg.vue'
import CheckIcon from '~icons/fluent/checkmark-circle-48-filled'
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <IonPage>
    <IonContent>
      <div class="container">
        <section class="section">
          <div class="qr">
            <TicketBg class="ticket-bg" />
            <div class="info">
              <span class="ticket-id">TKLS#4428239471</span>
              <span class="finished-text">Tu viaje ha finalizado</span>
              <div class="qr-container">
                <img
                  class="qr-image"
                  src="https://biiz-bucket.s3.us-east-2.amazonaws.com/qr-finshed.png"
                >
              </div>
              <span class="no-incidents-text">Sin Incidentes</span>
            </div>
          </div>
          <CheckIcon class="check-icon" />
          <div class="summary" />
          <div class="logo-container">
            <img src="https://biiz-bucket.s3.us-east-2.amazonaws.com/atlantis-logo-white.png">
          </div>
        </section>
        <PrimaryButton text="Regresar a Inicio" @click="router.push('/home')" />
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">
@import '@/core/sass/global';

// To center page content
.container {
  @include flex-column;
  margin: 0 5%;
  gap: 0.7rem;
  height: 90%;
  justify-content: space-around;

  .section {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #A6A6A6;
    margin-top: 3.5rem;
    border-radius: 6px;
    position: relative;
    align-items: center;

    .logo-container {
      margin-top: 8rem;
      transform: scale(0.8);
    }

    .summary {
      width: 83%;
      height: 16rem;
      border-radius: 8px;
      background-color: $white;
      margin-top: 3rem;
      background-image: url('https://biiz-bucket.s3.us-east-2.amazonaws.com/mock-directions.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 90%;
    }

    .check-icon {
      color: $green;
      background-color: $white;
      border-radius: 1000px;
      height: 6rem;
      width: 6rem;
      position: absolute;
      top: 21rem;
    }

    .qr {      
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .ticket-bg {
        position: absolute;
        width: 100%;
      }

      .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        margin-top: 5rem;

        .finished-text {
          text-transform: uppercase;
          font-size: 1.3rem;
          font-weight: 900;
        }

        .no-incidents-text {
          text-transform: uppercase;
          font-weight: 900;
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
}
</style>
