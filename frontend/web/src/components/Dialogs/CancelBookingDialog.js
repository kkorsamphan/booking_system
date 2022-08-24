import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

const CancelBookingDialog = ({
	bookingNo,
	openDialog,
	onConfirm,
	onCancel
}) => {
	return (
		<Dialog fullWidth open={openDialog} onClose={onCancel}>
			<Box sx={{ p: 4 }} data-testid="cancel-booking-dialog">
				<Box sx={{ fontWeight: 700, fontSize: 28 }}>
					{'Cancel Booking'}
				</Box>
				<Box sx={{ mt: 4, mb: 1 }}>
					<Box data-testid="cancel-booking-dialog-booking-number">{`Booking no. ${bookingNo}`}</Box>
					<Box sx={{ my: 1 }}>
						{
							'If you cancel this booking, you will lose your reservation.'
						}
					</Box>
					<Box>{'Are you sure you want to cancel your booking?'}</Box>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
					<Button
						data-testid="cancel-booking-dialog-cancel-button"
						disableElevation
						fullWidth
						variant="outlined"
						color="error"
						size="large"
						onClick={onCancel}
					>
						No, keep my booking
					</Button>
					<Button
						data-testid="cancel-booking-dialog-confirm-button"
						disableElevation
						fullWidth
						variant="contained"
						color="error"
						size="large"
						onClick={onConfirm}
						sx={{ mt: 1 }}
					>
						Yes, cancel booking
					</Button>
				</Box>
			</Box>
		</Dialog>
	);
};

export default CancelBookingDialog;
