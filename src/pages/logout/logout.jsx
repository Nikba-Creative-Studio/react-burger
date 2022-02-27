import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../services/actions/auth';

export const LogoutPage = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin);

    useEffect(() => {
        if(isLogin) {
            dispatch(userLogout())
        }
    }, [dispatch, isLogin]);

    return <Redirect to="/" />;

}