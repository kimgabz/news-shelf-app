import React from 'react';
import { Formik } from 'formik';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

// WYSIWYG
import { EditorState , ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import AdminLayout from '../../HOC/AdminLayout';
import { NewsSchema, FormElement } from './posts.helper';
import { editNews, clearNews, getNews } from '../../../store/actions/news.action';

class EditPost extends React.Component {

    state = {
        editorState:'',
        editorContentHtml:'',
        success: false,
        loading: true,
        newsToEdit:{}
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }

    onEditNews = (values) => {
       this.props.dispatch(editNews(values));
    }

    componentWillUnmount(){
        this.props.dispatch(clearNews());
    }

    componentDidMount(){
       this.props.dispatch(getNews(this.props.match.params.id));
    }

    componentDidUpdate(prevProps) {
        const hasChanged = this.props.news.single !== prevProps.news.single;
        const hasUpdated = this.props.news.update !== prevProps.news.update;
        const single = this.props.news.single;

        if(hasUpdated){
            this.setState({success: true})
        }

        if(hasChanged){
            if(single !== false){
                const blocksFromHtml = htmlToDraft(single.content);
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

                this.setState({
                    loading:false,
                    editorState: EditorState.createWithContent(contentState),
                    newsToEdit:{
                        _id: single._id,
                        name: single.name,
                        author: single.author,
                        pages: single.pages,
                        rating: single.rating,
                        price: single.price
                    }
                })
            } else {
                this.props.history.push('/');
            }
        }

    }

    render() {
            return this.state.loading ?
            <>Loading</>
        :
            <AdminLayout>
                <h4>Add a post</h4>

                <Formik
                    enableReinitialize={true}
                    initialValues={this.state.bookToEdit}
                    validationSchema={NewsSchema}
                    onSubmit={(values,{ resetForm })=>{
                       this.onEditBook({
                        ...values,
                        content: stateToHTML(this.state.editorState.getCurrentContent())
                       })
                    }}
                >
                    { ({ values, errors, touched, handleChange, handleBlur, handleSubmit })=>(
                        <form onSubmit={handleSubmit}>

                            <input
                                type="hidden"
                                name="_id"
                                value={values ? values._id : ''}
                            />

                            <FormElement
                                elData={{element:'input',type:'text', value:values.name }}
                                placeholder="The title of the News"
                                name="name"
                                onHandleChange={(e)=> handleChange(e)}
                                onHandleBlur={(e)=> handleBlur(e)}
                                errors={errors.name}
                                touched={touched.name}
                            />

                            <Editor
                                editorState={this.state.editorState}
                                onEditorStateChange={this.onEditorStateChange}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                            />

                            <h4>Book info</h4>

                            <FormElement
                                elData={{element:'input',type:'text', value:values.author }}
                                placeholder="The author's name"
                                name="author"
                                onHandleChange={(e)=> handleChange(e)}
                                onHandleBlur={(e)=> handleBlur(e)}
                                errors={errors.author}
                                touched={touched.author}
                            />

                            <FormElement
                                elData={{element:'input',type:'number', value:values.pages }}
                                placeholder="How many pages"
                                name="pages"
                                onHandleChange={(e)=> handleChange(e)}
                                onHandleBlur={(e)=> handleBlur(e)}
                                errors={errors.pages}
                                touched={touched.pages}
                            />

                            <FormElement
                                elData={{element:'select', value:values.rating }}
                                name="rating"
                                onHandleChange={(e)=> handleChange(e)}
                                onHandleBlur={(e)=> handleBlur(e)}
                                errors={errors.rating}
                                touched={touched.rating}
                            >
                                <option default>Select a rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </FormElement>

                            <FormElement
                                elData={{element:'input',type:'number', value:values.price }}
                                placeholder="What is the price ?"
                                name="price"
                                onHandleChange={(e)=> handleChange(e)}
                                onHandleBlur={(e)=> handleBlur(e)}
                                errors={errors.price}
                                touched={touched.price}
                            />

                            <button type="submit">
                                Update News
                            </button>
                            <br/>
                            {
                                this.state.success ?
                                <div className="succes_entry">
                                    <div>Update completed !!!</div>
                                    <Link to={`/article/${this.props.news.update.doc._id}`}>
                                        See your News article
                                    </Link>
                                </div>
                                :null
                            }
                        </form>
                    )}
                </Formik>

            </AdminLayout>
    }
}

function mapStateToProps(state){
    return {
        news: state.news
    }
}

export default connect(mapStateToProps)(EditPost);