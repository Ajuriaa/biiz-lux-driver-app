<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonPage } from '@ionic/vue';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../environments/environments'; 
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import { usePush } from 'notivue';

const push = usePush();

const mapRef = ref();
let newMap: GoogleMap;

const tmpCoords = { lat: 14.060536, lng: -87.241214 };

onMounted(async () => {
  newMap = await GoogleMap.create({
    id: 'my-map', // Unique identifier for this map instance
    element: mapRef.value, // reference to the capacitor-google-map element
    apiKey: environment.mapsApiKey, // Your Google Maps API Key
    config: {
      center: tmpCoords,
      zoom: 17, // The initial zoom level to be rendered by the map
      clickableIcons: false,
      disableDefaultUI: true,
      keyboardShortcuts: false,
      gestureHandling: "greedy"
    },
  });
  // Add a marker to the map
  await newMap.addMarker({
    coordinate: tmpCoords
  });
})

// Clean up the map reference.
onUnmounted(async () => await newMap.destroy());
</script>

<template>
  <IonPage>
    <div
      ref="mapRef"
      class="maps-container"
    />
    <div class="buttons">
      <div class="action-buttons">
        <PrimaryButton>
          Eventos
        </PrimaryButton>
        <PrimaryButton>
          Programar
        </PrimaryButton>
      </div>
      <!-- To be removed after PR review -->
      <PrimaryButton @click="push.success('Destino confirmado')">
        <div class="confirm">
          <div class="text">CONFIRMAR DESTINO</div>
          <img class="button-image" src="https://biz-app-bucket.s3.us-east-2.amazonaws.com/iiz-green.png">
        </div>
      </PrimaryButton>
    </div>
  </IonPage>
</template>

<style scoped lang="scss">
.maps-container {
  width: 100%;
  height: 100%;
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

  .action-buttons {
    display: flex;
    gap: 0.5rem;
    width: 100%;
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
