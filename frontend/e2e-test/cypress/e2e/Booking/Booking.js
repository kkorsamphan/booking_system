import {
	Given,
	When,
	Then,
	And
} from '@badeball/cypress-cucumber-preprocessor';

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

When('I click on a Find Room button to search', () => {
	cy.intercept({
		method: 'GET',
		url: 'http://localhost:8091/api/rooms?roomSize=1&startTime=2022-08-24T02:00:00.000Z&endTime=2022-08-24T03:00:00.000Z'
	}).as('apiCheck');

	cy.get(`[data-testid="find-room-form-find-room-button"]`).click();
	cy.wait(['@apiCheck']);
});

When('I click on a room card', () => {
	cy.get(`[data-testid="room-card"]`)
		.first()
		.within(() => {
			cy.get('[data-testid="room-card-button"]').click();
		});
});

And('I should see my booking number', () => {
	cy.contains(/^BA\d{5}/);
});
