import React from 'react';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import FormInput from './FormInput';

const FormDatePicker = ({
	inputId,
	label,
	placeholder,
	open,
	onTogglePicker,
	value,
	onChange
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DesktopDatePicker
				closeOnSelect
				open={open}
				value={value}
				inputFormat={'MM/DD/YYYY'}
				onChange={onChange}
				renderInput={({ inputProps, InputProps, ...params }) => (
					<FormInput
						{...params}
						label={label}
						inputProps={{
							...inputProps,
							id: inputId,
							placeholder: placeholder,
							readOnly: true,
							style: { textAlign: 'center' }
						}}
						onClick={() => {
							if (onTogglePicker) {
								onTogglePicker();
							}
						}}
					/>
				)}
				PopperProps={{ disablePortal: true }}
			/>
		</LocalizationProvider>
	);
};

export default FormDatePicker;
