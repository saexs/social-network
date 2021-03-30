import React, {useEffect, useState, FC, ChangeEvent} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { updateStatusThunk } from '../../../redux/profileReducer';
import { RootState } from '../../../redux/redaxstore';
import classes from './ProfileInfo.module.scss';

type PropsType = {
  owner: () => boolean
}

const ProfileStatus: FC<PropsType> = React.memo(({owner}) => {
  const dispatch = useDispatch();

  const statusFromServer = useSelector((state: RootState): string => state.profilePage.status, shallowEqual)

  let [editMode, setEditMode] = useState<boolean>(false)
  let [status, setStatus] = useState<string>(statusFromServer)

  useEffect( () => {
    setStatus(statusFromServer)
  }, [statusFromServer])

  const onEditMode = () => {
    setEditMode(true);
  } 

  const offEditMode = () => {
    setEditMode(false);
    dispatch(updateStatusThunk(status))
  } 

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div className={classes.status}>
      {owner() ? (!editMode &&
        <div>
          <span className={classes.statusSpan} onDoubleClick={onEditMode}>{statusFromServer || 'No status'}</span>
        </div>) : (<span className={classes.statusSpan}>{statusFromServer || 'No status'}</span>)
      }
      {editMode &&
        <div>
          <input className={classes.statusInput} autoFocus={true} value={status}
          onBlur={offEditMode} onChange={onStatusChange} maxLength={60}
          ></input>
        </div>
      } 
    </div>
  );

})

export default ProfileStatus;