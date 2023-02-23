import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PostPage = ({ posts, setPosts}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  
  const navigate = useNavigate();
  
  const handleDelete = (id) =>{
    const postLeft = posts.filter((post)=>(post.id !== id))
    setPosts(postLeft);
    navigate('/');
  }

  return (
    <main>
      {post &&
        <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <button
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