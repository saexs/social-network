import React, {FC} from 'react'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
  owner: () => boolean
  error: string
}

const Profile: FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo error={props.error} owner={props.owner} 
      />
      <MyPosts />
    </div>
  );
}

export default Profile;