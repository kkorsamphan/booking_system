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

Then('I should see a booking page', () => {
	cy.contains('Make My Booking');
});

And('I fill in the number of guest field with value {int}', (guestNumber) => {
	cy.get(`[data-testid="find-room-form-guest-number"]`).type(guestNumber);
});

And('I choose the date with current date value', () => {
	const date = new Date();
	const monthOption = { month: 'short' };
	const formatDate = `${new Intl.DateTimeFormat('en-US', monthOption).format(
		date
	)} ${date.getDate()}, ${date.getFullYear()}`;

	cy.get('[data-testid="find-room-form-date-input"]').click();
	cy.get('[data-testid="form-date-picker"]').within(() => {
		cy.get(`button[aria-label="${formatDate}"]`).click({ force: true });
	});
});

And(
	'I choose the start time with value of current date at {int} AM',
	(hour) => {
		const date = new Date();
		date.setHours(hour);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);

		const formatTime = date.toISOString();

		cy.get(
			`[data-testid="find-room-form-start-time-dialog"]  li[data-value="${formatTime}"]`
		).click();
	}
);
And('I choose the end time with value of current date at {int} AM', (hour) => {
	const date = new Date();
	date.setHours(hour);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);

	const formatTime = date.toISOString();

	cy.get(
		`[data-testid="find-room-form-end-time-dialog"] li[data-value="${formatTime}"]`
	).click();
});

When('I click a find room button', () => {
	cy.get('[data-testid="find-room-form-find-room-button"]').click();
});

Then('I should see a room list', () => {
	cy.get('[data-testid="booking-page-room-available-room-list"]').should(
		'be.visible'
	);
});

When('I click a room card', () => {
	cy.get(`[data-testid="room-card"]`)
		.first()
		.within(() => {
			cy.get('button').click();
		});
});

Then('I should see a booking summary dialog', () => {
	cy.get(`[data-testid="booking-dialog"]`)
		.should('be.visible')
		.contains('Booking Summary');
});

And('I should see a confirm button', () => {
	cy.get('button').contains('Confirm Booking');
});

When('I click on a confirm button', () => {
	cy.get('[data-testid="booking-dialog-confirm-booking-button"]').click();
});

Then('I should see a booking confirmation page', () => {
	cy.contains('Booking Successful');
});

And('I should see my booking number', () => {
	cy.contains(/^BA\d{5}/);
});
