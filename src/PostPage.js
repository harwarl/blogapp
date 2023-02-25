import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from './api/posts'
import DataContext from './context/DataContext';

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  
  const navigate = useNavigate();
  
  const handleDelete = async(id) =>{
    try{
      await api.delete(`/posts/${id}`)
      const postLeft = posts.filter((post)=>(post.id !== id))
      setPosts(postLeft);
      navigate('/');
    }catch(err){

    }
  }

  return (
    <main>
      {post &&
        <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <Link to={`/post/edit/${post.id}`}>
            <button className='editButton'>
              Edit Post
            </button>
          </Link>
          <button
          className='deleteButton'
            onClick={() => handleDelete(post.id)}
          >
            Delete Post
          </button>
        </>
      }
      {!post &&
        <>
          <h2>Post Not found</h2>
          <p>Too bad... </p>
          <p>
            <Link to='/'>Visit our Homepage</Link>
          </p>
        </>
      }
    </main>
  )
}

export default PostPage