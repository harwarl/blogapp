import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
// import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts'
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  const [ searchResults, setSearchResults ] = useState([]);
  const [ postTitle, setPostTitle ] = useState('');
  const [ postBody, setPostBody ] = useState('');
  // const [editTitle, setEditTitle] = useState('');
  // const [ editBody, setEditBody ] = useState('');
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts'); 

  useEffect(()=>{
    setPosts(data);
  }, [data])

  useEffect(()=>{
    const fetchPosts = async() =>{
      try{
        const response = await api.get('/posts');
        if(response && response.data) setPosts(response.data);
      }catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`Error: ${err.message}`)
        }

      }
    }

    fetchPosts();
  }, [])

  
  useEffect(()=>{
    const filteredResult = posts.filter((post)=>(post.body.toLowerCase()).includes(search.toLowerCase()) 
    || (post.title.toLowerCase().includes(search.toLowerCase())));

    setSearchResults(filteredResult.reverse());
  }, [posts, search]);

  return (
    <Router>
      <div className="App">
        <Header
          title={'React Js Blog'}
          width={ width }
        />
        <Nav 
        search={search}
        setSearch={setSearch}
        />
        <Routes>
          <Route path='/' element={<Home 
          posts={searchResults}
          fetchError={fetchError}
          isLoading={isLoading}
          />} />
          <Route path='/post' element={<NewPost 
          posts={posts}
          setPosts={setPosts}
          format={format}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          />} />
          <Route path='/post/:id' element={<PostPage
          posts={posts}
          setPosts={setPosts}
          />} />
          {/* <Route path='/edit/:id' element={<EditPost 
          posts={posts}
          editTitle={editTitle}
          editBody={editBody}
          setPosts={setPosts}
          setEditBody={setEditBody}
          setEditTitle={setEditTitle}
          />} /> */}
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
