import { Avatar, Box, Collapse, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function DropDownList({data, title}) {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

    return (
		<Box width='250px'>
			<List component="nav">
				<ListItemButton onClick={handleClick}>
					<ListItemText primary={title} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{
							data.length &&
								data.map(element => {
									return <ListItem key={element.id} divider>
										<ListItemAvatar>
											<Avatar
												alt={element.name}
												src={element.image}
											/>
										</ListItemAvatar>
										<ListItemText primary={element.name} />
									</ListItem>
								})
						}
					</List>
				</Collapse>
			</List>
		</Box>
    )
}
