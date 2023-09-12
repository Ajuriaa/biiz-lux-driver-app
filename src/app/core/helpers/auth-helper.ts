import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';

const cookies = useCookies();

export const token = cookies.get('BZ-TOKEN');
export const isAuthed = ref(!!token);
