import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I login', () => {
	cy.intercept({
		method: 'POST',
		url: 'http://localhost:8091/api/login'
	}).as('loginCheck');

	cy.get(`[data-testid="login-form-login-button"]`).click();
	cy.wait(['@loginCheck']);
});
