import {
    Given,
    When,
    Then,
    And
} from '@badeball/cypress-cucumber-preprocessor';

When('I click on a cancel button of a booking card', () => {
    cy.get(
        '[data-testid="my-booking-page-reserved-list"] [data-testid="booking-card"'
    )
        .first()
        .within(() => {
            cy.get(
                '[data-testid="booking-card-cancel-booking-button"]'
            ).click();
        });
});
