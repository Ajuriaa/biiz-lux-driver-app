<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppHeader from "@/components/AppHeader.vue";
import AppCalendar from "@/components/AppCalendar.vue";

const router = useRouter();
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <AppHeader />
      <AppCalendar />
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">

</style>
