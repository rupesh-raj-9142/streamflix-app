function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__badge">🎬</div>
        <div>
          <p className="navbar__eyebrow">StreamFlix</p>
          <h1 className="navbar__title">Search with OMDB</h1>
        </div>
      </div>
      <p className="navbar__subtitle">Professional search experience with responsive movie cards and details.</p>
    </header>
  )
}

export default Navbar
