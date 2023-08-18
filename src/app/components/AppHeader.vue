<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

const isProfileRoute = computed(() => route.path.includes('profile'));

function goToProfile() {
  router.push('/profile')
}

function goToHome() {
  router.push('/driver/home')
}
</script>

<template>
  <div class="header">
    <section class="header-wrapper">
      <img
          class="profile"
          v-if="!isProfileRoute"
          src="../assets/images/profile.svg"
          @click="goToProfile()"
          alt="profile"
      />
      <img
          class="logo"
          @click="goToHome()"
          src="../assets/images/logo.svg"
          alt="Logo"
      />

      <div class="d-flex">
        <img class="weather" src="../assets/images/weather.svg" alt="weather" />
        <img
            class="translate"
            src="../assets/images/translate.svg"
            alt="translate"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/sass/colors';

.back-arrow {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background-color: setColor(firm-gray, 100);
  max-width: 4.5rem;
  min-height: 2.6rem;
  border-radius: 0.5rem;

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
  margin: 2rem 0;

  .header {
    display: flex;
    justify-content: center;
  }
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  background-color: $black;
  min-width: 34rem;
  max-height: 3.5rem;
  border-radius: 0.5rem 1rem 1rem 0.5rem;

  .logo {
    align-items: center;
    width: 6rem;
    margin: 0.5rem 0.8rem;
  }

  .d-flex {
    align-items: center;
  }

  .profile {
    margin: 0 3rem 0 1rem;
  }

  .weather {
    height: 4rem;
  }

  .translate {
    background-color: $green;
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.9rem 0.2rem 0.3rem;
    border-radius: 0 0.5rem 0.5rem 0;
  }
}

</style>
