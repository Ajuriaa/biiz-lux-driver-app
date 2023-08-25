<script setup lang="ts">
const props = defineProps<{
  option?: string;
  selectedOption?: string;
}>();

const emit = defineEmits<{
  changeSelected: [newOption: string]
}>()
</script>

<template>
  <div class="radio-label">
    <input
      type="radio"
      :id="option"
      :value="option"
      :checked="option === selectedOption"
      @change="emit('changeSelected', option)"
      class="green-radio"
    />
    <label :for="option">{{ option }}</label>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/sass/global';

.radio-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.green-radio {
  appearance: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: setColor(firm-gray, 100);
  outline: none;
  margin-right: 0.7rem;
}

.green-radio:checked {
  background-color: $green;
  background-image: url('@/assets/images/check.svg');
  background-size: 90% 90%;
}
</style>
