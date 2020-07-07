import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import { connect } from 'react-redux';


const LoginSchema = Yup.object().shape({
    password: Yup.string()
    .min(6,'Too short !!')
    .required('Required !!'),
    email: Yup.string()
    .email('Invalid email :(')
    .required('Required !!')
})

class Login extends Component {

    state = {
        success: false,
        validation: false
    }

    render() {
        return(
            <div className="container from_container">
                <h1>Welcome back</h1>
                <br/>
                <h4>Sign in here:</h4>
                <Formik
                    initialValues={{ email: 'kim@kim.com', password:'password123'}}
                    validationSchema={LoginSchema}
                    onSubmit={ values => {
                        console.log(values)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter your email"
                                        className="u-full-width"
                                    />
                                    { errors.email && touched.email ?
                                        <div className="error_label">{errors.email}</div>
                                    :null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="Enter your password"
                                        className="u-full-width"
                                    />
                                    { errors.password && touched.password ?
                                        <div className="error_label">{errors.password}</div>
                                    :null}
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default Login;
