<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/vue';
import { Notivue, Notifications } from 'notivue'
import AppHeader from '@/components/AppHeader.vue';
</script>

<template>
  <IonApp>
    <AppHeader />
    <IonContent>
      <IonRouterOutlet />
    </IonContent>
    <!-- Toaster Component -->
    <Notivue v-slot="item">
      <Notifications :item="item" />
    </Notivue>
  </IonApp>
</template>

<style lang="scss">
@import './styles';
</style>
