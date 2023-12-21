import { mount } from 'cypress/react18';

declare global {
  namespace Cypress {
    interface Chainable {
      Login(email: string): Chainable<any>;
    }
  }
}
