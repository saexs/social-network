import React, {FC} from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
// import { maxLengthCreator, requiredField } from '../../../../redux/utils/validators/validators'
import { Textarea } from '../../../Common/FormControls/FormsControls'
import classes from './postForm.module.scss'

type PropsType = {
    onSubmit: (e: any) => void
}

export const MyPostForm: FC<PropsType> = ({onSubmit}) => {
    return (
        <div>
            <ReduxPostForm onSubmit={onSubmit}/>
        </div>
    )
}

// const maxLength10 = maxLengthCreator(10);

const PostForm: FC<InjectedFormProps<string>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div>
                <Field placeholder={"Your post text"} name={'postText'} component={Textarea}
                maxLength={300} className={classes.formText} rows={6} cols={80}></Field>
            </div>
            <div>
                <button id='addPostButton' className={classes.formButton}>Add post</button>
                <label htmlFor='addPostButton' className={classes.formLabel}>
                    <span className={classes.formLabelText}>
                        Add New Post
                    </span>
                </label>
            </div>
        </form>
    )
}

const ReduxPostForm = reduxForm<string>({
    form: 'postText', 
})(PostForm)

