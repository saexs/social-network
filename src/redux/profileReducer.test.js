import profileReducer, { addPost } from './profileReducer'
import ReactDOM from 'react-dom'
import App from './../App'
import React from 'react'

let profilePage = {
    posts: [{ id: 1, message: 'Hello', likeCount: '1' },
    { id: 2, message: 'Hi', likeCount: '12' },
    { id: 3, message: 'Where you', likeCount: '4' },
    { id: 4, message: 'Bi', likeCount: '2' },
    { id: 5, message: 'Blue', likeCount: '53' }],
};

it('new post should be added', () => {
    let action = addPost('New Post')
    
    let newState = profileReducer(profilePage, action)

    expect(newState.posts.length).toBe(6);
})

it('message correct', () => {
    let action = addPost('New Post')
    
    let newState = profileReducer(profilePage, action)

    expect(newState.posts[5].message).toBe('New Post');
})