import React, { useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import FormInput from './FormInput';
import FormDatePicker from './FormDatePicker';
import FormTimePicker from './FormTimePicker';

const FindBookingValidationSchema = Yup.object().shape({
	roomSize: Yup.number()
		.required('Number of guest is required.')
		.positive()
		.integer(),
	date: Yup.string().required('Date is required.').nullable(),
	startTime: Yup.string().required('Start time is required.'),
	endTime: Yup.string().required('End time is required.')
});

const BookingForm = ({ handleFindRoom }) => {
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [startTimePickerOpen, setStartTimePickerOpen] = useState(false);
	const [endTimePickerOpen, setEndTimePickerOpen] = useState(false);

	const formik = useFormik({
		initialValues: {
			roomSize: '',
			date: null,
			startTime: '',
			endTime: ''
		},
		validateOnMount: true,
		validationSchema: FindBookingValidationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			console.log(values);
			setSubmitting(false);

			const dateFormat = moment(values.date).format('MM/DD/YYYY');
			const startTimeFormat = moment(values.startTime).format('hh:mm A');
			const endTimeFormat = moment(values.endTime).format('hh:mm A');

			const payload = {
				roomSize: values.roomSize,
				startTime: values.startTime,
				endTime: values.endTime,
				dateFormat: dateFormat,
				startTimeFormat: startTimeFormat,
				endTimeFormat: endTimeFormat
			};

			handleFindRoom(payload);
		}
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={2}>
				<Grid item md={3}>
					<FormInput
						inputProps={{
							id: 'find-room-form-guest-number',
							style: { textAlign: 'center' }
						}}
						fullWidth
						type="number"
						label="Number of Guest"
						placeholder="Select number of guest"
						{...formik.getFieldProps('roomSize')}
					/>
				</Grid>
				<Grid item md={3}>
					<FormDatePicker
						inputId="find-room-form-date"
						fullWidth
						label="Date"
						placeholder="Select date"
						open={datePickerOpen}
						onTogglePicker={() => {
							setDatePickerOpen(!datePickerOpen);
						}}
						value={formik.values.date}
						onChange={(value) => {
							formik.setFieldValue('date', value);

							setDatePickerOpen(false);
							setStartTimePickerOpen(true);
						}}
					/>
				</Grid>
				<Grid item md={3}>
					<FormTimePicker
						inputId="find-room-form-start-time"
						fullWidth
						label="Start Time"
						placeholder="Select start time"
						open={startTimePickerOpen}
						onTogglePicker={(state) =>
							setStartTimePickerOpen(state)
						}
						date={formik.values.date}
						value={formik.values.startTime}
						onChange={(e) => {
							const value = e.target.value;
							formik.setFieldValue('startTime', value);

							setStartTimePickerOpen(false);
							setEndTimePickerOpen(true);
						}}
					/>
				</Grid>
				<Grid item md={3}>
					<FormTimePicker
						inputId="find-room-form-end-time"
						fullWidth
						label="End Time"
						placeholder="Select end time"
						open={endTimePickerOpen}
						onTogglePicker={(state) => setEndTimePickerOpen(state)}
						date={formik.values.startTime}
						value={formik.values.endTime}
						onChange={(e) => {
							const value = e.target.value;
							formik.setFieldValue('endTime', value);

							setEndTimePickerOpen(false);
						}}
					/>
				</Grid>
				<Grid item md={9}></Grid>
				<Grid item md={3}>
					<Button
						id="find-room-form-find-room-button"
						fullWidth
						disableElevation
						variant="contained"
						color="primary"
						size="large"
						type="submit"
						sx={{ mt: -2 }}
						disabled={!formik.isValid}
					>
						Find Room
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default BookingForm;
