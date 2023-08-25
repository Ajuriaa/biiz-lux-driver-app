<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { ref } from 'vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import ToggleButton from '@/components/buttons/ToggleButton.vue';
import DisplayButton from '@/components/buttons/DisplayButton.vue';
import WhiteButton from '@/components/buttons/WhiteButton.vue';
import RadioButton from '@/components/buttons/RadioButton.vue';

// TODO: Remove after demo
const options = ref(['Yes', 'No']);
const selectedOption = ref(options.value[0]);
</script>

<template>
  <IonPage>
    <IonContent>
      <div class="container">
        <!-- White Buttons -->
        <section class="trip-container">
          <div class="label">7 MIN.</div>
          <WhiteButton message="SOLICITAR UNIDAD" />
        </section>

        <section class="experience-container">
          <div class="button-container">
            <div class="label">SOON</div>
            <WhiteButton message="EXPERIENCIAS" />
          </div>
        </section>

        <!-- Display Button -->
        <section class="shared-container">
          <DisplayButton
            message="VIAJE AEROPUERTO"
            link="../airport"
            class="airport-container display-btn"
          />
          <DisplayButton
            message="ESPECIALES"
            link="../specials"
            class="specials-container display-btn"
          />
        </section>

        <PrimaryButton>PRIMARY</PrimaryButton>
        <PrimaryButton :show-notification="true">
          PRIMARY WITH NOTIFICATION
        </PrimaryButton>
        <PrimaryButton :disable-button="true">PRIMARY DISABLED</PrimaryButton>
        <PrimaryButton>
          <div class="confirm">
            <div class="text">CONFIRMAR DESTINO</div>
            <img
              class="button-image"
              src="https://biz-app-bucket.s3.us-east-2.amazonaws.com/iiz-green.png"
            />
          </div>
        </PrimaryButton>

        <SecondaryButton>SECONDARY</SecondaryButton>

        <ToggleButton />
        <ToggleButton :checked="true" />

        <h3>Selected Option: {{ selectedOption }}</h3>
        <div v-for="option in options">
          <RadioButton
            :option="option"
            :selected-option="selectedOption"
            @changeSelected="(newOption) => (selectedOption = newOption)"
          />
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">
@import '@/core/sass/global';

.container {
  @include flex-column;
  min-width: 34rem;
  gap: 0.7rem;
}

// TODO: Remove after demo
.confirm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .text {
    margin-left: 30%;
  }

  .button-image {
    margin-right: 3rem;
  }
}

// Experiences

.experience-container {
  height: 13.2rem;
  width: 34.2rem;
  border-radius: 0.6rem;
  @include background-cover(
    'https://biiz-bucket.s3.us-east-2.amazonaws.com/experiencias.png'
  );

  .button-container {
    flex-direction: column;
    gap: 5rem;

    .label {
      align-self: flex-end;
    }
  }
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
.trip-container {
  height: 31.6rem;
  width: 34.2rem;
  @include background-cover(
    'https://biiz-bucket.s3.us-east-2.amazonaws.com/unidad.png'
  );
  border-radius: 0.6rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  .label {
    margin-bottom: 1.4rem;
  }
}

.shared-container {
  display: flex;
  gap: 0.5rem;
}

.airport-container {
  @include background-cover(
    'https://biiz-bucket.s3.us-east-2.amazonaws.com/airport.png'
  );
}

.specials-container {
  @include background-cover(
    'https://biiz-bucket.s3.us-east-2.amazonaws.com/especiales.png'
  );
}
</style>
