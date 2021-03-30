import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Users.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { delUserFromFriends, addUserToFriends } from '../../redux/usersReducer';
import { oneUserType } from '../../types.ts/types';
import { RootState } from '../../redux/redaxstore';

type PropsType = {
    item: oneUserType
}

const User: FC<PropsType> = (props) => {

    const followingInProgress = useSelector((state:RootState):Array<number> => state.usersPage.followingInProgress)
    const dispatch = useDispatch();
    let item = props.item;

    return (<div className={classes.user}>
        <div className={classes.userDecor}>
            <div>
                <NavLink to={'/profile/' + item.id} >
                    <img src={item.photos.large || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} className={classes.userAva} alt="no img" />
                </NavLink>
            </div>
            <div>
            {item.followed ?
                <button className={classes.userButtonUnfollow} disabled={followingInProgress.some(id => id === item.id)} onClick={() => {
                    dispatch(delUserFromFriends(item.id));
                }
                }>{'Unfollow'}</button> :
                <button className={classes.userButtonFollow} disabled={followingInProgress.some(id => id === item.id)} onClick={() => {
                    dispatch(addUserToFriends(item.id));
                }
                }>{'Follow'}</button>
            }
            </div>
        </div>
        <div>
            <div className={classes.userName}>{item.name}</div>
            <div>{item.status}</div>
        </div>
    </div>
    );
}

export default User;