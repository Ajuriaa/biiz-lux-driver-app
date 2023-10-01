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
import { isDrivingToPassenger, travelData } from '@/services/trip/trip.data';
import { getToken } from './core/helpers/token-helper';

const newTripData = ref({
  tripId: 0,
  passengerId: 0,
  title: 'confirm_travel',
  action: 'confirm_travel',
})

const router = useRouter();

const { ws } = useWebsocket();

const { mutate: newTrip } = useMutation(createTripMutation, () => ({
  variables: {
    passengerId: 2,
    vehicleId: 2,
    tripAttributes: {
      startLocation: travelData.startCoords,
      endLocation: travelData.endCoords,
      startTime: "2021-10-10T17:00:00.000Z",
      fare: '155',
      distance: 7,
      status: 'active'
    }
  },
  context: {
    headers: {
      // Change 1: Replace with getToken
      'Authorization': getToken()
    }
  }
}));

const chanelId = JSON.stringify({ channel: 'DriverCoordinatesChannel' });

async function closeModal() {
  showModal.value = false;

  const res = await newTrip();

  isDrivingToPassenger.value = true;

  // Set the new trip info from the response received from creating the trip
  newTripData.value.tripId = res?.data.createTrip.id;
  newTripData.value.passengerId = res?.data.createTrip.passenger.user.id;

  // Send the new Trip data
  const payload = JSON.stringify({
    command: 'message',
    identifier: chanelId,
    data: JSON.stringify(newTripData.value)
  });

  ws.send(payload);

  await router.push("/travel");
}


</script>

<template>
  <IonApp>
    <AppHeader />
    <IonRouterOutlet />
    <!-- <PrimaryButton @click="travel">
      Traveling {{ isTraveling }}
    </PrimaryButton>
    <PrimaryButton @click="acceptTrip">
      Arriving {{ isArriving }}
    </PrimaryButton> 
     -->
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
