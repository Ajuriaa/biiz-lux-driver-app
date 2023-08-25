import { ref } from 'vue';

export const isAuthed = ref(false);

export function findToken(): boolean {
  const cookies = document.cookie.split('; ');
  for (const c of cookies) {
    if (c.indexOf('BZ-TOKEN=') === 0) {
      isAuthed.value = true;
      return true;
    }
  }
  return false;
}
