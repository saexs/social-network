import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div>
          my posts
          <div>
            <Post message='Hello' like = '1'/>
            <Post message='Hi' like = '12' />
            <Post message='Where you' like = '4' />
            <Post message='Bi' like = '2' />
            <Post message='Blue' like = '53' />
          </div>
        </div>  
    );
}

export default MyPosts;