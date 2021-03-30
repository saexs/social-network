import React, {FC} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginThunkCreator } from '../../redux/authreducer'
import { RootState } from '../../redux/redaxstore'
import ReduxLoginForm from './loginForm'

type PropsType = {}

export type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
const Login: FC<PropsType> = (props) => {
    const dispatch = useDispatch()

    const isAuth = useSelector((state: RootState): boolean => state.authReducer.isAuth)

    const onSubmit = (formData: formDataType) => {
        dispatch(loginThunkCreator(formData.email, formData.password, 
            formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return (
            <Redirect to={'/profile'}/>
        )
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login;