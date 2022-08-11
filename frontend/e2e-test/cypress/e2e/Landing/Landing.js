import {
    Given,
    When,
    Then,
    And
} from '@badeball/cypress-cucumber-preprocessor';

When('I visit the website', () => {
    cy.visit('/');
});

Then(
    'I should see a landing page with a signin button and signup button',
    () => {
        cy.get('button').contains('Login');
        cy.get('button').contains('Sign Up');
    }
);
