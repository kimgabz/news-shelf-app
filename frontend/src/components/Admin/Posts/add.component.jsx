import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import { Formik } from 'formik';

import AdminLayout from '../../HOC/AdminLayout';
import { NewsSchema, FormElement } from './posts.helper';

// WYSIWYG
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Actions
import { addNews, clearNews } from '../../../store/actions/news.action';

class AddPosts extends React.Component {

    state = {
        editorState:EditorState.createEmpty(),
        editorContentHtml:'',
        success: false
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            editorContentHtml: stateToHTML(editorState.getCurrentContent())
        })
    }

    onPostNews = (values) => {
        this.props.dispatch(addNews(values))
    }

    componentWillUnmount(){
        this.props.dispatch(clearNews());
    }

    componentDidUpdate(prevProps){
        const hasChanged = this.props.books !== prevProps.books
        if(hasChanged){
            this.setState({success: true})
        }
    }

    render() {
        return(
            <AdminLayout>
                <h4>Add a post</h4>

                <Formik
                    initialValues={{ name:'', author:'', pages:'', rating:'', price:'' }}
                    validationSchema={NewsSchema}
                    onSubmit={(values,{ resetForm })=>{
                        this.onPostNews({
                            ...values,
                            content: this.state.editorContentHtml
                        });
                        this.setState({
                            editorState:EditorState.createEmpty(),
                            editorContentHtml:''
                        })
                        resetForm({});
                    }}
                >
                    { ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>

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

                            <h4>News info</h4>

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
                                Add news
                            </button>
                            <br/>
                            {
                                this.state.success ?
                                <div className="succes_entry">
                                    <div>Congrats !!!</div>
                                    <Link to={`/article/${this.props.news.add.newsId}`}>
                                        See your news article
                                    </Link>
                                </div>
                                :null
                            }
                        </form>
                    )}

                </Formik>
            </AdminLayout>
        )
    }
}

function mapStateToProps(state){
    return {
        news: state.news
    }
}

export default connect(mapStateToProps)(AddPosts);