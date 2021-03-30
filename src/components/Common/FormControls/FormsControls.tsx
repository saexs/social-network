import React, {FC} from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { fieldValidatorType } from '../../../redux/utils/validators/validators';
import classes from './FormsControls.module.css'

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    const hasError = !!(meta.touched && meta.error)
    return (
        <div className={classes.bord + ' ' + (hasError ? classes.error : '')}>
            <textarea {...meta} {...input} {...restProps}/>
            {hasError ? <span>{meta.error}</span> : undefined}
        </div>)
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    const hasError = !!(meta.touched && meta.error)
    return (
        <div className={classes.bord + ' ' + (hasError ? classes.error : '')}>
            <input {...meta} {...input} {...restProps}/>
            {hasError ? <span>{meta.error}</span> : undefined}
        </div>)
}

export const createField = (placeholder: string, 
                        name: string, 
                        component: string | FC<WrappedFieldProps>, 
                        validators: Array<fieldValidatorType>, 
                        props = {}, 
                        text = '') => {
    return <div>
                <Field placeholder={placeholder} name={name} component={component} 
                validate={validators}
                {...props}/> {text}
    </div>
}