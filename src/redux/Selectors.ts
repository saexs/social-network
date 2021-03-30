import {createSelector} from 'reselect';
import { RootState } from './redaxstore';


export const getUsersSimpleSelector = (state: RootState) => {
    return (
        state.usersPage.users
    );
}

export const getUsersSuperSelector = createSelector(
    getUsersSimpleSelector, (users) => {
    return users.filter(u => true)
})

export const getPageSizeSelector = (state: RootState) => {
    return (
        state.usersPage.pageSize
    );
}

export const getTotalUsersCountSelector = (state: RootState) => {
    return (
        state.usersPage.totalUsersCount
    );
}

export const getCurrentPageSelector = (state: RootState) => {
    return (
        state.usersPage.currentPage
    );
}

export const getIsFetchingSelector = (state: RootState) => {
    return (
        state.usersPage.isFetching
    );
}

export const getFollowingInProgressSelector = (state: RootState) => {
    return (
        state.usersPage.followingInProgress
    );
}
