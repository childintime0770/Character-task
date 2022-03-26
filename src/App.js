import { Box } from "@mui/material";
import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import DataContext from "./DataContext/DataContext";
import CharactersPage from "./Pages/CharactersPage";
import SingleCharacterPage from "./Pages/SingleCharacterPage";


function App() {
	const [characters, setCharacters] = useState([]);
	const [info, setInfo] = useState({});
	const [singleCharacter, setSingleCharacter] = useState({});
	

	return (
			<DataContext.Provider value={{characters, setCharacters, info, setInfo, singleCharacter, setSingleCharacter}}>
				<Box>
					<Router>
						<Routes>
							<Route path='/' element={<CharactersPage/>}/>
							<Route path='/Character/:id' element={<SingleCharacterPage/>}/>
						</Routes>
					</Router>
				</Box>
			</DataContext.Provider>
	);
}

export default App;
