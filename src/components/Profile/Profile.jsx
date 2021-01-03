import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';

const Profile = () => {
    return (
        <div className={classes.content}>
        <div>
          <img className={`${classes.space} ${classes.picture}`} src='https://apollosat.com/wp-content/uploads/2016/06/IridiumCommunications-FeatureImage.jpg'></img>
        </div>
        <div>
          ava + description
        </div>
        <textarea></textarea>
        <button>add post</button>
        <MyPosts />
      </div>   
    );
}

export default Profile;