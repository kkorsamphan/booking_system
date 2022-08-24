import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I visit the {string} page', (path) => {
    cy.visit(path);
});
