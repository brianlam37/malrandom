import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
const Manga = ({manga, handleCurrent, current}) => {
    const [buttonLabel, setLabel] = useState('Set Current');
    useEffect(()=>{
        console.log(manga);
        if(current){
            if(current.title === manga.title){
                setLabel('Remove Current');
            }else{
                setLabel('Set Current');
            }
        }else{
            setLabel('Set Current');
        }
    },[manga, current]);
    const moreInfo = () => {
        if(!manga.moreinfo){
            return null;
        }else{
            return(
                <>
                    <h2>More Info</h2>
                    {manga.moreinfo.split('\n').map(text => {
                        return(<p key = {text}>{text}</p>)
                    })}
                </>
            );
        }
    }
    return(
        <>
            <h2>
                {manga.number}. {' '}
                <a href = {manga.url} target='_blank' rel='noopener noreferrer'>
                    {manga.title}
                </a> {' '}
                <Button onClick = {() => handleCurrent(manga, true)} variant= 'secondary'>{buttonLabel}</Button>
            </h2>
            <img src = {manga.image_url} alt ='mal manga cover'></img>
            <p>Chapters: {manga.chapters}</p>
            <p>Volumes: {manga.volumes}</p>
            <p>Published: {manga.published.string}</p>
            <h3>Synopsis</h3>
            <p>{manga.synopsis}</p>
            {moreInfo()}

        </>
    )
}

export default Manga;