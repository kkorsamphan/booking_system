import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { GlobalLayout } from '../components/Layouts';

const LandingPage = (props) => {
	const navigate = useNavigate();

	return (
		<GlobalLayout>
			<Grid container spacing={2}>
				<Grid item sm={12} md={6}>
					<Box
						sx={{
							fontWeight: 700,
							color: '#FFFFFF',
							whiteSpace: 'pre'
						}}
					>
						<h1>{'Meeting\nRoom Booking'}</h1>
					</Box>
				</Grid>
				<Grid item sm={12} md={6}>
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
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={6}>
								<Button
									data-testid="landing-page-login-button"
									disableElevation
									fullWidth
									variant="contained"
									color="primary"
									size="large"
									onClick={() => {
										navigate('/login');
									}}
								>
									Login
								</Button>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<Button
									data-testid="landing-page-sign-up-button"
									disableElevation
									fullWidth
									variant="outlined"
									color="primary"
									size="large"
									onClick={() => {
										navigate('/sign_up');
									}}
								>
									Sign Up
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</GlobalLayout>
	);
};

export default LandingPage;
