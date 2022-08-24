import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then(
	'I fill in the {string} field with value {string}',
	(testId, fieldValue) => {
		cy.get(`[data-testid="${testId}"]`).type(fieldValue);
	}
);
