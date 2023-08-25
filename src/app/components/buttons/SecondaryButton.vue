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
    :disabled="disableButton"
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
@import 'src/app/core/sass/index';
@import 'src/app/core/sass/global';

.btn {
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  min-height: 6.2rem;
  min-width: 16rem;
  letter-spacing: 0.1rem;
  position: relative;
}

.btn-black {
  background-color: $black;
  color: $white;
}

.icon-container {
  @include flex-center;
  background-color: $green;
  width: 3.3rem;
  height: 2rem;
  border-radius: 0.4rem;
  position: absolute;
  bottom: 5.3rem;
  right: 0;

  .icon {
    font-size: 1.5rem;
    color: $black;
  }
}

</style>
