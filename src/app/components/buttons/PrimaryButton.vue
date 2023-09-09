<script setup lang="ts">
import NotificationsIcon from '~icons/fluent/alert-32-filled';

const props = withDefaults(
  defineProps<{
    styleClass?: string;
    disableButton?: boolean;
    showNotification?: boolean;
    showLogo?: boolean;
    text?: string;
  }>(),
  { styleClass: 'btn-black', text: '' },
);

const emit = defineEmits(['btnClick']);
</script>

<template>
  <button
    class="btn"
    :class="props.styleClass"
    :disabled="props.disableButton"
    @click="emit('btnClick')"
  >
    <div class="button-content">
      <main class="slot-content">
        <slot />
        <span
          v-if="props.text"
          class="text"
        >
          {{ props.text }}
        </span>
      </main>
      <div class="text-and-logo">
        <img
          v-if="props.showLogo"
          class="button-image" 
          src="https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png"
        >
      </div>
      <div
        v-if="props.showNotification"
        class="icon-container"
      >
        <NotificationsIcon class="material-icons-round icon" />
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
@import '@/core/sass/index';
@import '@/core/sass/global';

.btn {
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  min-height: 6rem;
  width: 100%;
  letter-spacing: 0.1rem;
  position: relative;
}

.btn-black {
  background-color: $black;
  color: $white;
}

.button-content {
  position: relative;
}

.slot-content {
  text-transform: uppercase;
}

.text-and-logo {
  .button-image {
    position: absolute;
    right: 2rem;
    bottom: 0;
  }
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
  top: 0.7rem;
  right: 1rem;

  .icon {
    font-size: 1.2rem;
    color: $black;
  }
}
</style>
