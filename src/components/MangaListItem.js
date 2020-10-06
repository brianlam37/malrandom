import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
const MangaListItem = ({manga, handleCurrent, current}) => {
    const [buttonLabel, setLabel] = useState('Set Current');
    useEffect(()=>{
        if(current){
            if(current.title === manga.manga_title){
                setLabel('Remove Current');
            }else{
                setLabel('Set Current');
            }
        }else{
            setLabel('Set Current');
        }
    },[manga.manga_image_path, manga.manga_title, current]);
    return(
        <tr>
            <td>
                {manga.number}.
            </td>
            <td>
                <img src = {manga.manga_image_path} alt = 'mini cover'></img>
            </td>
            <td>
                <a href = {`https://myanimelist.net/${manga.manga_url}`} target='_blank' rel='noopener noreferrer'>
                    {manga.manga_title}
                </a> 
            </td>
            <td>
                {manga.manga_num_chapters}
            </td>
            <td>
                {manga.manga_num_volumes}
            </td>
            <td>
                <Button onClick = {() => handleCurrent(manga, false)} variant= 'secondary'>
                    {buttonLabel}
                </Button>
            </td>
        </tr>
    )
}

export default MangaListItem;