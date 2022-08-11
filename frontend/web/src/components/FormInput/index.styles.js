import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

const CustomInput = styled(OutlinedInput)(({ theme }) => ({
	width: '100%',
	'& .MuiOutlinedInput-notchedOutline': {
		borderRadius: 10,
		borderColor: '#949494'
	},
	'& .MuiInputBase-input': {
		color: '#000000'
	}
}));

const formInputContainerSx = {
	mb: 2.5
};

const labelSx = {
	color: '#949494'
};

export { CustomInput, formInputContainerSx, labelSx };
