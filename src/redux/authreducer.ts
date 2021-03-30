import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { headerAPI, ResultCodesEnum, ResultCodeForCaptha } from "../api/api";
import { RootState } from "./redaxstore";

const SET_USER_AUTH = 'SET_USER_AUTH';
const SET_CUPTCHA = 'SET_CUPTCHA';

type setUserAuthType = {
    type: typeof SET_USER_AUTH
    payload: setUserAuthTypePayloadType

}
export const setUserAuth = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setUserAuthType => {
    return (
        { type: SET_USER_AUTH, payload: {userId, email, login, isAuth} }
    );
};

type setCaptchaType = {
    type: typeof SET_CUPTCHA
    payload: {captchaUrl: string}
}
export const setCaptcha = (captchaUrl: string): setCaptchaType => {
    return (
        { type: SET_CUPTCHA, payload: {captchaUrl} }
    );
};

type authReducerActionsType = setUserAuthType | setCaptchaType

export type initialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
let auth: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = auth, action: authReducerActionsType): initialStateType => {
    if (action.type === SET_USER_AUTH) {
        return {
            ...state,
            ...action.payload,
        };
    } else if (action.type === SET_CUPTCHA) {
        return {
            ...state,
            ...action.payload,
        };
    }
    return state;
};

type setUserAuthTypePayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}


export const authUserThunk = (): 
ThunkAction<Promise<void>, RootState, unknown, authReducerActionsType> => {
    return async (dispatch) => {
        let response = await headerAPI.userAuth()
        if (response.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = response.data;
            dispatch(setUserAuth(id, email, login, true))
        }
    }
}

export const getCaptchaUrl = (): 
ThunkAction<Promise<void>, RootState, unknown, authReducerActionsType> => {
    return async (dispatch) => {
        let response = await headerAPI.getCaptchaUrl()
        const captchaUrl = response.url;
        dispatch(setCaptcha(captchaUrl))
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): 
ThunkAction<Promise<void>, RootState, unknown, authReducerActionsType> => {
    return async (dispatch) => {
        let response = await headerAPI.login(email, password, rememberMe, captcha)
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(authUserThunk())
        } else {
            if (response.resultCode === ResultCodeForCaptha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            //@ts-ignore
            dispatch(stopSubmit('login', {_error: response.messages[0] || 'error'}));
        }
    }
}

export const logoutThunkCreator = (): 
ThunkAction<Promise<void>, RootState, unknown, authReducerActionsType> => {
    return async (dispatch) => {
        let response = await headerAPI.logout()
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserAuth(null, null, null, false))
        }
    }
}

export default authReducer;