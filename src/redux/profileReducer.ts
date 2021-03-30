import { postsType, photosType, profileType } from './../types.ts/types';
import { stopSubmit } from "redux-form"
import { profileAPI, ResultCodesEnum } from "../api/api"
import { ThunkAction } from 'redux-thunk';
import { InferActionTypes, RootState } from './redaxstore';

export const actions = {
    addPost: (postText: string) => ({ type: 'ADD_POST', postText } as const),
    setUserProfile: (profile: profileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    savePhotoSuccess: (photos: photosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
    saveProfileSuccess: () => ({type: 'SAVE_PROFILE_SUCCESS'} as const),
    onEditMode: () => ({type: 'ON_EDIT_MODE'} as const),
    offEditMode: () => ({type: 'OFF_EDIT_MODE'} as const)
}

type profileReducerActionsType = InferActionTypes<typeof actions>

let profilePage = {
    posts: 
        [{ id: 1, message: 'Hello', likeCount: '1' },
        { id: 2, message: 'Hi', likeCount: '12' },
        { id: 3, message: 'Where you', likeCount: '4' },
        { id: 4, message: 'Bi', likeCount: '2' },
        { id: 5, message: 'Blue', likeCount: '53' }
        ] as Array<postsType>,
    profile: null as profileType | null,
    status: "" as string,
    postText: "" as string 
}

export type profilePageType = typeof profilePage

const profileReducer = (state = profilePage, action: profileReducerActionsType): profilePageType => {
    switch (action.type) {
        case 'ADD_POST': return {
            ...state,
            posts: [...state.posts, { id: 5, message: action.postText, likeCount: '53' }],
        }
        case 'SET_USER_PROFILE': return {
            ...state, 
            profile: action.profile
        }
        case 'SET_STATUS': return {
            ...state, 
            status: action.status
        }
        case 'SAVE_PHOTO_SUCCESS': return {
            ...state,
            profile: {...state.profile, photos: action.photos} as profileType
        }
        case 'SAVE_PROFILE_SUCCESS': return {
            ...state,
            profile: {...state.profile} as profileType
        }
        default: return state
    }
}

export const setUserProfileThunk = (userId: number):
ThunkAction<Promise<void>, RootState, unknown, profileReducerActionsType> => {
    return async (dispatch) => {
        let response = await profileAPI.userProfile(userId)
        dispatch(actions.setUserProfile(response))
    }
}
export const getStatusThunk = (userId: number): 
ThunkAction<Promise<void>, RootState, unknown, profileReducerActionsType> => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(response))
    }
}
export const updateStatusThunk = (newStatus: string): 
ThunkAction<Promise<void>, RootState, unknown, profileReducerActionsType> => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(newStatus)
        if (response.resultCode === 0) {
            dispatch(actions.setStatus(newStatus))
        }
    }
}
export const setPhotoThunk = (photo: File): 
ThunkAction<Promise<void>, RootState, unknown, profileReducerActionsType> => {
    return async (dispatch) => {
        let response = await profileAPI.saveProfilePhoto(photo)
        debugger
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.savePhotoSuccess(response.data.photos))
        }
    }
}
export const setProfileUpdateThunk = (profileData: profileType): 
ThunkAction<Promise<void>, RootState, unknown, profileReducerActionsType> => {
    return async (dispatch) => {
        let response = await profileAPI.updateProfileData(profileData)
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.saveProfileSuccess())
        } else if (response.resultCode === ResultCodesEnum.Error){
            dispatch(stopSubmit("profileForm", {_error: response.messages[0]}));
            return Promise.reject(response.messages[0])
        }
    }
}

export default profileReducer