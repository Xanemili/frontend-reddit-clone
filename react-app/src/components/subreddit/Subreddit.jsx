import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Post from './Post'
import PostKarma from '../karma/PostKarma.jsx'
import CreateContent from '../sidebar/CreateContent'


const Subreddit = ({subscriptions}) => {

  const [subreddit, setSubreddit] = useState({rules:""})
  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [postErrors, setPostErrors] = useState('')
  const { subredditName } = useParams();
  const [loading, setloading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      const subredditResponse = await fetch(`/api/subreddits/r/${subredditName}`)
      const subreddit = await subredditResponse.json();

      const postResponse = await fetch(`/api/posts/r/${subredditName}`)
      const posts = await postResponse.json();

      if(!subreddit.errors && mounted &&!posts.errors) {
        setloading(false)
        setSubreddit(subreddit.subreddit);
        setPosts(posts.posts)
      } else if (mounted && !subreddit.errors) {
        setErrors(subreddit.errors);
      }
    };

    fetchData();
    console.log(subscriptions, subredditName)
    console.log(subscriptions.indexOf(subredditName))
    if (subscriptions.indexOf(subredditName) !== -1){
      setSubscribed(true);
    }

    return () => {
      mounted = false
    }
  }, [subredditName, setSubreddit])

  const toggleSubscription = async (e) => {
    e.preventDefault()
    let method = 'POST'
    if (subscribed) {
      method = 'DELETE'
    }
    let response = await fetch(`/api/users/subscriptions`, {
      method,
      headers: {'Content-Type': 'application/json'}
    })
    let subscribe = await response.json()
    // console.log(subscribe)
    if (!subscribe.errors){
      setSubscribed(!subscribed)
    }
  }

  const postComponents = posts.map((post) => {
    return (
      <Link key={post.id} className='landing__posts__container'>
        <PostKarma id={post.id} />
        <Post id={post.id} username={post.user.username} subreddit={post.subreddit.name} created_on={post.created_on} title={post.title} type={post.type} content={post.content}/>
      </Link>
    );
  })

  return (
    <div> {loading ? <div>loading</div> :
      <>
        <div className=''>
          <div>{subreddit.name}</div>
          <div>/r/{subreddit.name}</div>
          <button className='button-primary' onClick={toggleSubscription}>
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
        </div>
      <CreateContent name={subreddit.name} about={subreddit.about} created={subreddit.created_on} rules={subreddit.rules} />
      <div id='container'>
        {errors ? <div>{errors}</div> : ''}
        {console.log(errors)}
        <ul>{postComponents}</ul>
      </div>
      </>
    }
    </div>
  )
}

export default Subreddit;
