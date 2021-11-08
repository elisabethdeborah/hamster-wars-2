
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckboxProps from '../models/CheckboxProps';

export default function CheckboxLabels({handleCheckbox, checked, label}:CheckboxProps) {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox
	  sx={{
		color: '##323333',
		'&.Mui-checked': {
		  color: '#323333',
		},
	  }} 
	  
	  />} onChange={() => handleCheckbox(!checked)} label={label} />
    </FormGroup>
  );
}