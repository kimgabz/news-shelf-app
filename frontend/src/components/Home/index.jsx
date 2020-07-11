import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getNewsAll } from '../../store/actions/news.action';

import { RowGenerator, GenerateRowsWithBlocks } from'../../utils/helpers';

class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getNewsAll(6,0,'desc'))
    }

    loadmore = () => {
        let newsList = this.props.news.collection;
        let count = newsList.length;
        this.props.dispatch(getNewsAll(2,count,'desc',newsList))
    }

    showArticles = (values) => {
        if(values.collection){
            const rowsArray = RowGenerator(values.collection, 2);
            const generatedArticles = GenerateRowsWithBlocks(rowsArray,'six')
            return generatedArticles;
        }
        return false;
    }

    render(){
        return(
            <div className="container">
                <div className="row articles_container">
                    {this.showArticles(this.props.news)}
                </div>  
                <div 
                    className="loadmore"
                    onClick={this.loadmore}
                >
                    Load more
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        news: state.news
    }
}

export default connect(mapStateToProps)(Home);