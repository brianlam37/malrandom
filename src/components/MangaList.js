import React from 'react'
import MangaListItem from './MangaListItem';
import {Table} from 'react-bootstrap';
const MangaList = ({mangas, handleCurrent, current}) => {
    return(
        <Table variant="dark" hover>
            <tbody>
                {mangas.map((manga, index) =>{
                    const copy = {...manga, number: index+1} 
                    return(
                        <MangaListItem key = {manga.manga_title} manga = {copy} handleCurrent = {handleCurrent} current = {current}/>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default MangaList;