import React, { useState } from "react";
import "./App.css";

// Mood-based songs
const moodSongs = {
  Happy: [
    { title: "Happy - Pharrell Williams", url: "https://youtu.be/ZbZSe6N_BXs" },
    { title: "Good Time - Owl City", url: "https://youtu.be/H7HmzwI67ec" },
    { title: "Can't Stop The Feeling - JT", url: "https://youtu.be/ru0K8uYEZWw" },
  ],
  Sad: [
    { title: "Let Her Go - Passenger", url: "https://youtu.be/RBumgq5yVrA" },
    { title: "Someone Like You - Adele", url: "https://youtu.be/hLQl3WQQoQ0" },
    { title: "Fix You - Coldplay", url: "https://youtu.be/k4V3Mo61fJM" },
  ],
  Chill: [
    { title: "Sunflower - Post Malone", url: "https://youtu.be/ApXoWvfEYVU" },
    { title: "Better Together - Jack Johnson", url: "https://youtu.be/seZMOTGCDag" },
    { title: "lovely - Billie Eilish", url: "https://youtu.be/V1Pl8CzNzCw" },
  ],
};

// Mood-based background colors
const moodBackground = {
  Happy: "#ffe066",
  Sad: "#a29bfe",
  Chill: "#55efc4",
};

function App() {
  const [selectedMood, setSelectedMood] = useState("");

  return (
    <div
      className="App"
      style={{ backgroundColor: moodBackground[selectedMood] || "#ffffff", minHeight: "100vh", padding: "20px" }}
    >
      <h1>Mood Music Recommender</h1>
      <p>Pick your mood:</p>

      {Object.keys(moodSongs).map((mood) => (
        <button key={mood} onClick={() => setSelectedMood(mood)} style={{ margin: "10px" }}>
          {mood}
        </button>
      ))}

      <hr />

      <h2>{selectedMood ? `Songs for ${selectedMood} mood:` : "Pick a mood to get started!"}</h2>
      <ul>
        {selectedMood &&
          moodSongs[selectedMood].map((song, index) => (
            <li key={index}>
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                {song.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
