<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';

const emit = defineEmits(['newCoords']);
const mapRef = ref();

const { createMap, setNewMarker } = useMaps(mapRef);

onMounted(async () => {
  const { map, coords } = await createMap();

  // To see if coords are working
  // TODO: emits To be removed after demo
  const { latitude, longitude } = coords;
  emit('newCoords', { latitude, longitude })

  await map.value?.setOnMapClickListener(async ({ latitude, longitude }) => {
    const newCoords = { latitude, longitude };
    emit('newCoords', newCoords);
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
