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
    'I logged in with email value {string} and password value {string}',
    (email, password) => {
        cy.get(`[data-testid="landing-page-login-button"]`).click();
        cy.get(`[data-testid="login-form-email-input"]`).type(email);
        cy.get(`[data-testid="login-form-password-input"]`).type(password);
        cy.get(`[data-testid="login-form-login-button"]`).click();
    }
);

Then('I should see my booking button', () => {
    cy.get('button').contains('My Bookings');
});

When('I click my booking button', () => {
    cy.get('[data-testid="booking-page-my-bookings-button"]').click();
});

Then('I should see my booking page', () => {
    cy.contains('My Booking History');
});

And('I should see my reserved booking list', () => {
    cy.get('[data-testid="my-booking-page-reserved-list"]').should(
        'be.visible'
    );
});

When('I click on a cancel button of a booking card', () => {
    cy.get(
        '[data-testid="my-booking-page-reserved-list"] [data-testid="booking-card"'
    )
        .first()
        .within(() => {
            cy.get('button').click();
        });
});

Then('I should see a cancel booking dialog', () => {
    cy.get('[data-testid="cancel-booking-dialog"]').should('be.visible');
});

And('I should see a cancel booking button', () => {
    cy.get('[data-testid="cancel-booking-dialog"]').within(() => {
        cy.get('button').contains('Yes, cancel booking');
    });
});

When('I click on a cancel booking button', () => {
    cy.get('[data-testid="cancel-booking-dialog-confirm-button"]').click();
});

Then('I should see a cancel booking list', () => {
    cy.get('[data-testid="my-booking-page-cancelled-list"]').should(
        'be.visible'
    );
});
