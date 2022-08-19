import React from 'react';

import Box from '@mui/material/Box';

import FormInputLabel from './FormInputLabel';

import { CustomInput, formInputContainerStyle } from './styles';

const FormInput = ({ label, labelStyle, fullWidth, ...otherProps }) => {
	return (
		<Box style={formInputContainerStyle}>
			{label && <FormInputLabel label={label} labelStyle={labelStyle} />}
			<Box>
				<CustomInput {...otherProps} />
			</Box>
		</Box>
	);
};

export default FormInput;
