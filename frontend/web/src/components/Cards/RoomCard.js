import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

const RoomCard = ({ name, size, disabledAction, onChoosingRoom }) => {
	return (
		<Card
			variant="outlined"
			sx={{
				border: '1px solid #000000',
				borderRadius: 2.5,
				'&:hover': {
					backgroundColor: (theme) =>
						disabledAction ? '#FFFFFF' : theme.palette.primary.main,
					color: disabledAction ? '#000000' : '#FFFFFF',
					borderColor: (theme) =>
						disabledAction ? '#000000' : theme.palette.primary.main
				}
			}}
			data-testid="room-card"
		>
			<CardActionArea
				disabled={disabledAction}
				onClick={onChoosingRoom}
				data-testid="room-card-button"
			>
				<CardContent sx={{ display: 'flex', py: 4, px: 2 }}>
					<Box
						sx={{ flex: 1, fontSize: 18, fontWeight: 700 }}
						data-testid="room-card-name"
					>
						Room {name}
					</Box>
					<Box
						sx={{ flex: 1, fontSize: 18, textAlign: 'right' }}
						data-testid="room-card-size"
					>
						{size} Guests max
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default RoomCard;
