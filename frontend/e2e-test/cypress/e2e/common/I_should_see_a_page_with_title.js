import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I should see a page with title {string}', (Title) => {
	cy.contains(Title);
});
