# React Movie Search App

A React + TypeScript + Vite project that searches movies using the OMDB API.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Open `.env` and replace `YOUR_OMDB_API_KEY_HERE` with your OMDB API key.

3. Run the app:

   ```bash
   npm run dev
   ```

4. Open the local URL shown in the terminal.

## How it works

- `src/App.tsx` contains the search form, movie cards, and movie detail view.
- `src/App.css` contains the app styling.
- OMDB data is fetched using `VITE_OMDB_API_KEY`.
- Click a movie card to load details.
