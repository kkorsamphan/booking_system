import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I click on {string}', (testId) => {
	cy.get(`[data-testid="${testId}"]`).click();
});
