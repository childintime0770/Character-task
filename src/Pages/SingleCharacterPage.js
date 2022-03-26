import { Avatar, Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import DataContext from '../DataContext/DataContext'
import { getCharacterLocation, getSingleCharacter, getCharacterData } from '../api/api'
import { useEffect } from 'react';
import EpisodeCard from '../UIComponents/EpisodeCard';
import DropDownList from '../UIComponents/DropDownList';


export default function SingleCharacterPage() {
    const {singleCharacter, setSingleCharacter} = useContext(DataContext);
    const [characterLocation, setCharacterLocation] = useState({});
    const [characterResidents, setCharacterResidents] = useState(null);
    const [characterEpisodes, setCharacterEpisodes] = useState(null);
    
    const params = useParams();
    const characterId = params.id

    function updateCharacter() {
        getSingleCharacter(characterId)
            .then(data => {
                setSingleCharacter(data)
            })
    }

    function updateCharacterLocation() {
        if(singleCharacter?.location?.url) {
            getCharacterLocation(singleCharacter.location.url)
            .then(data => {
                setCharacterLocation(data)
            })
        }
    }

    function updateCharacterResidents() {
        if(characterLocation?.residents) {
            const ids = characterLocation.residents.map(residentId => {
                let splitedUrl = residentId.split('/')
                return splitedUrl[splitedUrl.length - 1]
            });
            getCharacterData('character', ids)
                .then(data => {setCharacterResidents(data)})
        }
    }

    function updateCharacterEpisodes() {
        if(singleCharacter?.episode) {
            const ids = singleCharacter.episode.map(episodeId => {
                let splitedUrl = episodeId.split('/')
                return splitedUrl[splitedUrl.length - 1]
            });
            getCharacterData('episode', ids)
                .then(data => {setCharacterEpisodes(data)})
        }
    }

    useEffect(() => {
        updateCharacter();
    }, [])

    useEffect(() => {
        updateCharacterLocation();
        updateCharacterEpisodes();
    }, [singleCharacter]);

    useEffect(() => {
        updateCharacterResidents();
    }, [characterLocation])

	return (
		singleCharacter &&
            <Box display='flex'>
                <Box display='flex' flexDirection='column' gap={2} padding={2} borderRight='1px solid silver'>
                    <Avatar 
                        alt={singleCharacter.name} 
                        src={singleCharacter.image} 
                        variant='square' 
                        sx={{ width: 150, height: 150 }}
                    />
                    <Box display='flex' flexDirection='column' gap={2}>
                        <Typography variant='h5' color='blue' conponent='h1'>{singleCharacter.name}</Typography>
                        <Typography variand='p' content='p'>Species: {singleCharacter.species}</Typography>
                        <Typography variand='p' content='p'>Gender: {singleCharacter.gender}</Typography>
                        <Typography variand='p' content='p'>Status: {singleCharacter.status}</Typography>
                        <Typography variand='p' content='p'>
                            Created: {
                                singleCharacter.created 
                                    ? singleCharacter.created.replace(/T/, ' ').split('.')[0]
                                    : null
                            }
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' gap={2}>
                        <Typography variant='h5' color='coral'>Location</Typography>
                        <Typography variand='p' content='p'>Name: {characterLocation.name}</Typography>
                        <Typography variand='p' content='p'>Type: {characterLocation.type}</Typography>
                        <Typography variand='p' content='p'>Dimension: {characterLocation.dimension}</Typography>
                        <Typography variand='p' content='p'>
                            Created: {
                                characterLocation.created ?
                                characterLocation.created.replace(/T/, ' ').split('.')[0]
                                :
                                null
                            }
                        </Typography>
                        {
                            characterResidents 
                            ? <DropDownList data={characterResidents} title='Residents'/>
                            : null
                        }      
                    </Box>
                </Box>
                <Box padding={4}>
                    <Typography variant='h5' color='coral'>Episodes</Typography>
                    <Box display='flex' flexWrap='wrap' gap={2} pt={2}>
                        {
                            characterEpisodes 
                            ? <EpisodeCard data={characterEpisodes}/>
                            : null
                        }
                    </Box>
                </Box>
            </Box>
	)
}