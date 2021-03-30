import { profileType, oneUserType } from './../types.ts/types';
import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "109ee755-2793-4679-9f30-299f9cb84e2d"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/",

})
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

type getUsersType = {
    items: Array<oneUserType>
    totalCount: number
    error: string | null
}
type delOrAddUserType = {
    resultCode: number
    messages: Array<string>,
    data: {}
}
export const usersAPI = {
    getUsers (currentPage: number, pageSize: number) {
        return (instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {return response.data}))
    },
    delUser (id: number) {
        return (instance.delete<delOrAddUserType>(`follow/${id}`)
        .then(response => {return response.data.resultCode}))
    },
    addUser (id: number) {
        return (instance.post<delOrAddUserType>(`follow/${id}`)
        .then(response => {return response.data.resultCode}))
    }
}

type updateStatusType = {
    resultCode: number
    messages: Array<string>,
    data: {}
}
type updateProfileDataType = updateStatusType
type saveProfilePhotoType = {
    data: {photos: {large: string, small: string}}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

export const profileAPI = {
    userProfile (userId: number) {
        return (instance.get<profileType>(`profile/${userId}`)
        .then(response => {return response.data}))
    },
    getStatus (userId: number) {
        return (instance.get<string>(`profile/status/${userId}`)
        .then(response => {return response.data}))
    },
    updateStatus (newStatus: string) {
        return (instance.put<updateStatusType>('profile/status', {status: newStatus})
        .then(response => {return response.data}))
    },
    updateProfileData (profileData: profileType) {
        return (instance.put<updateProfileDataType>('profile', profileData)
        .then(response => {return response.data}))
    },
    saveProfilePhoto (photo: File) {
        debugger
        let formData = new FormData();
        formData.append('image', photo)
        return (instance.put<saveProfilePhotoType>('profile/photo', formData, {headers: {"Content-Type" : 'multipart/form-data'}})
        .then(response => {return response.data}))
    }
}

export enum ResultCodeForCaptha {
    CaptchaIsRequired = 10
}
type userAuthType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type loginType = {
    resultCode: ResultCodesEnum | ResultCodeForCaptha
    messages: Array<string>
    data: {userId: number}
}
type deleteType = {
    resultCode: number
    messages: Array<string>,
    data: {}
}
type getCaptchaUrlType = {
    url: string
}
export const headerAPI = {
    userAuth () {
        return (instance.get<userAuthType>('auth/me')
        .then(response => {return response.data}));
    },
    login (email: string, password: string, rememberMe: boolean = false, captcha: string) {
        return (instance.post<loginType>('auth/login', {email, password, rememberMe, captcha})
        .then(response => {return response.data}));
    },
    logout () {
        return (instance.delete<deleteType>('auth/login')
        .then(response => {return response.data}));
    },
    getCaptchaUrl () {
        return (instance.get<getCaptchaUrlType>('security/get-captcha-url')
        .then(response => {return response.data}));
    }
}
