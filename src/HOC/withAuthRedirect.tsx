import React, {FC} from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../redux/redaxstore';

export const WithAuthRedirect = (Component: FC<{}>) => {
    const RedirectComponent = () => {
        const isAuth = useSelector((state: RootState) => state.authReducer.isAuth)
        if (!isAuth) {
            return (
                <Redirect to={"/login"} />
            )
        }
        return (<Component />)
    }
    return RedirectComponent;
}
