import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const LandingPage = (props) => {
	const navigate = useNavigate();

	return (
		<Container
			fixed
			sx={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Grid container spacing={2}>
				<Grid item md={6}>
					<Box sx={{ fontWeight: 700, color: '#FFFFFF' }}>
						<h1>Meeting</h1>
						<h1>Room Booking</h1>
					</Box>
				</Grid>
				<Grid item md={6}>
					<Paper
						elevation={0}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							p: 4,
							borderRadius: 6,
							minHeight: 380
						}}
					>
						<Box sx={{ flex: 1 }}>
							<Box sx={{ my: 3 }}>
								Let's make a meeting room booking easier.
							</Box>
							<Box>
								Meeting Room Booking will help you to ensure you
								will have a room for your meeting. Manage
								reservation, cancellation, ongoing or finished
								booking.
							</Box>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Button
								id="landing-page-sign-in-button"
								disableElevation
								variant="contained"
								color="primary"
								size="large"
								sx={{ my: 1 }}
								onClick={() => {
									navigate('/login');
								}}
							>
								Login
							</Button>
							<Button
								id="landing-page-sign-up-button"
								disableElevation
								variant="outlined"
								color="primary"
								size="large"
								sx={{ my: 1 }}
								onClick={() => {
									navigate('/sign_up');
								}}
							>
								Sign Up
							</Button>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default LandingPage;
