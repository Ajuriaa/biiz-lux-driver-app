import { ref } from 'vue';

export const isAuthed = ref(false);

export function findToken(): boolean {
  const cookies = document.cookie.split('; ');
  for (const c of cookies) {
    return c.indexOf('BZ-TOKEN=') === 0;
  }
  return false;
}

// Set the initial value
isAuthed.value = findToken();
