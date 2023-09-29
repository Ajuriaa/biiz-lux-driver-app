<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';


const mapRef = ref();

const { createMap, getPlaceFromCoordinate } = useMaps(mapRef);

// Use the onMounted hook, so we know the map is in the DOM
onMounted(async () => {
  await createMap();
  // WORKS !
  await getPlaceFromCoordinate({ lat: 14.089502, lng: -87.224393 });
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
