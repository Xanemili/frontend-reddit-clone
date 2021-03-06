
export const createPost = async(subredditId, title, type, content) => {
  // The value of the subredditId being passed in will come from the select field, the value being the subreddit id, the label being the subreddit name
  const response = await fetch('/api/posts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subredditId,
      title,
      type,
      content
    })
  });
  return await response.json()
}

export const uploadImage = async (data) => {
  const res = await fetch('/api/s3/upload', {
    method: 'POST',
    body: data
  })

  return await res.json()
}

export const getPost = async(postId) => {
  const response = await fetch(`/api/posts/${postId}`)
  return await response.json()
}
