import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I should see a message {string}', (message) => {
	cy.contains(message);
});
