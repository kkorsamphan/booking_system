import {
	Given,
	When,
	Then,
	And
} from '@badeball/cypress-cucumber-preprocessor';

Given('I visit the website', () => {
	cy.visit('/');
});

And('I see a login button', () => {
	cy.get('button').contains('Login');
});

When('I click on a login button', () => {
	cy.get(`[id=landing-page-login-button]`).click();
});

Then('I see a login page', () => {
	cy.contains('Hello !');
	cy.contains('Welcome Back');
});

And('I fill in the email field with value {string}', (email) => {
	cy.get(`[id=login-form-email-input]`).type(email);
});

And('I fill in the password field with value {string}', (password) => {
	cy.get(`[id=login-form-password-input]`).type(password);
});

When('I click a login button', () => {
	cy.get(`[id=login-form-login-button]`).click();
});

Then('I should see a make booking page', () => {
	cy.contains('Make My Booking');
});

Then('I should see an error message {string}', (text) => {
	cy.contains(text);
});
