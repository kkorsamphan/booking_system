import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import useAuth from '../../context/auth/useAuth';

import { LinkButton } from '../Buttons';

const AppLayout = ({ title, children }) => {
	const { logout } = useAuth();

	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: '#FFFFFF'
			}}
		>
			<Paper
				elevation={4}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#383838',
					borderRadius: 0,
					borderBottomLeftRadius: 60,
					borderBottomRightRadius: 60,
					px: 16
				}}
			>
				<Box
					sx={{
						py: 2,
						textAlign: 'right'
					}}
				>
					<LinkButton
						label="Logout"
						labelColor="#FFFFFF"
						onClick={() => {
							logout();
						}}
					/>
				</Box>
				<Box
					sx={{
						pb: 2,
						color: '#FFFFFF',
						fontSize: 24,
						fontWeight: 700
					}}
				>
					{title}
				</Box>
			</Paper>
			<Box sx={{ px: 16, py: 4 }}>{children}</Box>
		</Box>
	);
};

export default AppLayout;
