import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {RouteProps} from "react-router";

export const ProtectedRoute = ({ children, ...rest }: RouteProps) => {

    const isLogin = useSelector((state: any) => state.auth.isLogin);

    return (
        <Route
            {...rest}
            render={({ location }) =>
            isLogin ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: location } }} />
                )
            }
        />
    );
}
