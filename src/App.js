import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Manga from './components/Manga';
import List from './components/List';
// import { Button, ButtonGroup, Nav, Navbar } from 'react-bootstrap';
import Home from './components/Home';
import UserForm from './components/UserPage';
import './styles/style.css';
// const baseUrl = '/api/lists';
function App() {
	// const [manga, setManga] = useState();
	// const [mangas, setMangas] = useState([]);
	// const [current, setCurrent] = useState();
	// const [singleOrList, setSOL] = useState(true);
	// const [buttonLabel, setLabel] = useState('List');
	// useEffect(() => {
	// 	setManga(JSON.parse(localStorage.getItem('current')));
	// 	setCurrent(JSON.parse(localStorage.getItem('current')));
	// 	axios.get(`${baseUrl}/all`).then(response => setMangas(response.data));
	// }, []);
	// const handleRandom = () => {
	// 	axios.get(`${baseUrl}/random`).then(response => {
	// 		axios.get(`https://api.jikan.moe/v3/manga/${response.data.manga_id}`).then(res => {
	// 			axios.get(`https://api.jikan.moe/v3/manga/${response.data.manga_id}/moreinfo`).then(r => {
	// 				const copy = { ...res.data, number: response.data.number, moreinfo: r.data.moreinfo }
	// 				console.log(copy);
	// 				setManga(copy);
	// 				setLabel('List');
	// 				setSOL(true);
	// 			});
	// 		});
	// 	});
	// }
	// const handleAll = () => {
	// 	axios.get(`${baseUrl}/all`).then(response => setMangas(response.data));

	// }
	// const handleCurrent = (manga, detailed) => {
	// 	if (detailed) {
	// 		if (current) {
	// 			if (current.title === manga.title) {
	// 				localStorage.removeItem('current');
	// 				setManga(null);
	// 				setCurrent(null);
	// 			} else {
	// 				localStorage.setItem('current', JSON.stringify(manga));
	// 				setManga(manga);
	// 				setCurrent(manga);
	// 			}
	// 		}
	// 		else {
	// 			localStorage.setItem('current', JSON.stringify(manga));
	// 			setManga(manga);
	// 			setCurrent(manga);
	// 		}
	// 	} else {
	// 		if (current) {
	// 			if (current.title === manga.manga_title) {
	// 				localStorage.removeItem('current');
	// 				setManga(null);
	// 				setCurrent(null);
	// 			} else {
	// 				axios.get(`https://api.jikan.moe/v3/manga/${manga.manga_id}`).then(res => {
	// 					axios.get(`https://api.jikan.moe/v3/manga/${manga.manga_id}/moreinfo`).then(r => {
	// 						const copy = { ...res.data, number: manga.number, moreinfo: r.data.moreinfo }
	// 						localStorage.setItem('current', JSON.stringify(copy));
	// 						setManga(copy);
	// 						setCurrent(copy);
	// 					});
	// 				});
	// 			}
	// 		}
	// 		else {
	// 			axios.get(`https://api.jikan.moe/v3/manga/${manga.manga_id}`).then(res => {
	// 				axios.get(`https://api.jikan.moe/v3/manga/${manga.manga_id}/moreinfo`).then(r => {
	// 					const copy = { ...res.data, number: manga.number, moreinfo: r.data.moreinfo }
	// 					localStorage.setItem('current', JSON.stringify(copy));
	// 					setManga(copy);
	// 					setCurrent(copy);
	// 				});
	// 			});
	// 		}
	// 	}
	// }
	// const handleSOL = () => {
	// 	if (singleOrList) {
	// 		setLabel('Single');
	// 		setSOL(false);
	// 	} else {
	// 		setLabel('List');
	// 		setSOL(true);
	// 	}

	// }
	// const handleDisplayCurrent = () => {
	// 	setManga(current);
	// 	setLabel('List');
	// 	setSOL(true);
	// }
	// const display = () => {
	// 	if (singleOrList) {
	// 		if (!manga) {
	// 			return (
	// 				<>

	// 				</>
	// 			)
	// 		} else {
	// 			return (
	// 				<>

	// 					<Manga manga={manga} handleCurrent={handleCurrent} current={current} />
	// 				</>
	// 			)
	// 		}
	// 	} else {
	// 		return (
	// 			<>
	// 				<Button onClick={handleAll} variant='secondary'>Refresh List</Button>
	// 				<MangaList mangas={mangas} handleCurrent={handleCurrent} current={current} />
	// 			</>
	// 		)
	// 	}
	// }

	return (
		<>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/dashboard'>
						<UserForm />
					</Route>
					<Route path='/list/anime'>
						<List type={'anime'} />
					</Route>
					<Route path='/list/manga'>
						<List type={'manga'} />
					</Route>
				</Switch>
			</Router>

			{/* <div className='container-fluid'>
				<Navbar bg='dark' expand='lg'>
					<Nav className='mr-auto'>
						<ButtonGroup className='mr-2'>
							<Button onClick={handleSOL} variant='secondary'>{buttonLabel}</Button>
						</ButtonGroup>
						<ButtonGroup className='mr-2'>
							<Button onClick={handleDisplayCurrent} variant='secondary'>Switch to Current</Button>
						</ButtonGroup>
						<ButtonGroup className='mr-2'>
							<Button onClick={handleRandom} variant='secondary'>Random</Button>
						</ButtonGroup>
					</Nav>
				</Navbar>
				<div className='container'>
					{display()}
				</div>

			</div> */}
		</>
	);
}

export default App;
