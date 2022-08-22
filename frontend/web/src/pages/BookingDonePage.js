import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { GlobalLayout } from '../components/Layouts';

const BookingDonePage = (props) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<GlobalLayout>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Box
					sx={{
						color: '#FFFFFF',
						fontWeight: 700,
						fontSize: 36,
						whiteSpace: 'pre',
						textAlign: 'center',
						lineHeight: 2
					}}
				>
					{'Booking\nSuccessful'}
				</Box>
				<Box
					data-testid="booking-done-page-booking-number"
					sx={{
						color: '#FFFFFF',
						fontSize: 18,
						textAlign: 'center',
						mt: 3
					}}
				>
					<span>Your booking No. is </span>
					<span>{location.state.bookingNo}</span>
				</Box>
				<Box sx={{ mt: 6 }}>
					<Button
						data-testid="booking-done-page-booking-history-button"
						fullWidth
						variant="contained"
						color="primary"
						size="large"
						sx={{ minWidth: 320 }}
						onClick={() => {
							navigate('/my_bookings');
						}}
					>
						My Booking History
					</Button>
				</Box>
			</Box>
		</GlobalLayout>
	);
};

export default BookingDonePage;
