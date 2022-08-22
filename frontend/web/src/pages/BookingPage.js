import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import useAuth from '../context/auth/useAuth';
import * as RoomService from '../services/room';
import * as UserService from '../services/user';

import { LinkButton } from '../components/Buttons';
import { RoomCard } from '../components/Cards';
import { BookingDialog } from '../components/Dialogs';
import { BookingForm } from '../components/Form';
import { AppLayout } from '../components/Layouts';

const BookingPage = (props) => {
	const { userId } = useAuth();
	const navigate = useNavigate();

	const [pageTitle, setPageTitle] = useState('Make My Booking');
	const [showRooms, setShowRooms] = useState(false);
	const [rooms, setRooms] = useState([]);

	const [selectedDate, setSelectedDate] = useState({});
	const [selectedRoom, setSelectedRoom] = useState({});
	const [openBookingDialog, setOpenBookingDialog] = useState(false);

	const handleFindRoom = async ({
		roomSize,
		startTime,
		endTime,
		dateFormat,
		startTimeFormat,
		endTimeFormat
	}) => {
		const response = await RoomService.findRooms(
			roomSize,
			startTime,
			endTime
		);

		if (response.status === 200) {
			setRooms(response.data);
			setShowRooms(true);
			setPageTitle('Select A Meeting Room');
			setSelectedDate({
				dateFormat,
				startTime,
				startTimeFormat,
				endTime,
				endTimeFormat
			});
		}
	};

	const handleConfirmBooking = async () => {
		const payload = {
			roomId: selectedRoom.roomId,
			startTime: selectedDate.startTime,
			endTime: selectedDate.endTime
		};

		const response = await UserService.bookRoom(userId, payload);
		if (response && response.status === 200) {
			navigate('/booking_done', {
				state: {
					bookingNo: response.data.bookingNumber
				}
			});
		} else {
		}

		setOpenBookingDialog(false);
	};

	const handleCancelBooking = () => {
		setOpenBookingDialog(false);
		setSelectedRoom({});
	};

	return (
		<AppLayout title={pageTitle}>
			<Box sx={{ textAlign: 'right', mb: 4 }}>
				<LinkButton
					data-testid="booking-page-my-bookings-button"
					icon={<EventAvailableIcon />}
					label="My Bookings"
					onClick={() => {
						navigate('/my_bookings');
					}}
				/>
			</Box>
			<BookingForm handleFindRoom={handleFindRoom} />
			{showRooms && rooms.length === 0 && (
				<Box sx={{ color: '#888888', py: 12, textAlign: 'center' }}>
					No available room. Please select alternative preferences.
				</Box>
			)}
			{showRooms && rooms.length > 0 && (
				<Box sx={{ py: 2 }}>
					<Box sx={{ fontWeight: 700, mb: 2 }}>Available Rooms</Box>
					<Grid
						container
						spacing={2}
						data-testid="booking-page-room-available-room-list"
					>
						{rooms.map((room) => (
							<Grid key={room.roomId} item md={4}>
								<RoomCard
									name={room.name}
									size={room.size}
									onChoosingRoom={() => {
										setSelectedRoom(room);
										setOpenBookingDialog(true);
									}}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
			<BookingDialog
				date={selectedDate.dateFormat}
				startTime={selectedDate.startTimeFormat}
				endTime={selectedDate.endTimeFormat}
				roomName={selectedRoom.name}
				roomSize={selectedRoom.size}
				openDialog={openBookingDialog}
				onConfirm={handleConfirmBooking}
				onCancel={handleCancelBooking}
			/>
		</AppLayout>
	);
};

export default BookingPage;
