beforeEach(() => {
  cy.window().then((window) => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });
  cy.clearCookies();
  cy.clearCookies({ domain: null });
});

Cypress.on(
  'uncaught:exception',
  () =>
    /* returning false here prevents Cypress from failing the test */
    false
);
