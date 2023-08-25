<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import WhiteButton from '@/components/buttons/WhiteButton.vue';
</script>

<template>
  <IonPage>
    <IonContent>
      <div class="container">
        <!-- White Buttons -->
        <section class="trip-container">
          <div class="label">
            7 MIN.
          </div>
          <WhiteButton message="SOLICITAR UNIDAD" />
        </section>

        <section class="cursos-container">
          <div class="button-container">
            <div class="label">
              SOON
            </div>
            <WhiteButton message="CURSOS" />
          </div>
        </section>
        <section class="asistencia-container">
          <div class="button-container">
            <div class="label">
              SOON
            </div>
            <WhiteButton message="ASISTENCIA" />
          </div>
        </section>

        <PrimaryButton>Viajes Programados</PrimaryButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">
@import '@/core/sass/global';

.container {
  @include flex-column;
  justify-content: center;
  min-width: 34rem;
  margin: 0 3rem;
  gap: 0.7rem;

  .trip-container {
    height: 31.6rem;
    width: 100%;
    @include background-cover(
      'https://biiz-bucket.s3.us-east-2.amazonaws.com/especiales.png'
    );
    border-radius: 0.6rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .label {
      margin-bottom: 1.4rem;
    }
  }
}

@mixin wide-display($bg-name) {
  height: 13.2rem;
  width: 100%;
  border-radius: 0.6rem;
  @include background-cover(
    'https://biiz-bucket.s3.us-east-2.amazonaws.com/#{$bg-name}.png'
  );

  .button-container {
    flex-direction: column;
    gap: 5rem;

    .label {
      align-self: flex-end;
    }
  }
}

.cursos-container {
  @include wide-display('cursos-bg');
}

.asistencia-container {
  @include wide-display('asistencias-bg');
}

.button-container {
  display: flex;
  gap: 0.5rem;
  margin: 1.4rem;
}

// For Display / White Button
.label {
  width: 6.6rem;
  height: 2rem;
  background-color: $green;
}

.button,
.label {
  @include flex-center;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 0.3rem;
}
</style>
