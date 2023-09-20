<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';

interface latLng {
  latLng: { lat: () => number; lng: () => number };
}

const mapRef = ref();

const { createMap, addMarker } = useMaps(mapRef);

// Use the onMounted hook so we know the map is in the DOM
onMounted(async () => {
  const { map } = await createMap();

  map.value?.addListener('click', ({ latLng: { lat, lng } }: latLng) => {
    const newCoords = { latitude: lat(), longitude: lng() };
    addMarker(newCoords);
  });
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
