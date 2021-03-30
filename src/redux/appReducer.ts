import { ThunkAction } from "redux-thunk";
import { authUserThunk } from "./authreducer";
import { RootState } from "./redaxstore";

const SET_INITIALIZED = 'SET_INITIALIZED';

type initializedSuccessType = {
    type: typeof SET_INITIALIZED
}
export const initializedSuccess = (): initializedSuccessType => {
    return (
        { type: SET_INITIALIZED }
    );
};

type appReducerActionsType = initializedSuccessType

export type initialStateType = {
    initialized: boolean
}
let initialState: initialStateType = {
    initialized: false,
};


const appReducer = (state = initialState, action: appReducerActionsType): initialStateType => {
    if (action.type === SET_INITIALIZED) {
        return {
            ...state,
            initialized: true,
        };
    } 
    return state;
};


export const initializeApp = (): 
ThunkAction<Promise<void>, RootState, unknown, appReducerActionsType> => {
    return async (dispatch) => {
        await Promise.all([dispatch(authUserThunk())])
        dispatch(initializedSuccess());
    }
}

export default appReducer;