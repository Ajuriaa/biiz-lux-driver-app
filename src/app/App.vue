<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <IonApp>
    <AppHeader />
    <IonRouterOutlet />
  </IonApp>
</template>

<style lang="scss">
@import './styles';
</style>
