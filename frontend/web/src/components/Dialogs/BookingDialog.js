import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import { FormInput, FormInputLabel } from '../Form';
import { RoomCard } from '../Cards';

const BookingDialog = ({
	date,
	startTime,
	endTime,
	roomName,
	roomSize,
	openDialog,
	onConfirm,
	onCancel
}) => {
	return (
		<Dialog fullWidth open={openDialog} onClose={onCancel}>
			<Box sx={{ p: 4 }} data-testid="booking-dialog">
				<Box sx={{ fontWeight: 700, fontSize: 28 }}>
					{'Booking Summary'}
				</Box>
				<Box sx={{ display: 'flex', mt: 4, mb: 1 }}>
					<Box>
						<FormInput
							label="Date"
							labelStyle={{ color: '#000000', fontWeight: 700 }}
							defaultValue={date}
							inputProps={{
								'data-testid': 'booking-dialog-date',
								style: { textAlign: 'center' }
							}}
						/>
					</Box>
					<Box sx={{ flex: 1, pl: 1 }}>
						<FormInput
							fullWidth
							label="Time"
							labelStyle={{ color: '#000000', fontWeight: 700 }}
							defaultValue={`${startTime} - ${endTime}`}
							inputProps={{
								'data-testid': 'booking-dialog-time',
								style: { textAlign: 'center' }
							}}
						/>
					</Box>
				</Box>
				<FormInputLabel
					label={'Selected Room'}
					labelStyle={{ color: '#000000', fontWeight: 700 }}
				/>
				<RoomCard disabledAction name={roomName} size={roomSize} />
				<Box sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
					<Button
						data-testid="booking-dialog-cancel-button"
						disableElevation
						fullWidth
						variant="outlined"
						color="primary"
						size="large"
						onClick={onCancel}
					>
						Cancel
					</Button>
					<Button
						data-testid="booking-dialog-confirm-button"
						disableElevation
						fullWidth
						variant="contained"
						color="primary"
						size="large"
						onClick={onConfirm}
						sx={{ mt: 1 }}
					>
						Confirm Booking
					</Button>
				</Box>
			</Box>
		</Dialog>
	);
};

export default BookingDialog;
