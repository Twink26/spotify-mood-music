import React, { useState } from "react";
import "./App.css";
fetch(`http://localhost:5000/playlists/${mood}`)


function App() {
  const [mood, setMood] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/playlists/${mood}`);
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      alert("Failed to fetch playlists");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Mood-Based Spotify Playlists</h1>

      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Enter your mood (e.g., happy)"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      <div className="playlist-container">
        {playlists.map((playlist, index) => (
          <div key={index} className="playlist-card">
            <img src={playlist.image} alt={playlist.name} />
            <p>{playlist.name}</p>
            <a href={playlist.url} target="_blank" rel="noreferrer">
              Open in Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
