import React, {FC} from 'react'
import { profileType } from '../../../types.ts/types';
import classes from './ProfileInfo.module.scss';

type PropsType = {
  profile: profileType, 
  owner: () => boolean, 
  onEditMode: () => void
}

const ProfileReadMode: FC<PropsType> = ({profile, owner, onEditMode}) => {
  return (
    <div className={classes.profileInfo}>
      <div>
          <span className={classes.profileInfoTitle}>Main information</span>
          {owner() && <label htmlFor='profileEditButton' className={classes.profileInfoEdit}>Edit</label>}
          {owner() && <button onClick={onEditMode} id='profileEditButton' className={classes.profileInfoButton}>EditMode</button>}
      </div>
      <div>{profile.fullName}</div>
      <div>{`User ID: ${profile.userId}`}</div>
      <div>{`Обо мне: ${!!profile.aboutMe ? profile.aboutMe : 'Не указано'}`}</div>
      <div>{`Ищу работу: ${profile.lookingForAJob ? 'yes' : 'no'}`}</div>
      {profile.lookingForAJob ? <div>{`Мои профессиональные навыки: ${profile.lookingForAJobDescription}`}</div> : null}
      <div>{`Контакты: `}</div>
      <div className={classes.profileInfoContact}>
        {Object.entries(profile.contacts).map(item => {
          const value = (
            !!item[1] 
            && <div key={item[0]}>{`${item[0]} : ${item[1]}`}</div>
          )
          return value
        })}
      </div>
    </div>
  );
}

export default ProfileReadMode;