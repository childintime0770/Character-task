import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function SearchInput({value, onChange}) {   
  	return (
		<TextField
			size='small'
			type='search'
			label="Search By Name"
      value={value}
			onChange={event => onChange(event.target.value)}
		/>
	
  	);
}
