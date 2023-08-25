<script setup lang="ts">
import { useRouter } from "vue-router";
import WhiteButton from "@/components/buttons/WhiteButton.vue";

const props = defineProps<{
  message?: string;
  link?: string;
  title?: string;
}>();

const router = useRouter();

async function goToLink() {
  if (props.link !== '') await router.push(props.link);
}
</script>


<template>
  <section class="display-container" @click="goToLink()">
    <div class="title">{{ title }}</div>
    <WhiteButton :message="message"></WhiteButton>
  </section>
</template>

<style scoped lang="scss">
@import '@/core/sass/colors';

.display-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 14.5rem;
  width: 16.5rem;

  .title {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    font-weight: bold;
    color: $white;
    align-self: flex-start;
    margin-top: 1.5rem;
    margin-left: 3rem;
  }
}

</style>
