<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import MapsBackground from '@/components/MapsBackground.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
</script>

<template>
  <MapsBackground />
  <div class="buttons">
    <div class="action-buttons">
      <PrimaryButton>Eventos</PrimaryButton>
      <PrimaryButton>Programar</PrimaryButton>
    </div>
    <PrimaryButton showLogo>Confirmar Destino</PrimaryButton>
  </div>
</template>

<style scoped lang="scss">
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
