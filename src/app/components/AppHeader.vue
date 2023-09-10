<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { weatherQuery } from '@/services/weather/weather.queries';
import { getToken } from '@/core/helpers/token-helper';
import { isAuthed } from '@/core/helpers/auth-helper';
import { IonToolbar, useIonRouter } from '@ionic/vue';
import LeftArrow from '~icons/fluent/arrow-left-12-filled';

const route = useRoute();
const ionRouter = useIonRouter();

const weatherImage = ref();
const isProfileRoute = computed(() => route.path.includes('profile'));
const isHomeRoute = computed(() => route.path.includes('home'));

const { onResult } = useQuery(weatherQuery, null, {
  context: { headers: { Authorization: getToken() } },
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-first',
});

onResult(({ data }): void => {
  if (data) {
    weatherImage.value = setWeatherImage(data.weather.weather[0].icon);
  }
});

function setWeatherImage(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function goToProfile(): void {
  ionRouter.navigate('/profile', 'forward', 'push');
}

function goToHome(): void {
  ionRouter.navigate('/driver/home', 'forward', 'push');
}

function goToPreviousPage(): void {
  ionRouter.back();
}
</script>

<template>
  <div
    v-if="isAuthed"
    class="container ion-no-border"
  >
    <IonToolbar color="translucent">
      <div class="header">
        <!-- Back Arrow -->
        <div
          v-if="!isHomeRoute"
          class="back-arrow"
          @click="goToPreviousPage()"
        >
          <LeftArrow class="material-icons-round icon" />
        </div>
        <!-- Header Container -->
        <section class="header-wrapper">
          <img
            v-if="!isProfileRoute"
            class="profile"
            src="../assets/images/profile.svg"
            alt="profile"
            @click="goToProfile()"
          >
          <img
            class="logo"
            src="../assets/images/logo.svg"
            alt="Logo"
            @click="goToHome()"
          >

          <!-- Weather and Translate Icon -->
          <div class="d-flex">
            <!-- Weather Icon -->
            <div class="icon-container">
              <Transition
                name="fade"
                mode="out-in"
              >
                <img
                  v-if="!weatherImage"
                  class="weather-base"
                  src="@/assets/images/weather.svg"
                  alt="base weather"
                >
                <img
                  v-else
                  class="weather"
                  :src="weatherImage"
                  alt="weather"
                >
              </Transition>
            </div>

            <!-- Translate Icon -->
            <img
              class="translate"
              src="../assets/images/translate.svg"
              alt="translate"
            >
          </div>
        </section>
      </div>
    </IonToolbar>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/sass/colors';
@import '@/core/sass/global';

.back-arrow {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background-color: setColor(firm-gray, 100);
  max-width: 4.5rem;
  min-height: 2.6rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;

  .icon {
    padding: 0.4rem;
    background-color: $green;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 50%;
  }
}

.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-content: center;
  flex-wrap: wrap;

  .header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 1rem 5%;
  }
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  background-color: $black;
  min-width: 100%;
  max-height: 3.5rem;
  border-radius: 0.5rem 1rem 1rem 0.5rem;

  .logo {
    align-items: center;
    width: 6rem;
    margin: 0.5rem 0.8rem;
  }

  .d-flex {
    align-items: center;

    .icon-container {
      @include flex-center;
      height: 3rem;
      width: 3rem;
      margin-right: 0.5rem;
    }
  }

  .profile {
    margin: 0 3rem 0 1rem;
  }

  .weather {
    height: 3rem;
  }

  .weather-base {
    height: 3rem;
  }

  .translate {
    background-color: $green;
    height: 3.5rem;
    width: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.9rem 0.2rem 0.3rem;
    border-radius: 0 0.5rem 0.5rem 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
