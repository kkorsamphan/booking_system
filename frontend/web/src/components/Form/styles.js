import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

const CustomInput = styled(OutlinedInput)(({ theme }) => ({
	width: '100%',
	'& .MuiOutlinedInput-notchedOutline': {
		borderRadius: 10,
		borderColor: '#000000'
	},
	'& .MuiInputBase-input': {
		color: '#000000',
		fontSize: 18
	},
	'& .MuiInputBase-input::placeholder': {
		color: '#888888',
		opacity: 1
	}
}));

const formInputContainerStyle = {
	marginBottom: '10px'
};

const formInputLabelStyle = {
	color: '#888888'
};

export { CustomInput, formInputContainerStyle, formInputLabelStyle };
