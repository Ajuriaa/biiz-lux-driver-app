<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Notivue, Notifications, NotivueSwipe } from 'notivue';
import AppHeader from '@/components/AppHeader.vue';
import { customTheme } from '@/theme/notivue';
import AppModal from "@/components/AppModal.vue";
import { useRouter } from "vue-router";
import { showModal } from "@/services/modal";
import { ref } from "vue";
import { useWebsocket } from "@/composables/useWebsocket";
import { createTripMutation } from "@/services/trip/trip.mutations";
import { useMutation } from "@vue/apollo-composable";
import { useCookies } from "@vueuse/integrations/useCookies";
import PrimaryButton from './components/buttons/PrimaryButton.vue';
import { isArriving } from '@/services/trip/trip.data';

// interface ITrip {
//   passengerId: number;
//   vehicleId: number;
//   tripAttributes: ITripAttributes
// }

// interface ICoordinate {
//   lat: string
//   lng: string
// }

const newTripData = ref({
  tripId: 0,
  passengerId: 0,
  title: 'confirm_travel',
  action: 'confirm_travel',
})

// type Status = 'active' | 'completed' | 'cancelled';

// interface ITripAttributes {
//   startLocation: ICoordinate;
//   endLocation: ICoordinate;
//   startTime: string;
//   distance: number;
//   fare: string;
//   status: Status;
// }

const router = useRouter();

const { ws } = useWebsocket();
const cookies = useCookies();

const { mutate: newTrip } = useMutation(createTripMutation, {
  variables: {
    passengerId: 2,
    vehicleId: 2,
    tripAttributes: {
      startLocation: { lat: 14.0818, lng: -87.20681 },
      endLocation: { lat: 14.098533, lng: -87.226023 },
      startTime: "2021-10-10T17:00:00.000Z",
      fare: '78',
      distance: 7,
      status: 'active'
    }
  },
  context: {
    headers: {
      'Authorization': `Bearer ${cookies.get('BZ-TOKEN')}`
    }
  }
});

async function closeModal() {
  showModal.value = false;

  const res = await newTrip();

  newTripData.value.tripId = res?.data.createTrip.id;
  newTripData.value.passengerId = res?.data.createTrip.passenger.user.id;

  const chanelId = JSON.stringify({ channel: 'DriverCoordinatesChannel' });

  const payload = JSON.stringify({
    command: 'message',
    identifier: chanelId,
    data: JSON.stringify(newTripData.value)
  });

  isArriving.value = true;

  ws.send(payload);

  await router.push("/travel");
}
</script>

<template>
  <IonApp>
    <AppHeader />
    <IonRouterOutlet />
    <PrimaryButton @click="isArriving = !isArriving">
      Send {{ isArriving }}
    </PrimaryButton>
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
