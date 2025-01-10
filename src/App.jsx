import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=d7835d06aa9bf95f73ab15509e7dc769"
        );
        setMovies(res.data.results || []);
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
      }
    };

    fetchMovies();
  }, []);

  async function GetMovies() {
    if (!userInput.trim()) {
      console.log("Please enter a valid movie name.");
      return;
    }

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=d7835d06aa9bf95f73ab15509e7dc769&query=${userInput}`
      );
      setMovies(res.data.results || []);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  return (
    <div>
      <h1> Movie Search</h1>
      <div className="search">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Search for a movie"
        />
        <button onClick={GetMovies}>Search Movies</button>
      </div>

      <div>
        {movies && movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <div className="card" key={movie.id}>
                <h2>{movie.title}</h2>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      : ""
                  }
                  alt={movie.title || "Movie Poster"}
                />
                <p>{movie.overview || "No description available"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies found. Try searching for something else!</p>
        )}
      </div>
    </div>
  );
}

export default App;
