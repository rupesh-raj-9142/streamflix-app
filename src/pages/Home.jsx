import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Product from '../components/Product.jsx'

const apiKey = import.meta.env.VITE_OMDB_API_KEY || ''
const defaultQuery = 'Spider-Man'

async function fetchMovies(query) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`,
  )
  const data = await response.json()
  if (data.Response === 'True') {
    return data.Search
  }
  throw new Error(data.Error || 'Unable to fetch movies.')
}

async function fetchMovieDetail(id) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`,
  )
  const data = await response.json()
  if (data.Response === 'True') {
    return data
  }
  throw new Error(data.Error || 'Unable to fetch movie details.')
}

function Home() {
  const [query, setQuery] = useState(defaultQuery)
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!apiKey) {
      setError('Please set VITE_OMDB_API_KEY in .env.')
      return
    }

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const results = await fetchMovies(defaultQuery)
        setMovies(results)
      } catch (err) {
        setError(err.message || 'Failed to load movies.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleSearch = async (event) => {
    event.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError('')
    setSelectedMovie(null)

    try {
      const results = await fetchMovies(query)
      setMovies(results)
    } catch (err) {
      setMovies([])
      setError(err.message || 'No results found.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = async (id) => {
    setLoading(true)
    setError('')

    try {
      const movie = await fetchMovieDetail(id)
      setSelectedMovie(movie)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message || 'Unable to load details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      <Navbar />

      <section className="hero-panel">
        <div>
          <p className="hero-badge">Professional Movie Search</p>
          <h2>Discover films with instant results and clean details.</h2>
          <p className="hero-copy">
            Search movies by title, browse poster cards, and click any result for a full detail view.
          </p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <label htmlFor="movie-search">Movie title</label>
          <div className="search-input-group">
            <input
              id="movie-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a film name and press search"
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </section>

      <section className="results-panel">
        <div className="results-header">
          <h3>Search results</h3>
          <span>{movies.length} movie{movies.length === 1 ? '' : 's'}</span>
        </div>

        {error && <div className="status-message status-error">{error}</div>}

        {loading && !error ? (
          <div className="movie-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="movie-card movie-card--skeleton">
                <div className="skeleton-block skeleton-block--image" />
                <div className="movie-card__content">
                  <div className="skeleton-block skeleton-block--title" />
                  <div className="skeleton-block skeleton-block--text" />
                  <div className="skeleton-block skeleton-block--pill" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <>
            {!loading && movies.length === 0 && !error && (
              <div className="empty-state">
                <p className="empty-state__title">No movies found yet</p>
                <p className="empty-state__copy">
                  Try a different title or use a popular search phrase like ‘Inception’, ‘Avengers’, or ‘Harry Potter’.
                </p>
              </div>
            )}

            <div className="movie-grid">
              {movies.map((movie) => (
                <Product key={movie.imdbID} movie={movie} onSelect={handleSelect} />
              ))}
            </div>
          </>
        )}
      </section>

      {selectedMovie && (
        <section className="detail-panel">
          <div className="detail-card">
            <img
              className="detail-card__image"
              src={
                selectedMovie.Poster && selectedMovie.Poster !== 'N/A'
                  ? selectedMovie.Poster
                  : 'https://via.placeholder.com/320x470/1f2937/ffffff?text=No+Poster'
              }
              alt={selectedMovie.Title}
            />
          </div>

          <div className="detail-summary">
            <p className="detail-tag">Movie details</p>
            <h3>{selectedMovie.Title}</h3>
            <p className="detail-meta">
              {selectedMovie.Year} · {selectedMovie.Runtime} · {selectedMovie.Genre}
            </p>
            <p className="detail-description">{selectedMovie.Plot}</p>

            <div className="detail-grid">
              <div>
                <strong>Director</strong>
                <p>{selectedMovie.Director}</p>
              </div>
              <div>
                <strong>Actors</strong>
                <p>{selectedMovie.Actors}</p>
              </div>
              <div>
                <strong>IMDB Rating</strong>
                <p>{selectedMovie.imdbRating}</p>
              </div>
            </div>

            <button className="detail-close" onClick={() => setSelectedMovie(null)}>
              Close details
            </button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default Home
