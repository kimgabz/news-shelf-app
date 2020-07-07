import React from 'react'
import Header from '../Header/index';

const MainLayout = (props) => {
    return (
        <>
            <Header/>
            <>
                { props.children }
            </>   
        </>
    )
}

export default MainLayout
