import { useCookies } from "@vueuse/integrations/useCookies";

export function getToken(): string {
  const cookies = useCookies();

  const authCookie = cookies.get('BZ-TOKEN');

  if (!authCookie) return '';

  return `Bearer ${authCookie}`;
}
