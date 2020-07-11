import axios from 'axios';
import { NEWS_ADD, NEWS_CLEAR, NEWS_GET, NEWS_UPDATE, NEWS_GET_ALL } from '../types';

export function addNews(values){
    const request = axios.post('/api/news/news', values)
                    .then( response => response.data )

    return { type: NEWS_ADD, payload: request };
}

export function clearNews(values){
    return { type: NEWS_CLEAR, payload: null };
}

export function editNews(values){
    const request = axios.put('/api/news/news',values)
                     .then( response => response.data )
 
    return { type: NEWS_UPDATE, payload: request };
}
 
export function getNews(newsId){
//  /api/news/news?id=5e13765a4084511885f252f1
const request = axios.get(`/api/news/news?id=${newsId}`)
                .then( response => {
                    return response.data
                }).catch((err)=>{
                    return false
                })

    return { type: NEWS_GET, payload: request }
}

export function getNewsAll(
    limit = 50,
    start = 0,
    order = 'asc',
    list
){

    const request = axios.get(`/api/news/all?limit=${limit}&skip=${start}&order=${order}`)
                    .then( response => {
                        return list ? [...list,...response.data] : response.data;
                    });

        return {
            type: NEWS_GET_ALL,
            payload: request
        }
}