import axios from 'axios';
import { NEWS_ADD, NEWS_CLEAR } from '../types';

export function addNews(book){
    const request = axios.post('/api/news/news', book)
                    .then( response => response.data )

    return { type: NEWS_ADD, payload: request };
}

export function clearNews(book){
    return { type: NEWS_CLEAR, payload: null };
}