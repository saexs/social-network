import { ResultCodesEnum } from './../api/api';
import { oneUserType } from './../types.ts/types'
import { usersAPI } from "../api/api"
import { ThunkAction } from 'redux-thunk'
import { InferActionTypes, RootState } from './redaxstore'
import { Dispatch } from 'redux'

let users_date = {
    users: [] as Array<oneUserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>, //ids of users on page
}
type users_dateType = typeof users_date

const usersReducer = (state = users_date, action: usersReducerActionsType): users_dateType => {
    switch (action.type) {
        case 'ADD_USER': return {        
            ...state,
            users: state.users.map(u => {
                if (u.id === action.id) {
                    return { ...u, followed: true }
                } return u
            })        
        } 
        case 'DELETE_USER': return {        
            ...state,
            users: state.users.map(u => {
                if (u.id === action.id) {
                    return { ...u, followed: false }
                } return u
            })
        } 
        case 'SET_USERS': return {
            ...state, users: action.users  
        } 
        case 'SET_CURRENT_PAGE': return {
            ...state, currentPage: action.currentPage    
        } 
        case 'SET_TOTAL_COUNT_USER': return {
            
            ...state, totalUsersCount: action.totalCount 
        } 
        case 'SET_ISFETCHING': return {
            ...state, isFetching: action.isFetching 
        } 
        case 'FOLLOWING_IN_PROGRESS': return {
            ...state,
            followingInProgress: action.following
            ? [...state.followingInProgress, action.userId]
            : state.followingInProgress.filter(id => id !== action.userId)
        }
        default:
            return state;
    }
}
    
type usersReducerActionsType = InferActionTypes<typeof actions>
export const actions = {
    addUser: (id: number) =>  ({ type: 'ADD_USER', id: id } as const),
    setFetching: (isFetching: boolean) => ({ type: 'SET_ISFETCHING', isFetching } as const),
    delUser: (id: number) => ({ type: 'DELETE_USER', id } as const),
    setUsers: (users: Array<oneUserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUserCount: (totalCount: number) => ({ type: 'SET_TOTAL_COUNT_USER', totalCount } as const),
    following: (following: boolean, userId: number) => ({ type: 'FOLLOWING_IN_PROGRESS', following, userId } as const)
}



export const getUsersThunkCreator = (currentPage: number, pageSize: number):
ThunkAction<Promise<void>, RootState, unknown, usersReducerActionsType> => {
    return async (dispatch, getState) => {
        dispatch(actions.setFetching(false));
        let response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setFetching(true))
        dispatch(actions.setUsers(response.items))
        dispatch(actions.setTotalUserCount(response.totalCount))
    }
}
export const updateUsersThunkCreator = (pageNumber: number, pageSize: number):
ThunkAction<Promise<void>, RootState, unknown, usersReducerActionsType> => {
    return async (dispatch) => {
        dispatch(actions.setFetching(false))
        dispatch(actions.setCurrentPage(pageNumber))
        let response = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(actions.setFetching(true))
        dispatch(actions.setUsers(response.items))
    }
}

type DispatchType = Dispatch<usersReducerActionsType>
const addDelFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => usersReducerActionsType) => {
    dispatch(actions.following(true, userId))
    let response = await apiMethod(userId)
    if (response === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.following(false, userId))
}
export const delUserFromFriends = (userId: number):
ThunkAction<Promise<void>, RootState, unknown, usersReducerActionsType> => {
    return async (dispatch) => {
        addDelFlow(dispatch, userId, usersAPI.delUser.bind(usersAPI), actions.delUser)
    }
}
export const addUserToFriends = (userId: number):
ThunkAction<Promise<void>, RootState, unknown, usersReducerActionsType> => {
    return async (dispatch) => {
        addDelFlow(dispatch, userId, usersAPI.addUser.bind(usersAPI), actions.addUser)
    }
}

export default usersReducer;

