import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React, {FC} from 'react';
import { MyPostForm } from './postForm/postForm';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../../redux/redaxstore'
import { postsType } from '../../../types.ts/types';
import { actions } from './../../../redux/profileReducer';


type PropsType = {}

const MyPosts: FC<PropsType> = () => {

  const posts = useSelector((state: RootState):Array<postsType> => {return state.profilePage.posts})

  const dispatch = useDispatch()

  let addNewTextPost = (e: any): void => {
    dispatch(actions.addPost(e.postText))
    e.postText = '';
  };

  let postElements = posts.map((item) => {
    return (<Post key={item.id} message={item.message} like={item.likeCount}/>);
  });

  return (
    <div className={classes.posts}>
      <h3 className={classes.postsTitle}> My posts </h3>
      <div>
        <MyPostForm onSubmit={addNewTextPost}/>
      </div>
      <div>
        {postElements}
      </div>
    </div>
  );
}

export default MyPosts;