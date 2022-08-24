import { After } from '@badeball/cypress-cucumber-preprocessor';

const API_URL = 'http://localhost:8091/api';

After({ tags: '@signup' }, () => {
	cy.request('DELETE', API_URL + '/users/xxx+user2@example.com');
});

After({ tags: '@cancel_booking' }, () => {
	cy.request(
		'PUT',
		API_URL + '/bookings/ca7f76e6-99e6-49b0-8cba-07ce84546988',
		{ status: 'reserved' }
	);
});
