<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  checked?: boolean;
  label?: string;
}>();

const isChecked = ref(props.checked);

function toggle() {
  isChecked.value = !isChecked.value;
}
</script>

<template>
  <div class="toggle" :class="{ checked: isChecked }" @click="toggle()">
    <div class="toggle-label">
      {{ props.label }}
    </div>
    <div class="toggle-switch">
      <div class="toggle-ball" />
    </div>
    <!-- Just to show reactivity, will be deleted -->
    <span style="margin-left: 1rem">{{ isChecked }}</span>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/sass/colors';

.toggle {
  display: inline-flex;
  align-items: center;

  &.checked {
    .toggle-ball {
      transform: translateX(1.6rem);
    }
  }

  .toggle-switch {
    width: 3.7rem;
    height: 1.9rem;
    background-color: setColor(firm-gray, 300);
    border-radius: 1rem;
    display: flex;
    align-items: center;
  }

  .toggle-ball {
    margin-left: 0.3rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    transition: transform 0.3s ease;
    background-color: $green;
  }

  .toggle-label {
    margin-right: 1rem;
    font-weight: bold;
  }
}
</style>
