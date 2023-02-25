import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
    
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       if (response && response.data) setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`)
  //       }

  //     }
  //   }

  //   fetchPosts();
  // }, [])

  return (
    <Router>
      <div className="App">
        <DataProvider>

          <Header title={'React Js Blog'} />
          <Nav/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/post' element={<NewPost />} />
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='/post/edit/:id' element={<EditPost />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<Missing />} />
          </Routes>
          <Footer />
        </DataProvider>
      </div>
    </Router>
  );
}

export default App;
