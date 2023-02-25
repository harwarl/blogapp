import React, { useContext } from 'react';
import { format } from 'date-fns';
import { useParams, Link, useNavigate} from 'react-router-dom';
import api from './api/posts';
import { useEffect } from 'react';
import DataContext from './context/DataContext';


const EditPost = () => {
    const {posts, editTitle, editBody, setPosts, setEditBody, setEditTitle} = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find(post => (post.id).toString() === id)

    const handleEdit = async(id) =>{
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id: id, title: editTitle, datetime: datetime, body: editBody };
        try{
          const response = await api.put(`/posts/${id}`, updatedPost)
          setPosts(posts.map((post)=>post.id === id ? {...response.data} : post))
          setEditTitle('');
          setEditBody('');
          navigate('/')
        }catch(err){
          console.log(`Error: ${err.message}`);
        }
      }

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form
                        className="newPostForm"
                        onSubmit={(e)=>e.preventDefault()}
                    >
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            type="text"
                            id="postTitle"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)} />

                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            type="text"
                            required
                            id='postBody'
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)} />
                        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle && 
            <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit Our HomePage</Link>
            </p>
            </>}
        </main>
    )
}

export default EditPost