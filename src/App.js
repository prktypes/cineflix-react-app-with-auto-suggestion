import './index.css'
import {useState,useEffect} from 'react'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=1c85eac7';

function App(){

    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    const [suggestions,setSuggestions] = useState([]);
    const handleKeyPress = (event) => {
        if(event.key==='Enter'){
            searchMovie(searchTerm);
        }
    }

    const fetchSuggestions = async(query) => {
        if(query.length > 2){
            const response = await fetch(`${API_URL}&s=${query}`);
            const data = await response.json();
            setSuggestions(data.Search || []);
        }
        else{
            setSuggestions([]);
        }
    }

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovie('Batman');
    },[])

    return (
        <div className='app'>
            <h1>CineFlix</h1>
            <div className='search'>
                <input
                    placeholder='Search for Movies'
                    value={searchTerm}
                    onChange={(e)=> {setSearchTerm(e.target.value);
                    fetchSuggestions(e.target.value);
                }}
                    onKeyDown={handleKeyPress}
                />
                <img
                    src={SearchIcon}
                    onClick={()=>searchMovie(searchTerm)}
                />
            </div>
            <div className='suggestions'>
                {suggestions.length > 0 && (
                    <ul className='suggestions'>
                        {suggestions.map((movie) => (
                            <li
                                key={movie.imdbID}
                                onClick={() => {
                                    setSearchTerm(movie.Title);
                                    setSuggestions([]);
                                    searchMovie(movie.Title);
                                }}
                            >
                                {movie.Title} ({movie.Year})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {
                movies?.length > 0
                    ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                </div>
                ) : (
                    <div className='empty'>
                        <h2>No Movies Found</h2>
                    </div>
                )
            }
            
        </div>
    );
}

export default App;