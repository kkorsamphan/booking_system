import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I should see {string}', (testId) => {
    cy.get(`[data-testid="${testId}"]`).should('be.visible');
});
