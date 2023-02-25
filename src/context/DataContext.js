import { createContext } from "react";
import { useState, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [editTitle, setEditTitle] = useState('');
    const [ editBody, setEditBody ] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const { width } = useWindowSize();

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResult = posts.filter((post) => (post.body.toLowerCase()).includes(search.toLowerCase())
            || (post.title.toLowerCase().includes(search.toLowerCase())));

        setSearchResults(filteredResult.reverse());
    }, [posts, search]);

    return (
        <DataContext.Provider value={{
            width, search, setSearch, posts, fetchError, isLoading, setPosts, postTitle, setPostTitle, postBody, 
            setPostBody, searchResults, setSearchResults, editTitle, editBody, setEditBody, setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext