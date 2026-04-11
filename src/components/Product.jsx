function Product({ movie, onSelect }) {
  const poster = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/320x470/1f2937/ffffff?text=No+Poster'

  return (
    <article className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      <img className="movie-card__image" src={poster} alt={movie.Title} />
      <div className="movie-card__content">
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
        <span>{movie.Type}</span>
      </div>
    </article>
  )
}

export default Product
