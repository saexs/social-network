import classes from './Header.module.css';
import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logoutThunkCreator } from '../../redux/authreducer';
import { RootState } from '../../redux/redaxstore';
import { Button } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

type PropsType = {}

const Header: FC<PropsType> = React.memo(() => {
    const dispatch = useDispatch()

    const login = useSelector((state: RootState): string | null => state.authReducer.login)
    const isAuth = useSelector((state: RootState): boolean => state.authReducer.isAuth)

    return (
        <header className={classes.head}>
            <NavLink to='/'>
                <div className={classes.icon}><ThumbUpAltOutlinedIcon color="primary" style={{ fontSize: 40 }}/></div>
            </NavLink>
            <div className={classes.login}>
                {isAuth
                ? <div className={classes.logout}>
                    <div className={classes.test + ' ' + classes.userName}>
                        {login + ' '}
                    </div>
                    <div className={classes.test}>
                        <Button className={classes.buttonLogout} variant="outlined" color="primary" onClick={() => { dispatch(logoutThunkCreator()) }}>Logout</Button>
                    </div>
                </div>
                : <NavLink to='/login'>
                    <div className={classes.login}><Button variant="contained" color="primary">Login</Button></div>
                </NavLink>
                }
            </div>
        </header>
    );
})

export default Header;