<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';
import { MarkerUrl } from "@/core/enums/marker";

const mapRef = ref();

const { createMap, addMarker } = useMaps(mapRef);

// Use the onMounted hook, so we know the map is in the DOM
onMounted(async () => {
  const { myCoords } = await createMap();
  addMarker({ lat: myCoords.lat, lng: myCoords.lng }, MarkerUrl.driver);
});
</script>

<template>
  <IonPage>
    <div ref="mapRef" class="maps-container" />
  </IonPage>
</template>

<style scoped lang="scss">
.maps-container {
  width: 100%;
  height: 100%;
}
</style>
