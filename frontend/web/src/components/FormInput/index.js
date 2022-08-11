import React from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import { CustomInput, formInputContainerSx, labelSx } from './index.styles';

const FormInput = ({ label, fullWidth, ...otherProps }) => {
	return (
		<Box sx={formInputContainerSx}>
			{label && <InputLabel sx={labelSx}>{label}</InputLabel>}
			<Box>
				<CustomInput {...otherProps} />
			</Box>
		</Box>
	);
};

export { FormInput };
