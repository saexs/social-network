import {applyMiddleware, combineReducers, createStore, compose } from 'redux'
import messageReducer from './messageReducer'
import profileReducer from './profileReducer'
import usersReducer from './usersReducer'
import authReducer from './authreducer'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './appReducer'

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messageReducer,
    usersPage: usersReducer,
    authReducer: authReducer,
    appReducer: appReducer,
    form: formReducer,
})

type RootReducer = typeof reducers
export type RootState = ReturnType<RootReducer>

type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : never;
export type InferActionTypes<T extends {[key:string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, 
    // sagaMiddleware
    )))
    
export default store
    
// import rootSaga from './ZTestSagas'
// import createSagaMiddleware from 'redux-saga'
// sagaMiddleware.run(rootSaga)
// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(reducers, applyMiddleware(sagaMiddleware, thunkMiddleware));