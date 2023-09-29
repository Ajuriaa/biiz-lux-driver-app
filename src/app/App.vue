<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Notivue, Notifications, NotivueSwipe } from 'notivue';
import AppHeader from '@/components/AppHeader.vue';
import { customTheme } from '@/theme/notivue';
import AppModal from "@/components/AppModal.vue";
import { useRouter } from "vue-router";
import { showModal } from "@/services/modal";
import {onMounted} from "vue";
import {useWebsocket} from "@/composables/useWebsocket";

const router = useRouter();

const { ws } = useWebsocket();

function closeModal() {
  showModal.value = false;
  router.push("/travel");
}

onMounted(() => {

});
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
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <AppModal :show="showModal" @close="closeModal()">
        <template #header>
          <h3>Nuevo Viaje!</h3>
        </template>
        <template #body>
          <h4>Deseas aceptarlo?</h4>
        </template>
      </AppModal>
    </Teleport>
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
