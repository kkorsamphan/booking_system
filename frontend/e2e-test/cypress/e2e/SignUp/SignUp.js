import {
	Given,
	When,
	Then,
	And
} from '@badeball/cypress-cucumber-preprocessor';

Given('I visit the website', () => {
	cy.visit('/');
});

And('I see a sign up button', () => {
	cy.get('button').contains('Sign Up');
});

When('I click on a sign up button', () => {
	cy.get(`[id=landing-page-sign-up-button]`).click();
});

Then('I see a sign up page', () => {
	cy.contains('Create');
	cy.contains('New Account');
});

And('I fill in the email field with value {string}', (email) => {
	cy.get(`[id=sign-up-form-email-input]`).type(email);
});

And('I fill in the password field with value {string}', (password) => {
	cy.get(`[id=sign-up-form-password-input]`).type(password);
});

When('I click a create new account button', () => {
	cy.get(`[id=sign-up-form-create-new-account-button]`).click();
});

Then('I should see a make booking page', (text) => {
	cy.contains('Make My Booking');
});

Then('I should see an error message {string}', (text) => {
	cy.contains(text);
});
