import React, { useState, useEffect } from "react";
import {useParams, Link,} from "react-router-dom";
import UserSidebar from './sidebar/UserSidebar'
import Post from './subreddit/Post'
import PostKarma from './karma/PostKarma.jsx'

// Use createContent sidebar instead of Sidebar component to load the sidebar

function User({ id }) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([])
  const [karma, setKarma] = useState(0)
  const [display, setDisplay] = useState('')
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();
  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const userResponse = await response.json();
      // console.log(user)
      setUser(userResponse);
      // Sets the posts after fetching all posts that belong to a user.
      // Must be done seperate from the user response to add the subreddit names on the returned object
      const postResponse = await fetch(`/api/posts/user/${userId}`)
      const postRes = await postResponse.json()
      setPosts(postRes.posts);
    })();
  }, [userId]);

  // Once posts are populated, loop through each post and add up the karma.
  useEffect(() => {
    if(!posts){
      return
    }

    let num = karma
    for (let post of posts){
      num += Number(post.karma)
    }
    setKarma(num)
  }, [posts])

  const setPostDisplay = () => {
    setDisplay('post')
  }

  const setCommentsDisplay = () => {
    // console.log(posts)
    setDisplay('comments')
  }

  // const goToPost = (subreddit, postId) => {
  //   console.log('working')
  //   return <Redirect to={`/r/${subreddit}/post/${postId}`}/>
  // }


  if (!user) {
    return null;
  }

  const postComponents = posts.map((post) => {
    // console.log('post', post)

    return (
      <Link to={`/r/${post.subreddit.name}/post/${post.id}`} key={post.id} className='landing__posts__container'>
        <PostKarma id={post.id} />
        <Post id={post.id} username={user.username} subreddit={post.subreddit.name} created_on={post.created_on} title={post.title} type={post.type} content={post.content}/>
      </Link>
    );
  })

  // if(display === 'comments'){
  //   return(
  //     <div>
  //       <button onClick={setPostDisplay}>Posts</button>
  //       <button onClick={setCommentsDisplay}>Comments</button>
  //       <UserSidebar name={user.username} created={user.created_at} karma={karma} />
  //       <div>
  //         u/{user.username}'s Comments
  //       </div>
  //       <div id='container'>
  //         Comments Here
  //       </div>
  //     </div>
  //   )
  // }


  return (
    <div>
      {/* <button onClick={setPostDisplay}>Posts</button> */}
      {/* <button onClick={setCommentsDisplay}>Comments</button> */}
      <div className='user-page__header'>
        u/{user.username}'s Posts
      </div>
      <div id='container'>
        <ul>{postComponents}</ul>
        <UserSidebar className="user-sidebar" name={user.username} created={user.created_at} karma={karma} />
      </div>
    </div>
  );

}
export default User;
