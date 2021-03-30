import React, {FC} from 'react';
import Paginator from './Paginator';
import User from './User';
import {useSelector} from 'react-redux'
import { RootState } from '../../redux/redaxstore';
import Loader from '../../Preloader/Loader';

type PropsType ={
    onPageChanged: (pageNumber: number) => void
}

const Users: FC<PropsType> = (props) => {

    const users = useSelector((state: RootState) => state.usersPage.users)
    const isFetching = useSelector((state: RootState) => state.usersPage.isFetching)

    return (
        <div>
            <Paginator 
                onPageChanged={props.onPageChanged}
            />
            {isFetching || <Loader/>}
            {users.map(
                item => <User 
                    key={item.id} item={item} 
                /> 
            )
            }
        </div>
    );
}

export default Users;