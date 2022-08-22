import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import EventIcon from '@mui/icons-material/Event';

import useAuth from '../context/auth/useAuth';
import * as UserService from '../services/user';
import * as BookingService from '../services/booking';

import { LinkButton } from '../components/Buttons';
import { BookingCard } from '../components/Cards';
import { CancelBookingDialog } from '../components/Dialogs';
import { AppLayout } from '../components/Layouts';

const MyBookingPage = (props) => {
	const { userId } = useAuth();
	const navigate = useNavigate();

	const [reloadBookings, setReloadBookings] = useState(true);

	const [reservedBookings, setReservedBookings] = useState([]);
	const [cancelledBookings, setCancelledBookings] = useState([]);
	const [completedBookings, setCompletedBookings] = useState([]);

	const [selectedBooking, setSelectedBooking] = useState({});
	const [openDialog, setOpenDialog] = useState(false);

	useEffect(() => {
		const getBookings = async () => {
			const response = await UserService.myBookings(userId);
			if (response && response.status === 200) {
				const userBookings = response.data.map((bk) => {
					return {
						bookingId: bk.bookingId,
						bookingDate: moment(bk.startTime).format('MM/DD/YYYY'),
						bookingStartTime: moment(bk.startTime).format(
							'hh:mm A'
						),
						bookingEndTime: moment(bk.endTime).format('hh:mm A'),
						bookingStatus: bk.status,
						bookingNo: bk.bookingNumber,
						roomId: bk.roomId,
						roomName: bk.room.name,
						roomSize: bk.room.size
					};
				});

				const reserved = userBookings.filter(
					(bk) => bk.bookingStatus === 'reserved'
				);
				const cancelled = userBookings.filter(
					(bk) => bk.bookingStatus === 'cancelled'
				);
				const completed = userBookings.filter(
					(bk) => bk.bookingStatus === 'completed'
				);

				setReservedBookings(reserved);
				setCancelledBookings(cancelled);
				setCompletedBookings(completed);
			}

			setReloadBookings(false);
		};

		if (userId && reloadBookings) {
			getBookings(userId);
		}
	}, [userId, reloadBookings]);

	const handleConfirmDialog = async () => {
		const response = await BookingService.cancelBooking(
			selectedBooking.bookingId,
			{
				status: 'cancelled'
			}
		);

		if (response && response.status === 200) {
			setReloadBookings(true);
		}

		setSelectedBooking({});
		setOpenDialog(false);
	};

	const handleCancelDialog = () => {
		setOpenDialog(false);
	};

	return (
		<AppLayout title={'My Booking History'}>
			<Box sx={{ textAlign: 'right', mb: 4 }}>
				<LinkButton
					data-testid="my-booking-page-make-booking-button"
					icon={<EventIcon />}
					label="Make New Booking"
					onClick={() => {
						navigate('/booking');
					}}
				/>
			</Box>

			<Box sx={{ py: 2 }}>
				<Box sx={{ fontWeight: 700, mb: 2 }}>Reserved</Box>
				{reservedBookings.length > 0 ? (
					<Grid
						container
						spacing={2}
						data-testid="my-booking-page-reserved-list"
					>
						{reservedBookings.map((booking) => (
							<Grid key={booking.bookingId} item md={4}>
								<BookingCard
									roomName={booking.roomName}
									roomSize={booking.roomSize}
									bookingNo={booking.bookingNo}
									bookingDate={booking.bookingDate}
									bookingStartTime={booking.bookingStartTime}
									bookingEndTime={booking.bookingEndTime}
									bookingStatus={booking.bookingStatus}
									onCancelBooking={() => {
										setSelectedBooking(booking);
										setOpenDialog(true);
									}}
								/>
							</Grid>
						))}
					</Grid>
				) : (
					<Box sx={{ color: '#888888', py: 6, textAlign: 'center' }}>
						No reserved booking.
					</Box>
				)}
			</Box>

			<Box sx={{ py: 2 }}>
				<Box sx={{ fontWeight: 700, mb: 2 }}>Cancelled</Box>
				{cancelledBookings.length > 0 ? (
					<Grid container spacing={2}>
						{cancelledBookings.map((booking) => (
							<Grid
								key={booking.bookingId}
								item
								md={4}
								data-testid="my-booking-page-cancelled-list"
							>
								<BookingCard
									roomName={booking.roomName}
									roomSize={booking.roomSize}
									bookingNo={booking.bookingNo}
									bookingDate={booking.bookingDate}
									bookingStartTime={booking.bookingStartTime}
									bookingEndTime={booking.bookingEndTime}
									bookingStatus={booking.bookingStatus}
								/>
							</Grid>
						))}
					</Grid>
				) : (
					<Box sx={{ color: '#888888', py: 6, textAlign: 'center' }}>
						No cancelled booking.
					</Box>
				)}
			</Box>

			<Box sx={{ py: 2 }}>
				<Box sx={{ fontWeight: 700, mb: 2 }}>Completed</Box>
				{completedBookings.length > 0 ? (
					<Grid
						container
						spacing={2}
						data-testid="my-booking-page-completed-list"
					>
						{completedBookings.map((booking) => (
							<Grid key={booking.bookingId} item md={4}>
								<BookingCard
									roomName={booking.roomName}
									roomSize={booking.roomSize}
									bookingNo={booking.bookingNo}
									bookingDate={booking.bookingDate}
									bookingStartTime={booking.bookingStartTime}
									bookingEndTime={booking.bookingEndTime}
									bookingStatus={booking.bookingStatus}
								/>
							</Grid>
						))}
					</Grid>
				) : (
					<Box sx={{ color: '#888888', py: 6, textAlign: 'center' }}>
						No completed booking.
					</Box>
				)}
			</Box>

			<CancelBookingDialog
				bookingNo={selectedBooking.bookingNo}
				openDialog={openDialog}
				onConfirm={handleConfirmDialog}
				onCancel={handleCancelDialog}
			/>
		</AppLayout>
	);
};

export default MyBookingPage;
