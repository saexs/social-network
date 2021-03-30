import React, { useState, FC } from 'react'
import Loader from '../../../Preloader/Loader';
import ProfileEditMode from './ProfileEditMode';
import classes from './ProfileInfo.module.scss';
import ProfileReadMode from './ProfileReadMode';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useSelector, useDispatch } from 'react-redux'
import { setPhotoThunk } from '../../../redux/profileReducer';
import { RootState } from '../../../redux/redaxstore';
import { profileType } from '../../../types.ts/types';
import Button from '@material-ui/core/Button';

type PropsType = {
  owner: () => boolean
  error: string
}

const ProfileInfo: FC<PropsType> = (props) => {

  const dispatch = useDispatch()

  const profile = useSelector((state: RootState):profileType | null => state.profilePage.profile)

  const [editMode, setEditMode] = useState(false)
  const onEditMode = (): void => {
    setEditMode(true)
  }
  const offEditMode = (): void => {
    setEditMode(false)
  }

  if (!profile) {
    return <Loader/>
  }

  const savePhoto = (e: any) => {
    dispatch(setPhotoThunk(e.currentTarget.files[0]))
  }
  return (
      <div className={classes.description}>
        <div>
          <img className={classes.userImg} alt="no img" src={profile.photos.large || "https://wgsi.utoronto.ca/wp-content/uploads/2020/12/blank-profile-picture-png.png"} />
          {(props.owner()) 
          ? [<input onChange={savePhoto} type='file' accept='image/*' id='avatar' className={classes.userImgInput}></input>,
            <label htmlFor='avatar' className={classes.userImgLabel}>
              <Button variant="contained" color="primary" component="span" className={classes.userImgLabelButton}>
                Upload
              </Button>
            </label>]
          
          : undefined
          }
        </div>
        <div>
          <div className={classes.userNameAboveStatus}>{profile.fullName}</div>
          <ProfileStatusWithHooks owner={props.owner}/>
          {!editMode 
            ? <ProfileReadMode onEditMode={onEditMode} owner={props.owner} profile={profile}/> 
            : <ProfileEditMode error={props.error} offEditMode={offEditMode} initialValues={profile} profile={profile}/>
          }
        </div>
      </div>
  );
}

export default ProfileInfo;