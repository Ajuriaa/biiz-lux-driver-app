<script setup lang="ts">
import NotificationsIcon from '~icons/fluent/alert-32-filled';

const props = defineProps<{
  message?: string;
  showNotification?: boolean;
}>();
</script>

<template>
  <div class="button-container">
    <div
      v-if="props.showNotification"
      class="icon-container"
    >
      <NotificationsIcon class="material-icons-round icon" />
    </div>
    <div class="button">
      {{ props.message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/sass/index';
@import '@/core/sass/global';

.button-container {
  display: flex;
  flex-direction: column;
  width: 13rem;
}

.button {
  @include flex-center;
  font-weight: bold;
  background-color: $white;
  font-size: 0.8rem;
  width: 11.7rem;
  height: 2rem;
  border-radius: 0.3rem;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $green;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 0.4rem;
  position: absolute;
  right: 0;
  margin-bottom: 1.5rem;

  .icon {
    font-size: 1.2rem;
  }
}
</style>
