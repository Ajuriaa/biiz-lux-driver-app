<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import { usePush } from "notivue";
import { travelData } from "@/services/trip/trip.data";

const mapRef = ref();

const { createMap, renderRoute, renderPassengerRoute } = useMaps(mapRef);

const push = usePush();

function confirm() {
  push.success({ title: 'Exito!', message: 'Destino Confirmado!' })
}

// Use the onMounted hook, so we know the map is in the DOM
onMounted(async () => {
  const { myCoords } = await createMap();

  const passengerRoute = travelData.startCoords;
  const finalRoute = travelData.endCoords;

  renderRoute(passengerRoute, { lat: myCoords.lat, lng: myCoords.lng })
  renderPassengerRoute( passengerRoute, finalRoute);
});
</script>

<template>
  <IonPage>
    <div ref="mapRef" class="maps-container" />
    <div class="estimated">
      <span class="time">17:45</span>
    </div>
    <div class="buttons">
      <div class="action-buttons">
        <div class="pick-passenger">
          Recoger Pasajero
        </div>
        <div class="locations">
          <div class="location from">
            Lomas del Guijarro
          </div>
          <div class="location to">
            Las Colinas
          </div>
        </div>
      </div>
      <PrimaryButton showLogo @click="confirm">
        Confirmar Destino
      </PrimaryButton>
    </div>
  </IonPage>
</template>

<style scoped lang="scss">
@import '@/core/sass/colors';

.maps-container {
  width: 100%;
  height: 100%;
}

.estimated {
  position: absolute;
  top: 10rem;
  right: 2rem;
  background-color: $black;
  padding: 1.5rem 3rem;
  border-radius: 4px;
  color: $white;
  font-size: 2rem;
  font-weight: 900;
}

.buttons {
  position: absolute;
  bottom: 2rem;
  width: 100%;
  padding: 0 2rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;

  .action-buttons {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    flex-direction: column;


    .pick-passenger {
      background-color: $green;
      padding: 1.5rem;
      text-align: center;
      border-radius: 4px;
    }
    .locations {
      display: flex;

      .location {
        width: 100%;
        text-align: center;
        padding: 1rem;
      }
      
      .from {
        background-color: $white;
      }

      .to {
        background-color: $black;
        color: $white;
      }
    }
  }
}

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
</style>
