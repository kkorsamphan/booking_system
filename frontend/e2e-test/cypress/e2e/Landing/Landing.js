import {
    Given,
    When,
    Then,
    And
} from '@badeball/cypress-cucumber-preprocessor';

Given('I visit the website', () => {
    cy.visit('/');
});

And(
    'I should see a landing page with a signin button and signup button',
    () => {
        cy.get('button').contains('Login');
        cy.get('button').contains('Sign Up');
    }
);
