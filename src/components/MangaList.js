import React, { useState, useEffect } from 'react';
// import MangaListItem from './MangaListItem';
// import {Table} from 'react-bootstrap';
import axios from 'axios';
import Navbar from './Navbar';
const MangaList = ({ mangas, handleCurrent, current, type }) => {
	const [malUser, setMalUser] = useState(
		localStorage.getItem('malRandomUser')
	);
	const [list, setList] = useState([]);
	const airingStatus = (e) => {
		switch (e) {
			case 1: {
				return 'Airing';
			}
			case 2: {
				return 'Complete';
			}
			case 3: {
				return 'Unaired';
			}

			default:
				return 'N/A';
		}
	};
	const publishingStatus = (e) => {
		switch (e) {
			case 1: {
				return 'Publishing';
			}
			case 2: {
				return 'Completed';
			}
			default:
				return 'N/A';
		}
	};
	const numberOf = (item) => {
		switch (type) {
			case 'Manga': {
				return <>Chapters: {item.total_chapters}</>;
			}
			default:
				return (
					<div className='list-item-status'>
						<div>
							{type === 'manga'
								? publishingStatus(item.publishing_status)
								: airingStatus(item.airing_status)}
							<div className='dot'></div>
							{item.type}
						</div>
						<div className='total'>
							Episodes: {item.total_episodes}
						</div>
					</div>
				);
		}
	};

	useEffect(() => {
		if (type === 'manga') {
			axios
				.get(`https://api.jikan.moe/v3/user/${malUser}/mangalist/ptr`)
				.then((response) => {
					console.log(response.data.manga[3]);
					setList(response.data.manga);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			axios
				.get(`https://api.jikan.moe/v3/user/${malUser}/animelist/ptw`)
				.then((response) => {
					console.log(response.data.anime[3]);
					setList(response.data.anime);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [malUser, type]);
	const drawList = () => {
		return (
			<div className='lists'>
				{list.map((l, index) => {
					return (
						<div className='list-item' key={l.title}>
							{/* {index+1}. */}
							<img src={l.image_url} alt='anime/manga cover' />
							<div className='list-item-info'>
								<a href={l.url}>{l.title}</a>
							</div>
							{numberOf(l)}
						</div>
					);
				})}
			</div>
		);
	};
	return (
		<div className='lists-container'>
			<Navbar />
			{drawList()}
		</div>
	);
	// return(
	//     <Table variant="dark" hover>
	//         <tbody>
	//             {mangas.map((manga, index) =>{
	//                 const copy = {...manga, number: index+1}
	//                 return(
	//                     <MangaListItem key = {manga.manga_title} manga = {copy} handleCurrent = {handleCurrent} current = {current}/>
	//                 )
	//             })}
	//         </tbody>
	//     </Table>
	// )
};

export default MangaList;
