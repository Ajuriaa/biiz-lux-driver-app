<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import WhiteButton from '@/components/buttons/WhiteButton.vue';
import ClockIcon from '~icons/fluent/clock-28-filled';
import { useRouter } from 'vue-router';
import { hasNewTrip } from "@/services/trip";

const router = useRouter();

function goToMaps() {
  router.push('/maps');
}
</script>

<template>
  <IonPage>
    <IonContent>
      <div class="container">
        <!-- White Buttons -->
        <section class="trip-container" @click="goToMaps()">
          <div class="buttons">
            <div class="label">
              <ClockIcon class="icon" />
              <span>7 MIN.</span>
            </div>
            <WhiteButton message="IR AL VIAJE" />
          </div>
        </section>

        <section class="cursos-container">
          <div class="label">
            SOON
          </div>
          <WhiteButton message="CURSOS" />
        </section>

        <section class="asistencia-container">
          <div class="label">
            SOON
          </div>
          <WhiteButton message="ASISTENCIA" />
        </section>

        <PrimaryButton @click="hasNewTrip = true">Viajes Programados</PrimaryButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">
@import '@/core/sass/global';

.container {
  @include flex-column;
  margin: 0 5%;
  gap: 0.7rem;
  height: 90%;
  justify-content: space-around;

  .trip-container {
    height: 50%;
    width: 100%;
    @include background-cover(
      'https://biiz-bucket.s3.us-east-2.amazonaws.com/specials.png'
    );
    border-radius: 0.6rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 1rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
}

@mixin wide-display($bg-name) {
  height: 20%;
  width: 100%;
  border-radius: 0.6rem;
  @include background-cover(
    'https://biiz-bucket.s3.us-east-2.amazonaws.com/#{$bg-name}.png'
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  .label {
    align-self: flex-end;
  }
}

.cursos-container {
  @include wide-display('specials');
}

.asistencia-container {
  @include wide-display('specials');
}

// For Display / White Button
.label {
  width: 6.6rem;
  height: 2rem;
  background-color: $green;

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
}

.button,
.label {
  @include flex-center;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 0.3rem;
}
</style>
