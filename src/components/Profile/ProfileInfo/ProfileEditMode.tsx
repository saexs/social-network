import React, {FC} from 'react'
import { reduxForm } from 'redux-form';
import { requiredField } from '../../../redux/utils/validators/validators';
import { createField, Input } from '../../Common/FormControls/FormsControls';
import classes from './ProfileInfo.module.scss';
import { useDispatch } from 'react-redux'
import { setProfileUpdateThunk } from '../../../redux/profileReducer';
import { profileType } from '../../../types.ts/types';

type PropsType = {
  error: string,
  initialValues: any,
  profile: profileType,
  offEditMode: () => void
}

const ProfileEditMode: FC<PropsType> = ({error, initialValues, profile, offEditMode}) => {

  const dispatch = useDispatch()

  const onSubmit = (profileData: any) => {
    //@ts-ignore
    dispatch(setProfileUpdateThunk(profileData)).then(
      () => {
        offEditMode()
      }
    )
  }

  return (
    //@ts-ignore
    <ReduxProfileForm error={error} initialValues={initialValues} profile={profile} onSubmit={onSubmit}
     />
  );
}

type PropsType_2 = {
  error: string,
  profile: profileType,
  handleSubmit: () => void
}

const ProfileEditModeForm: FC<PropsType_2> = ({error, profile, handleSubmit}) => {
  
  return (
    <form onSubmit={handleSubmit}>
      {error 
                && <div > {
                    error }
                </div>
      }
      <button>Отправить</button>
      <div>
        <b>Full Name</b> {createField('Full Name', 'fullName', Input, [requiredField], {})}
      </div>
      <div>
        <b>About Me</b> {createField('About Me', 'aboutMe', Input, [], {})}
      </div>
      <div>
        <b>Looking For A Job</b> {createField('', 'lookingForAJob', Input, [], { type: "checkbox" })}
      </div>
      <div>
        <b>My professional skills</b> {createField('My skills', 'lookingForAJobDescription', Input, [], {})}
      </div>
      <div>{`Контакты: `}</div>
      <div>
        {Object.entries(profile.contacts).map(item => {
          return (<div key={item[0]} className={classes.contact}>
              <b>{item[0] + ':'}</b>
              {createField(item[0], 'contacts.' + item[0], Input, [], {})}
            </div>)
        })}
      </div>
    </form>
  );
}

const ReduxProfileForm = reduxForm({
  form: 'profileForm'
  //@ts-ignore
})(ProfileEditModeForm)



export default ProfileEditMode;