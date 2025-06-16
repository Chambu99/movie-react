import React from 'react';


const MovieCard = ({ movie }) => {
    console.log('Movie:', movie);

  const { title, poster_path, release_date } = movie;

  // Fallback image if poster is missing
  const posterURL = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="movie-card">
      <img
        src={posterURL}
        alt={movie.title}
        
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="text-white">{title}</h3>
        {release_date && (
          <p className="text-white text-sm">
            {new Date(release_date).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
