require('dotenv').config();


const fetch = require("node-fetch");  // Remove if Node >=18
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


let accessToken = "";
let tokenExpireTime = 0;

const getAccessToken = async () => {
  if (Date.now() < tokenExpireTime && accessToken) {
    return accessToken;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Spotify token error: ${data.error} - ${data.error_description}`);
  }
  accessToken = data.access_token;
  tokenExpireTime = Date.now() + data.expires_in * 1000;
  return accessToken;
};

app.get("/", (req, res) => {
  res.send("Spotify Backend is running");
});

app.get("/token", async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({ accessToken: token });
  } catch (error) {
    console.error("Error getting token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

app.get("/playlists/:mood", async (req, res) => {
  const mood = req.params.mood;
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=playlist&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("Spotify API Status:", response.status);
    console.log("Spotify API Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Spotify API error",
        details: data,
      });
    }

    // Filter out null and invalid playlist items safely
    const playlists = (data.playlists.items || [])
      .filter((playlist) => playlist && playlist.name && playlist.external_urls && playlist.external_urls.spotify)
      .map((playlist) => ({
        name: playlist.name,
        url: playlist.external_urls.spotify,
        image: playlist.images && playlist.images.length > 0 ? playlist.images[0].url : null,
      }));

    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});




//BQDsK9AntaEhJozgPO-3gyuy3ibKH_IgcK-CYuSLRgF0fnNUOd8bsi6b67JosNrsFfecHQixrSKmGd0psiXf2oXhVs7hcoSBFYY6DCuW0O5cG78PuXXfZt1xcZwWXkybJuT-JNoZaVQ