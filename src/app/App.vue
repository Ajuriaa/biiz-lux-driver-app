<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Notivue, Notifications, NotivueSwipe } from 'notivue';
import AppHeader from '@/components/AppHeader.vue';
import { customTheme } from '@/theme/notivue';
</script>

<template>
  <IonApp>
    <AppHeader />
    <IonRouterOutlet />
    <!-- Toaster Component -->
    <Notivue v-slot="item" class="toaster">
      <NotivueSwipe :item="item">
        <Notifications :item="item" :theme="customTheme" />
      </NotivueSwipe>
    </Notivue>
  </IonApp>
</template>

<style lang="scss">
@import './styles';

.toaster {
  .Notivue__notification {
    padding: 0.5rem;
    width: 36rem;
  }
  .Notivue__content {
    margin-top: 0.5rem;
    margin-left: 1rem;
  }
  .Notivue__content-title {
    font-weight: 800;
    font-size: 1.5rem;
  }
}
</style>
