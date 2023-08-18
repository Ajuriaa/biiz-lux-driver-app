<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <AppHeader />
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">

</style>
