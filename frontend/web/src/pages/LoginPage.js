import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import * as UserService from '../services/user';

import { FormInput } from '../components/FormInput';

const LoginValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is invalid.')
		.required('Email is required.'),
	password: Yup.string().required('Password is required.')
});

const LoginPage = (props) => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [alertConfig, setAlertConfig] = useState({
		show: false,
		type: '',
		message: ''
	});

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Container
			fixed
			sx={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Grid container spacing={2}>
				<Grid item md={6}>
					<Box sx={{ fontWeight: 700, color: '#FFFFFF' }}>
						<h1>Hello !</h1>
						<h1>Welcome Back</h1>
					</Box>
				</Grid>
				<Grid item md={6}>
					<Formik
						initialValues={{ email: '', password: '' }}
						validateOnChange={false}
						validateOnBlur={false}
						validationSchema={LoginValidationSchema}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							const response = await UserService.login(values);
							if (response && response.status === 200) {
								setAlertConfig({
									show: false,
									type: '',
									message: ''
								});
								navigate('/make_booking');
							} else {
								setAlertConfig({
									show: true,
									type: 'error',
									message:
										'Incorrect username or password. Please try again.'
								});
							}
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
									sx={{
										display: 'flex',
										flexDirection: 'column',
										p: 4,
										borderRadius: 6,
										minHeight: 380
									}}
								>
									{alertConfig.show && (
										<Alert
											severity={alertConfig.type}
											sx={{ mb: 2, borderRadius: 2.5 }}
										>
											{alertConfig.message}
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

									<Box sx={{ flex: 1 }}>
										<FormInput
											inputProps={{
												id: 'login-form-email-input'
											}}
											fullWidth
											label="Email"
											placeholder="Email"
											{...getFieldProps('email')}
										/>
										<FormInput
											inputProps={{
												id: 'login-form-password-input'
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
											id="login-form-login-button"
											disableElevation
											variant="contained"
											color="primary"
											size="large"
											type="submit"
											disabled={isSubmitting}
											sx={{ my: 1 }}
										>
											Login
										</Button>
									</Box>
								</Paper>
							</form>
						)}
					</Formik>
				</Grid>
			</Grid>
		</Container>
	);
};

export default LoginPage;
