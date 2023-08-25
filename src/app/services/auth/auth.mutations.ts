import gql from 'graphql-tag';
import { DocumentNode } from 'graphql/language';
import { setCapacitorCookie } from '@/core/helpers/cookie-helper';

export const loginQuery: DocumentNode = gql`
  mutation login($attributes: LoginInput!) {
    login(attributes: $attributes) {
      id
      token
      role
    }
  }
`;

export function setCookie(token: string, role: string): void {
  setCapacitorCookie('BZ-TOKEN', token);
  setCapacitorCookie('BZ-ROLE', role);
}
