<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <IonPage>
    <IonContent>
      <div class="home-container">
        <h1>This is home</h1>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">
@import '@/core/sass/global';

.home-container {
  @include flex-center;
  min-width: 34rem;
}
</style>
