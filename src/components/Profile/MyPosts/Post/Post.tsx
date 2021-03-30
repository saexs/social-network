import React, {FC} from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/redaxstore';
import { profileType } from '../../../../types.ts/types';
import classes from './Post.module.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';



type PropsType = {
  message: string
  like: string
}

const Post: FC<PropsType> = ({message, like}) => {
  const profile = useSelector((state: RootState):profileType | null => state.profilePage.profile)
  if (!profile) {
    return <div></div>
  }
  let postImage = profile.photos.large;
  if(!profile.photos.large) {
    postImage = "https://wgsi.utoronto.ca/wp-content/uploads/2020/12/blank-profile-picture-png.png"
  }

  return (
    <div className={classes.item}>
      <img className={classes.itemImg} src={`${postImage}`} alt="no img"></img>
      <div className={classes.itemInner}>
        <div className={classes.itemInnerMessage}>{message}</div>
        <div className={classes.itemInnerLike}>
          <div className={classes.itemInnerLikeIcon}><FavoriteIcon/></div>
          <div className={classes.itemInnerLikeText}>{like}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;