import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { GlobalLayout } from '../components/Layouts';

const BokingDone = (props) => {
	const navigate = useNavigate();

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
					sx={{
						color: '#FFFFFF',
						fontSize: 18,
						textAlign: 'center',
						mt: 3
					}}
				>
					Your booking No. is BA09100
				</Box>
				<Box sx={{ mt: 6 }}>
					<Button
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

export default BokingDone;
