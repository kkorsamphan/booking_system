import React from 'react';

import Container from '@mui/material/Container';

const GlobalLayout = ({ children }) => {
	return (
		<Container
			fixed
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			{children}
		</Container>
	);
};

export default GlobalLayout;
