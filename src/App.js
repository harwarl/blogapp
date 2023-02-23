import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'lorem ipsum yugsit dolor js jsj jskj'
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'lorem ipsum yugsit dolor js jsj jskj'
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'lorem ipsum yugsit dolor js jsj jskj'
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'lorem ipsum yugsit dolor js jsj jskj'
    },
    {
      id: 5,
      title: "My Fifth Post",
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'lorem ipsum yugsit dolor js jsj jskj'
    },
  ])

  const [ searchResults, setSearchResults ] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [ postBody, setPostBody ] = useState('');

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
        />
        <Nav 
        search={search}
        setSearch={setSearch}
        />
        <Routes>
          <Route path='/' element={<Home posts={searchResults.reverse()}/>} />
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
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
