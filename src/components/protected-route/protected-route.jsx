import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children, ...rest }) => {

    const isLogin = useSelector(state => state.auth.isLogin);

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

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};