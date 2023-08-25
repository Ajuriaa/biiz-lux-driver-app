<script setup lang="ts">
import NotificationsIcon from '~icons/fluent/alert-32-filled'

const props = withDefaults(defineProps<{
  styleClass?: string,
  disableButton?: boolean,
  showNotification?: boolean
}>(), { styleClass: 'btn-black' });

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
      <slot />
      <div class="icon-container" v-if="props.showNotification">
        <NotificationsIcon class="material-icons-round icon" />
      </div>
    </div>
  </button>

</template>

<style scoped lang="scss">
@import '@/core/sass/index';

.btn {
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  min-height: 6rem;
  min-width: 34.2rem;
  letter-spacing: 0.1rem;
  position: relative;
}

.btn-black {
  background-color: $black;
  color: $white;
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
