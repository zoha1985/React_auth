import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [logedinUser, setLogedinUser] = useContext(UserContext);
    console.log("privateRoute", logedinUser);
    return (
        <Route
            {...rest}
            render={({ location }) =>
            logedinUser.email || logedinUser.name ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;