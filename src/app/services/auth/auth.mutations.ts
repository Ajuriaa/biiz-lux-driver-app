import gql from 'graphql-tag';
import { DocumentNode } from 'graphql/language';

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
  const date = new Date();
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = `BZ-TOKEN=${token};${expires};path=/`;
  document.cookie = `BZ-ROLE=${role};${expires};path=/`;
}
