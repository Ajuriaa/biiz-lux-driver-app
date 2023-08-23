<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">

</style>
