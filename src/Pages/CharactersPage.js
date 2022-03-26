import { Box, Pagination } from '@mui/material'
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCharacters } from '../api/api';
import DataContext from '../DataContext/DataContext';
import MemberList from '../UIComponents/MemberList';
import SearchInput from '../UIComponents/SearchInput';

export default function CharactersPage() {
	const {characters, setCharacters, info, setInfo} = useContext(DataContext);
	const [page, setPage] = useState(1);
	const [name, setName] = useState('');

	useEffect(() => {
		getCharacters({name, page})
			.then(data => {
				setCharacters(data.results)
				setInfo(data.info)
			})
			.catch(error => {
				setCharacters([]);
				setInfo({});
			})
	}, [name, page]);

	function pageChangeHandler(page) {
		setPage(page);
	}

	function searchChangeHandler(value) {
		setName(value);
		setPage(1);
	}

	return (
		<Box>
			<Box padding={1} display='flex' justifyContent='space-between' alignItems='center'>
				<Box width='195px' height='40px'></Box>
				<Pagination 
					count={info.pages}
					page={page}
					onChange={(_, page) => pageChangeHandler(page)}
				/>
				<SearchInput value={name} onChange={searchChangeHandler}/>
			</Box>
			<Box display='flex' justifyContent='center' gap='20px'>
				<MemberList index={0}/>
				<MemberList index={1}/>
			</Box>
		</Box>
	);
}
