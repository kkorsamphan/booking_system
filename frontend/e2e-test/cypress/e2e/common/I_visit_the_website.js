import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I visit the website', () => {
    cy.visit('/');
});
