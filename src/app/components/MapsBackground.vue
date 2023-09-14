<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';

const mapRef = ref();

const { createMap, setNewMarker } = useMaps(mapRef);

// Use the onMounted hook so we know the map is in the DOM
onMounted(async () => {
  const { map } = await createMap();

  await map.value?.setOnMapClickListener(async ({ latitude, longitude }) => {
    const newCoords = { latitude, longitude };
    await setNewMarker(newCoords);
  })
})

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
