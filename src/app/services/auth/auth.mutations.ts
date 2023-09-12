import gql from 'graphql-tag';
import { DocumentNode } from 'graphql/language';
import { setCapacitorCookie } from '@/core/helpers/cookie-helper';
import { isAuthed } from '@/core/helpers/auth-helper';

export const loginQuery: DocumentNode = gql`
  mutation login($attributes: LoginInput!) {
    login(attributes: $attributes) {
      id
      token
      role
    }
  }
`;

export async function setCookie(token: string, role: string): Promise<void> {
  await setCapacitorCookie('BZ-TOKEN', token);
  await setCapacitorCookie('BZ-ROLE', role);
  isAuthed.value = true;
}
