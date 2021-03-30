import React, { useEffect, FC } from 'react';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfileThunk, getStatusThunk } from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { RootState } from '../../redux/redaxstore';

type PropsType = {
  match: any,
  history: any,
  error: string
}

const ProfileContainer: FC<PropsType> = (props) => {
  const dispatch = useDispatch()

  const authorizedUserId = useSelector( (state: RootState): number | null => state.authReducer.userId)
  
  const currentUserId = props.match.params.userId
  const owner = (): boolean => {
    let bool = !!(authorizedUserId && (currentUserId === undefined || currentUserId === authorizedUserId))
    return (bool)
  }

  useEffect(() => {
    let userId = props.match.params.userId;
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        props.history.push('/login');
      }
    }
    dispatch(setUserProfileThunk(userId));
    dispatch(getStatusThunk(userId));
  }, [props, authorizedUserId, dispatch])
  
  return (
    <div>
      <Profile {...props} error={props.error} owner={owner} 
      />
    </div>
  )
}

export default compose(
  withRouter,
  //@ts-ignore
)(ProfileContainer)
