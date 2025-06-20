import React, {  useEffect,useState } from 'react';
import Search from './components/Search';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
console.log('API_KEY', API_KEY);

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};
// Function to fetch movies based on search term

const  App =()=>{
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]); // State to hold fetched movies
  const [loading, setIsLoading] = useState(false); // State to manage loading state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

useDebounce(
  () => {
    setDebouncedSearchTerm(searchTerm);
  },
  500,
  [searchTerm]
);

useEffect(() => {
  fetchMovies(debouncedSearchTerm);
}, [debouncedSearchTerm]);
  
// Function to fetch movies based on search term
const fetchMovies = async (query='') => {
  setIsLoading(true);
  setErrorMessage('');
  
  try {
   const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

   const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    // Here you can set the state with the fetched movies if needed
    // setMovies(data.results);
    if(data.response === 'false' || data.results.length === 0) {
      setErrorMessage( 'Failed to fetch movies. Please try again later.');
      setMovies([]);
      return;
    }
    setMovies(data.results || []);
   
    
  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage('Failed to fetch movies. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};

// Effect to fetch movies when search term changes
  
 return (
  <main>
    <div className='pattern'/>
  <div className='wrapper'>
   <header>
    <img src='./kelvin-anime.png' alt='heroesBanner' style={{width: '2rem', height: 'auto', marginTop: '0.7rem', maxWidth: '2.5rem', minWidth: '3rem', position: 'absolute', top: '0', left: '0', transform: 'translateX(25%)', zIndex: '1'}} className='heroesBanner' />
     <h1>Find <span className='text-gradient'>Movies </span> 
    You'll <br/>enjoy without the hassle</h1>
    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
   </header>
   
   <section className='all-movies'>
  <h2>All Movies</h2>
  {loading && <p>Loading...</p>}
  {errorMessage && <p className='error'>{errorMessage}</p>}
  {movies.length > 0 ? (
    <div className='movie-list'>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
          
          {/*  External Link to movieuniverse.lol */}
          <a
  href={`https://movieuniverse.lol/watch-movieuniverse-${movie.id}`}
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: 'inline-block', marginTop: '8px', color: '#AB8BFF' }}
>
  Watch now→
</a>

        </div>
      ))}
    </div>
  ) : (
    !loading && <p>No movies found.</p>
  )}
</section>

   
  </div>
  
   </main>
  
  
  

 )
}

export default App
