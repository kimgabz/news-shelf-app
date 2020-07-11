import React,{ useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  getNews, clearNews } from '../../store/actions/news.action';

const Article = (props) => {

    const article = useSelector( state => state.news );
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getNews(props.match.params.id));
      return(()=>{
          dispatch(clearNews())
      })
    }, [dispatch,props])

   
    const showArticle = () => {
        if(article.single){
            const art  = article.single;

            return <div className="single_article_container">
                <div className="top">
                    <h3>{art.name}</h3>
                    <div><span>Author: </span>{art.author}</div>
                    <div><span>Rating: </span>{art.rating}</div>
                </div>
                <div className="content">
                    <div
                        className="article_content"
                        dangerouslySetInnerHTML={{
                            __html: art.content
                        }}
                    ></div>
                </div>
                <div>
                    <i>Reviewd by {art.ownerId.name} {art.ownerId.lastname}</i>
                </div>
            </div>

        }
    }


    return(
        <div className="container">
            {showArticle()}
            <div>
                { article.single === false ?
                    <div>
                        Sorry, the news requested is not found
                    </div>
                :null}
            </div>
        </div>
    )
}

export default Article;
