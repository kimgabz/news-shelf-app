import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions/user.action';

const Logout = (props) => {

    const logout = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(logoutUser());
    },[dispatch]);

    useEffect(()=>{
        if(logout.auth === null){
            setTimeout(()=>{
                props.history.push('/')
            },2000)
        }
    },[logout,props])

    return(
        <div className="logout_container">
            <h1>
                You are now logged out
            </h1>
        </div>
    )
}

export default Logout;