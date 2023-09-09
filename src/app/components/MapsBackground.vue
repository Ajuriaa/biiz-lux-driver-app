<script setup lang="ts">
import { ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';

const mapRef = ref();

useMaps(mapRef);
</script>

<template>
  <div
    ref="mapRef"
    class="maps-container"
  />
</template>

<style scoped lang="scss">
.maps-container {
  width: 100%;
  height: 100%;
}
</style>
