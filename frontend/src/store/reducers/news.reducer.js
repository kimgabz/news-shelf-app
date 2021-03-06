import { NEWS_ADD, NEWS_CLEAR, NEWS_GET, NEWS_UPDATE, NEWS_GET_ALL } from '../types';

export default function(state = {}, action){
    switch(action.type) {
        case NEWS_ADD:
            return {...state, add: action.payload }
        case NEWS_CLEAR:
            return { ...state,
                add: action.payload, 
                single: action.payload,
                update: action.payload
            }
        case NEWS_GET:
            return {...state, single: action.payload }
        case NEWS_UPDATE:
            return {...state, update: action.payload }
        case NEWS_GET_ALL:
            return {...state, collection: action.payload }
        default:
            return state;
    }
}