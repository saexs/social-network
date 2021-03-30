import React, { useEffect, FC } from 'react'
import Users from './Users';
import { useSelector, useDispatch } from 'react-redux'
import {getUsersThunkCreator, updateUsersThunkCreator} from './../../redux/usersReducer'
import { RootState } from '../../redux/redaxstore';

type PropsType = {

}

const UsersContainer: FC<PropsType> = () => {
    const [currentPage, pageSize] = useSelector((state: RootState):[number, number] => {
        return [state.usersPage.currentPage, state.usersPage.pageSize]
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize))
    }, [currentPage, pageSize, dispatch])

    const onPageChanged = (pageNumber: number) => {
        // dispatch({ type: 'UPDATE_USERS', pageNumber, pageSize })
        dispatch(updateUsersThunkCreator(pageNumber, pageSize))
    }

     
    return (
        <div>
            <Users onPageChanged = {onPageChanged}
            />
        </div>
    )
    
}

export default UsersContainer;
