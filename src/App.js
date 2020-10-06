import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Manga from './components/Manga';
import MangaList from './components/MangaList';
import {Button, ButtonGroup, Tabs, Nav, Navbar, Tab} from 'react-bootstrap';
const baseUrl = '/api/lists';
function App() {
    const [manga,setManga] = useState();
    const [mangas,setMangas] = useState([]);
    const [current,setCurrent] = useState();
    const [singleOrList, setSOL] = useState(true);
    const [buttonLabel, setLabel] = useState('List');
    useEffect(() => {
        setManga(JSON.parse(localStorage.getItem('current')));
        setCurrent(JSON.parse(localStorage.getItem('current')));
        axios.get(`${baseUrl}/all`).then(response => setMangas(response.data));
    }, []);
    const handleRandom = () => {
        axios.get(`${baseUrl}/random`).then(response => {
            axios.get(`https://api.jikan.moe/v3/manga/${response.data.manga_id}`).then(res => {
                axios.get(`https://api.jikan.moe/v3/manga/${response.data.manga_id}/moreinfo`).then(r => {
                    const copy = {...res.data, number: response.data.number,moreinfo:r.data.moreinfo}
                    console.log(copy);
                    setManga(copy);
                    setLabel('List');
                    setSOL(true);
                });
            });
        });
    }
    const handleAll = () => {
        axios.get(`${baseUrl}/all`).then(response => setMangas(response.data));

    }
    const handleCurrent = (manga, detailed) => {
        if(detailed){
            if(current){
                if(current.title === manga.title){
                    localStorage.removeItem('current');
                    setManga(null);
                    setCurrent(null);
                }else{
                    localStorage.setItem('current', JSON.stringify(manga));
                    setManga(manga);
                    setCurrent(manga);
                }
            }
            else{
                localStorage.setItem('current', JSON.stringify(manga));
                setManga(manga);
                setCurrent(manga);
            }
        }else{
            if(current){
                if(current.title === manga.manga_title){
                    localStorage.removeItem('current');
                    setManga(null);
                    setCurrent(null);
                }else{
                    axios.get(`https://api.jikan.moe/v3/manga/${manga.manga_id}`).then(res => {
                        axios.get(`https://api.jikan.moe/v3/manga/${manga.manga_id}/moreinfo`).then(r => {
                            const copy = {...res.data, number: manga.number,moreinfo:r.data.moreinfo}
                            localStorage.setItem('current', JSON.stringify(copy));
                            setManga(copy);
                            setCurrent(copy);
                        });
                    });
                }
            }
            else{
                axios.get(`https://api.jikan.moe/v3/manga/${manga.manga_id}`).then(res => {
                    axios.get(`https://api.jikan.moe/v3/manga/${manga.manga_id}/moreinfo`).then(r => {
                        const copy = {...res.data, number: manga.number,moreinfo:r.data.moreinfo}
                        localStorage.setItem('current', JSON.stringify(copy));
                        setManga(copy);
                        setCurrent(copy);
                    });
                });
            }
        }
    }
    const handleSOL = () => {
        if(singleOrList){
            setLabel('Single');
            setSOL(false);
        }else{
            setLabel('List');
            setSOL(true);
        }
        
    }
    const handleDisplayCurrent = () => {
        setManga(current);
        setLabel('List');
        setSOL(true);
    }
    const display = () => {
        if(singleOrList){
            if(!manga){
                return(
                    <>
                        <Button onClick = {handleRandom} variant= 'secondary'>Random</Button>
                    </>
                )
            }else {
                return(
                    <>
                        <Button onClick = {handleRandom} variant= 'secondary'>Random</Button>
                        <Manga manga = {manga} handleCurrent = {handleCurrent} current = {current}/>
                    </>
                )
            }
        }else{
            return(
                <>
                    <Button onClick = {handleAll} variant= 'secondary'>Refresh List</Button>
                    <MangaList mangas = {mangas} handleCurrent = {handleCurrent} current = {current}/>
                </>
            )
        }
    }

    return (
        <>
            <div className = 'container-fluid' className = 'betterwork'>
                <Navbar bg='dark' expand='lg' className = 'betterwork'>
                    <Nav className='mr-auto'>
                    <ButtonGroup className='mr-2'>
                        <Button onClick = {handleSOL} variant= 'secondary'>{buttonLabel}</Button>
                    </ButtonGroup>
                    <ButtonGroup className='mr-2'>
                        <Button onClick = {handleDisplayCurrent} variant= 'secondary'>Switch to Current</Button>
                    </ButtonGroup>
                    </Nav>
                </Navbar>
                    <div className = 'container'>
                        {display()}
                    </div>

             </div>
        </>
    );
}

export default App;
