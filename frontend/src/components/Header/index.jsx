import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import MainNav from './SideNav/sidenav';

const Header = (props) => {

    let [mainNav,setMainNav] = useState(false);

    const onShowNav = () => {
        setMainNav(true);
    }

    const onHideNav = () => {
        setMainNav(false);
    }

    return (
<header>
            <div className="open_nav">
                <FontAwesome
                    name="bars"
                    onClick={()=> onShowNav(true)}
                    style={{
                        color:'#ffffff',
                        padding:'10px',
                        cursor:'pointer',
                        fontSize:'25px'
                    }}
                />
            </div>
            <MainNav
                showNav={mainNav}
                onHideNav={()=> onHideNav(false)}
            />
            <Link to="/" className="logo">
                The News Shelf
            </Link>
        </header>
    )
}

export default Header;
