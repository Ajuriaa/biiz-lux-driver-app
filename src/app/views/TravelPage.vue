<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { useMaps } from '@/composables/useMaps';
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import { usePush } from "notivue";
import { travelData } from "@/services/trip/trip.data";
import ChatIcon from '~icons/fluent/chat-multiple-32-filled'
import CheckIcon from '~icons/fluent/checkmark-circle-12-filled'
import CloseIcon from '~icons/fluent/dismiss-12-filled'

const mapRef = ref();
const confirmed = ref();
const show = ref();

const { createMap, renderRoute, renderPassengerRoute } = useMaps(mapRef);

const push = usePush();

const globalMap = ref();

function confirm() {
  confirmed.value = true;
  
  setTimeout(() => {
    show.value = true;
  }, 600);

  setTimeout(() => {
    show.value = false;
  }, 2000);
  globalMap.value?.setZoom(14);
}

function mockCoords() {
  travelData.startCoords = {
    lat: 14.098955,
    lng:  -87.214987
  }

  travelData.endCoords = {
    lat: 14.095599, 
    lng: -87.211015
  }
}

// Use the onMounted hook, so we know the map is in the DOM
onMounted(async () => {
  const { map, myCoords } = await createMap();

  globalMap.value = map.value;
  mockCoords();

  const passengerRoute = travelData.startCoords;
  const finalRoute = travelData.endCoords;

  renderRoute(passengerRoute, { lat: myCoords.lat, lng: myCoords.lng })
  renderPassengerRoute( passengerRoute, finalRoute);
});

function finishTravel() {

}
</script>

<template>
  <IonPage>
    <div ref="mapRef" class="maps-container" />
    <Transition name="slide-fade">
      <div v-if="!confirmed" class="estimated">
        <span class="time">17:45</span>
      </div>
    </Transition>
    <Transition name="slide-up" mode="out-in">
      <div v-if="confirmed" class="travel-buttons">
        <Transition name="slide-fade">
          <div v-if="show" class="confirmed-alert">
            <div class="info">
              <CheckIcon class="confirm icon" />
              <span class="text">Viaje Iniciado</span>
            </div>
            <div class="cancel" @click="show = false">
              <CloseIcon class="icon" />
            </div>
          </div>
        </Transition>
        <div class="time-container">
          <div class="time-btn start-travel-time">
            7:00
          </div>
          <div class="time-btn end-travel-time">
            17:45
          </div>
        </div>
        <div class="travel-info">
          <div class="user-info">
            <img src="https://biiz-bucket.s3.us-east-2.amazonaws.com/profile-image.png">
            <span class="passenger-name">Lic. Mena</span>
          </div>
          <div class="travel-actions">
            <div class="chat-icon">
              <ChatIcon class="icon" />
            </div>
            <div class="report">
              Reportar
            </div>
          </div>
        </div>
        <PrimaryButton class="finish-travel" text="Terminar Viaje" showLogo @click="finishTravel" />
      </div>
      <div v-else class="buttons">
        <div class="action-buttons">
          <div class="estimated-time">
            7:00
          </div>
          <div class="pick-passenger">
            Recoger Pasajero
          </div>
          <div class="locations">
            <div class="location from">
              Lomas del Guijarro
            </div>
            <div class="location to">
              Las Colinas
            </div>
          </div>
        </div>
        <PrimaryButton showLogo @click="confirm">
          Confirmar Destino
        </PrimaryButton>
      </div>
    </Transition>
  </IonPage>
</template>

<style scoped lang="scss">
@import '@/core/sass/colors';

.maps-container {
  width: 100%;
  height: 100%;
}

.estimated {
  position: absolute;
  top: 10rem;
  right: 2rem;
  background-color: $black;
  padding: 1.5rem 3rem;
  border-radius: 4px;
  color: $white;
  font-size: 2rem;
  font-weight: 900;
}



.icon {
  width: 2.5rem;
  height: 2.5rem;
}

.cancel {
  height: 100%;
  width: 5rem;

  .icon {
    width: 100%;
    height: 100%;
    padding: 1.5rem;
  }
}

.travel-buttons {
  position: absolute;
  bottom: 2rem;
  padding: 0 1.5rem;
  width: 100%;

  .confirmed-alert {
    background-color: $green;
    border-radius: 8px;
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1.5rem;
    
    .info {
      display: flex;
      align-items: center;
      gap: 1rem;

      .text {
        transform: translateY(0.5rem);
      }
    }
  }

  .travel-info {
    display: flex;
    margin: 0.75rem 0;
    gap: 0.75rem;
    
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $white;
      width: 60%;
      padding: 2rem 0;
      border-radius: 4px;
      box-shadow: 2px 4px 20px #a5a5a5;


      .passenger-name {
        margin-top: 1rem;
        text-transform: uppercase;
      }
    }

    .travel-actions {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 40%;

      .chat-icon {
        background-color: white;
        height: 100%;
        margin-bottom: 0.75rem;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 2px 4px 10px #bbbbbb;

        .icon {
          width: 55%;
          height: 55%;
          margin: 2rem;
        }
      }

      .report {
        background-color: $black;
        color: $white;
        text-align: center;
        padding: 1.75rem;
        border-radius: 4px;
        text-transform: uppercase;
        box-shadow: 2px 4px 20px #b7b7b7;

      }
    }
  }

  .time-container {
    display: flex;
    width: 100%;
    gap: 0.5rem;

    .time-btn {
      padding: 0.75rem 1rem;
      font-size: 1.5rem;
      font-weight: bold;
      border-radius: 4px;
    }

    .start-travel-time {
      background-color: $black;
      color: $white;
      width: 80%;
    }

    .end-travel-time {
      background-color: $green;
      color: $black;
      width: 20%;
    }
  }
}

.buttons {
  position: absolute;
  bottom: 2rem;
  width: 100%;
  padding: 0 2rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;

  .action-buttons {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    flex-direction: column;

    .estimated-time {
      background-color: $green;
      width: min-content;
      padding: 1rem 3rem;
      border-radius: 4px;
    }

    .pick-passenger {
      background-color: $green;
      padding: 1.5rem;
      text-align: center;
      border-radius: 4px;
    }
    .locations {
      display: flex;

      .location {
        width: 100%;
        text-align: center;
        padding: 1rem;
      }
      
      .from {
        background-color: $white;
      }

      .to {
        background-color: $black;
        color: $white;
      }
    }
  }
}

.confirm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .text {
    margin-left: 30%;
  }
  .button-image {
    margin-right: 3rem;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
