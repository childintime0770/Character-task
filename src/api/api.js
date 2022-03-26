export function getCharacters(params) { // {page: 1, name: rick}
	let res = process.env.REACT_APP_API_URL + '/character?';

	for(let param in params) {
		res += param + '=' + params[param] + '&'
	}

	res = res.slice(0, -1);

	return fetch(res)
		.then(response => {
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			return response.json()
		})
}

export function getSingleCharacter(id) {
	return fetch(process.env.REACT_APP_API_URL + '/character/' + id)
		.then(response => response.json())
}

export function getCharacterData(location, idList) {
	const url = `${process.env.REACT_APP_API_URL}/${location}/${idList}`
	return fetch(url)
		.then(response =>response.json())
}

export function getCharacterLocation(url) {
	return fetch(url)
		.then(response => response.json())
}