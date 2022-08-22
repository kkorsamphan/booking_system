import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import useAuth from '../context/auth/useAuth';

import { GlobalLayout } from '../components/Layouts';
import { FormInput } from '../components/Form';

const SignUpValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is invalid.')
		.required('Email is required.'),
	password: Yup.string().required('Password is required.')
});

const SignUpPage = (props) => {
	const { signUp, authError } = useAuth();

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<GlobalLayout>
			<Grid container spacing={2}>
				<Grid item sm={12} md={6}>
					<Box
						sx={{
							fontWeight: 700,
							color: '#FFFFFF',
							whiteSpace: 'pre'
						}}
					>
						<h1>{'Create\nNew Account'}</h1>
					</Box>
				</Grid>
				<Grid item sm={12} md={6}>
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							email: '',
							password: ''
						}}
						validateOnChange={false}
						validateOnBlur={false}
						validationSchema={SignUpValidationSchema}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							signUp(values);
						}}
					>
						{({
							getFieldProps,
							errors,
							handleSubmit,
							isSubmitting
						}) => (
							<form onSubmit={handleSubmit}>
								<Paper
									elevation={0}
									sx={{ p: 4, borderRadius: 6 }}
								>
									{authError.show && (
										<Alert
											severity={authError.type}
											sx={{ mb: 2, borderRadius: 2.5 }}
										>
											{authError.message}
										</Alert>
									)}

									{Object.keys(errors).length > 0 && (
										<Alert
											severity="error"
											sx={{ mb: 2, borderRadius: 2.5 }}
										>
											{Object.keys(errors).map((key) => {
												return (
													<div key={key}>
														{errors[key]}
													</div>
												);
											})}
										</Alert>
									)}

									<Box>
										<FormInput
											inputProps={{
												'data-testid':
													'sign-up-form-first-name-input'
											}}
											label="First Name"
											placeholder="First Name"
											fullWidth
											{...getFieldProps('firstName')}
										/>
										<FormInput
											inputProps={{
												'data-testid':
													'sign-up-form-last-name-input'
											}}
											label="Last Name"
											placeholder="Last Name"
											fullWidth
											{...getFieldProps('lastName')}
										/>
										<FormInput
											inputProps={{
												'data-testid':
													'sign-up-form-email-input'
											}}
											fullWidth
											label="Email"
											placeholder="Email"
											{...getFieldProps('email')}
										/>
										<FormInput
											inputProps={{
												'data-testid':
													'sign-up-form-password-input'
											}}
											fullWidth
											label="Password"
											placeholder="Password"
											type="password"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														onClick={
															handleClickShowPassword
														}
													>
														{showPassword ? (
															<VisibilityOff />
														) : (
															<Visibility />
														)}
													</IconButton>
												</InputAdornment>
											}
											{...getFieldProps('password')}
										/>
									</Box>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column'
										}}
									>
										<Button
											data-testid="sign-up-form-create-new-account-button"
											disableElevation
											variant="contained"
											color="primary"
											size="large"
											type="submit"
											disabled={isSubmitting}
											sx={{ my: 1 }}
										>
											Create New Account
										</Button>
									</Box>
								</Paper>
							</form>
						)}
					</Formik>
				</Grid>
			</Grid>
		</GlobalLayout>
	);
};

export default SignUpPage;
