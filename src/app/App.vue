<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/vue';
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <IonApp>
    <AppHeader />
    <IonContent>
      <IonRouterOutlet />
    </IonContent>
  </IonApp>
</template>

<style lang="scss">
@import './styles';
</style>
