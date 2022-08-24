import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I should see a {string} button', (buttonText) => {
	cy.get('button').contains(buttonText);
});
