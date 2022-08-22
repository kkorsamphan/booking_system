import React from 'react';
import moment from 'moment';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import {
	CustomInput,
	formInputContainerStyle,
	formInputLabelStyle
} from './styles';

const createTimeRange = (date, minHour, maxHour) => {
	const times = [];

	const currentDate = moment(date).startOf('day');
	for (let h = minHour; h <= maxHour; h++) {
		const currentHour = currentDate.hours(h).startOf('hour');

		for (let m = 0; m < 60; m += 30) {
			const currentTime = currentHour.add(m, 'minutes');

			const value = currentTime.valueOf();
			const format = currentTime.toISOString();
			const label = currentTime.format('hh:mm A');
			const hour = currentTime.hour();
			const minute = currentTime.minute();

			if (h === maxHour && m === 30) {
				continue;
			}

			times.push({ label, value, format, hour, minute });
		}
	}

	return times;
};

const FormTimePicker = ({
	label,
	placeholder,
	fullWidth,
	open,
	onTogglePicker,
	value,
	onChange,
	date,
	minHour,
	maxHour,
	dateInputProps,
	selectMenuProps
}) => {
	const times = createTimeRange(date, minHour, maxHour);
	const minTime = moment(date).valueOf();

	return (
		<Box style={formInputContainerStyle}>
			{label && (
				<InputLabel style={formInputLabelStyle}>{label}</InputLabel>
			)}
			<Box>
				<Select
					open={open}
					onOpen={() => {
						onTogglePicker(true);
					}}
					onClose={() => {
						onTogglePicker(false);
					}}
					displayEmpty
					value={value}
					onChange={onChange}
					input={
						<CustomInput
							inputProps={{
								...dateInputProps
							}}
							style={{ textAlign: 'center' }}
							placeholder={placeholder}
							onClick={() => {
								if (onTogglePicker) {
									onTogglePicker(!open);
								}
							}}
						/>
					}
					MenuProps={{
						...selectMenuProps,
						disableEnforceFocus: true
					}}
				>
					<MenuItem value="">
						<span style={{ color: '#888888' }}>{placeholder}</span>
					</MenuItem>
					{times.map((time) => (
						<MenuItem
							key={time.label}
							value={time.format}
							disabled={time.value <= minTime}
						>
							{time.label}
						</MenuItem>
					))}
				</Select>
			</Box>
		</Box>
	);
};

FormTimePicker.defaultProps = {
	date: moment().startOf('days').format(),
	minHour: 8,
	maxHour: 22
};

export default FormTimePicker;
