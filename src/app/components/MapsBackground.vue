<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonPage } from '@ionic/vue';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../environments/environments';

const mapRef = ref();
let newMap: GoogleMap;

const tmpCoords = { lat: 14.060536, lng: -87.241214 };

onMounted(async () => {
  newMap = await GoogleMap.create({
    id: 'my-map',
    element: mapRef.value,
    apiKey: environment.mapsApiKey,
    config: {
      center: tmpCoords,
      zoom: 17,
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
  </IonPage>
</template>

<style scoped lang="scss">
.maps-container {
  width: 100%;
  height: 100%;
}
</style>
