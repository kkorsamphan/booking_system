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
	openBookingDialog,
	onConfirmBookingDialog,
	onCancelBookingDialog
}) => {
	return (
		<Dialog
			fullWidth
			open={openBookingDialog}
			onClose={onCancelBookingDialog}
		>
			<Box sx={{ p: 4 }}>
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
						disableElevation
						fullWidth
						variant="outlined"
						color="primary"
						size="large"
						onClick={onCancelBookingDialog}
					>
						Cancel
					</Button>
					<Button
						disableElevation
						fullWidth
						variant="contained"
						color="primary"
						size="large"
						onClick={onConfirmBookingDialog}
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