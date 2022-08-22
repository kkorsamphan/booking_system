import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const BookingCard = ({
	roomName,
	roomSize,
	bookingNo,
	bookingDate,
	bookingStartTime,
	bookingEndTime,
	bookingStatus,
	onCancelBooking
}) => {
	return (
		<Card
			variant="outlined"
			sx={{
				border: '1px solid #000000',
				borderRadius: 2.5
			}}
		>
			<CardContent sx={{ p: 3, fontSize: 16 }}>
				<Box sx={{ fontWeight: 700 }}>Booking No. {bookingNo}</Box>
				<Box sx={{ display: 'flex', my: 1 }}>
					<Box sx={{ flex: 1, maxWidth: 120 }}>Room {roomName}</Box>
					<Box sx={{ flex: 1 }}>{roomSize} Guests max</Box>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Box sx={{ flex: 1, maxWidth: 120 }}>{bookingDate}</Box>
					<Box sx={{ flex: 1 }}>
						{bookingStartTime} - {bookingEndTime}
					</Box>
				</Box>
				{onCancelBooking && (
					<Box sx={{ px: 1, mt: 2 }}>
						<Button
							fullWidth
							disableElevation
							variant="contained"
							color="error"
							onClick={onCancelBooking}
						>
							Cancel
						</Button>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default BookingCard;
