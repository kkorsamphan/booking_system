import React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const LinkButton = ({ testId, icon, label, labelColor, onClick }) => {
	return (
		<Link
			data-testid={testId}
			component="button"
			underline="none"
			onClick={onClick ? onClick : null}
			sx={{ color: labelColor ? labelColor : '#000000' }}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				{icon && icon}
				{label}
			</Box>
		</Link>
	);
};

export default LinkButton;
