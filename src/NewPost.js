import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import api from './api/posts'
import DataContext from './context/DataContext';

const NewPost = () => {
  const {posts, setPosts, postTitle, setPostTitle, postBody, setPostBody} = useContext(DataContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  //used preventdefault (error) preventDefault (works)
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id: id, title: postTitle, datetime: datetime, body: postBody };
    try{
      const response = await api.post('/posts', newPost);
      const allPosts = [ ...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    }catch(err){
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form
        className="newPostForm"
        onSubmit={handleSubmit}
      >
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)} />

        <label htmlFor="postBody">Post:</label>
        <textarea
          type="text"
          id='postBody'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost