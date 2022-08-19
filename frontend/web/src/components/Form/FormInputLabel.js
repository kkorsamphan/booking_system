import React from 'react';

import InputLabel from '@mui/material/InputLabel';

import { formInputLabelStyle } from './styles';

const FormInputLabel = ({ label, labelStyle }) => {
	return (
		<InputLabel style={{ ...formInputLabelStyle, ...labelStyle }}>
			{label}
		</InputLabel>
	);
};

export default FormInputLabel;
