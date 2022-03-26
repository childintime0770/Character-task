import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

export default function EpisodeCard({data}) {

	return (
		<Box display='flex' flexWrap='wrap' gap={2}>
			{
				data.length 
				? data.map(episode => {
					return (
						<Card sx={{ minWidth: 275 }} key={episode.id}>
							<CardContent>
								<Typography sx={{ fontSize: 14 }} color="text.secondary">{episode.episode}</Typography>
								<Typography variant="h6" component="p">{episode.name}</Typography>
								<Typography sx={{ mb: 1.5 }} color="text.secondary">{episode.created}</Typography>
							</CardContent>
						</Card>
					)
				})
				: (
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography sx={{ fontSize: 14 }} color="text.secondary">{data.episode}</Typography>
							<Typography variant="h6" component="p">{data.name}</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">{data.created}</Typography>
						</CardContent>
					</Card>
				)
			}
		</Box>
	)
}
