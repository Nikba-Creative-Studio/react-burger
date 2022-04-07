import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks'

import {RouteProps} from "react-router";

export const ProtectedRoute = ({ children, ...rest }: RouteProps) => {

    const isLogin = useAppSelector((state) => state.auth.isLogin);

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
