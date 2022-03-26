import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { Avatar, Box, ListItemAvatar } from '@mui/material';
import DataContext from '../DataContext/DataContext';
import { useNavigate } from 'react-router-dom';

export default function MemberList({index}) {
	const {characters} = useContext(DataContext);
	const navigate = useNavigate();

	function onClickCharacter(id) {
		navigate(`/character/${id}`);
	}

	return (
		<List dense sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
			{characters.length ? characters.slice(
				index === 0 ? 0 : characters.length/2, 
				index === 0 ? characters.length/2 : characters.length
			)
			.map((result) => {
				const labelId = `checkbox-list-secondary-label-${result.id}`;
				return (
					<ListItem
						divider
						key={result.id}
					>
						<ListItemAvatar>
							<Avatar
								alt={result.name}
								src={result.image}
							/>
						</ListItemAvatar>
						<ListItemButton
							onClick={() => onClickCharacter(result.id)}
						>
							<ListItemText 
								id={labelId} 
								primary={`${result.id} ${result.name}`}
							/>
						</ListItemButton>
					</ListItem>
				);
			}) :
			<Box></Box>
			}
		</List>
	);
}
