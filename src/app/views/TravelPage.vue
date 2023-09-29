<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import { usePush } from "notivue";


const mapRef = ref();

const { createMap, renderRoute } = useMaps(mapRef);

const push = usePush();

function confirm() {
  push.success({ title: 'Exito!', message: 'Destino Confirmado!' })
}

// Use the onMounted hook, so we know the map is in the DOM
onMounted(async () => {
  const { myCoords } = await createMap();
  renderRoute({lat: 14.105114, lng: -87.233244}, { lat: myCoords.latitude, lng: myCoords.longitude })
});
</script>

<template>
  <IonPage>
    <div ref="mapRef" class="maps-container" />
    <div class="buttons">
      <PrimaryButton showLogo @click="confirm">
        Confirmar Destino
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
