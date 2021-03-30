import React, {FC} from 'react'
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import RadioOutlinedIcon from '@material-ui/icons/RadioOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

type PropsType = {}

const Navbar: FC<PropsType> = (props) => {
    return ( 
        <nav className={classes.nav}>
            <NavLink activeClassName={classes.active} className={classes.decoration} to="/profile">
                <div className={classes.navItem}>
                    <div className={classes.navItemIcon}><AccountCircleRoundedIcon/></div>
                    <div className={classes.navItemText}>My profile</div>
                </div>
            </NavLink>
            <NavLink activeClassName={classes.active} className={classes.decoration} to="/users">
                <div className={classes.navItem}>
                    <div className={classes.navItemIcon}><PeopleRoundedIcon/></div>
                    <div className={classes.navItemText}>Users</div>
                </div>
            </NavLink>
            <NavLink activeClassName={classes.active} className={classes.decoration} to="/dialogs">
                <div className={classes.navItem}>
                    <div className={classes.navItemIcon}><MessageOutlinedIcon/></div>
                    <div className={classes.navItemText}>Messages</div>
                </div>
            </NavLink>
            <NavLink activeClassName={classes.active} className={classes.decoration} to="/news">
                <div className={classes.navItem}>
                    <div className={classes.navItemIcon}><RadioOutlinedIcon/></div>
                    <div className={classes.navItemText}>News</div>
                </div>
            </NavLink>
            <NavLink activeClassName={classes.active} className={classes.decoration} to="/music">
                <div className={classes.navItem}>
                    <div className={classes.navItemIcon}><LibraryMusicOutlinedIcon/></div>
                    <div className={classes.navItemText}>Music</div>
                </div>
            </NavLink>
            <NavLink activeClassName={classes.active} className={classes.decoration} to="/settings">
                <div className={classes.navItem}>
                    <div className={classes.navItemIcon}><SettingsOutlinedIcon/></div>
                    <div className={classes.navItemText}>Settings</div>
                </div>
            </NavLink>
        </nav>
    );
}

export default Navbar;