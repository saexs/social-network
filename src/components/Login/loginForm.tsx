import React, {FC} from 'react'
import { useSelector } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { RootState } from '../../redux/redaxstore'
import { requiredField } from '../../redux/utils/validators/validators'
import { createField, Input } from '../Common/FormControls/FormsControls'
import classes from './../Common/FormControls/FormsControls.module.css'
import {formDataType} from './login'

const LoginForm: FC<InjectedFormProps<formDataType>> = ({handleSubmit, error}) => {

    const captchaUrl = useSelector((state: RootState): string | null => state.authReducer.captchaUrl)

    return (
        <form onSubmit={handleSubmit}>
            {createField("email", "email", Input, [requiredField])}
            {createField("password", "password", Input, [requiredField], {type: "password"})}
            {createField('', "rememberMe", Input, [], {type: "checkbox"}, 'Remember Me')}
            {captchaUrl && <img alt="no img" src={captchaUrl}></img>}
            {captchaUrl && createField("enter symbols", "captcha", Input, [requiredField])}
            {error 
                && <div className={classes.commonError}> {
                    error }
                </div>
            }
            <div>
                <button>LOGIN</button>
            </div>
        </form>
    )
}

const ReduxLoginForm = reduxForm<formDataType>({form: 'login'})(LoginForm)

export default ReduxLoginForm;