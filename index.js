const express = require('express');
let cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

//function for EndPoint 1:
async function fetchAllGames() {
  let query = 'SELECT * FROM games ';
  let response = await db.all(query, []);

  return { games: response };
}
//EndPOint 1:
app.get('/games', async (req, res) => {
  try {
    let results = await fetchAllGames();

    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No games  found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//games

//function for EndPoint 2:
async function fetchGamesById(id) {
  let query = 'SELECT * FROM games WHERE id=?';
  let response = await db.all(query, [id]);
  return { games: response };
}

//EndPoint 2:
app.get('/games/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchGamesById(id);

    if (results.games.length === 0) {
      return res.status(404).json({ message: 'No games found By this ID' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//games/details/1

//function for EndPoint 3:
async function fetchGamesCuisine(genre) {
  let query = 'SELECT * FROM games WHERE genre =?';
  let response = await db.all(query, [genre]);

  return { games: response };
}
//EndPoint 3:
app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    let result = await fetchGamesCuisine(genre);

    if (result.games.length === 0) {
      return res.status(404).json({ message: 'no games found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//games/genre/FPS

//function for EndPoint 4:
async function fetchGamesByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform=? ';
  let response = await db.all(query, [platform]);

  return { games: response };
}
//EndPoint 4:
app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;

  try {
    let result = await fetchGamesByPlatform(platform);

    if (result.games.length === 0) {
      return res.status(404).json({ message: 'no games found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//games/platform/PC

//function for EndPoint 5:
async function fetchGamesByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);

  return { games: response };
}
//EndPoint 5:
app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchGamesByRating();

    if (result.games.length === 0) {
      return res.status(404).json({ message: 'no games Found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//games/sort-by-rating

//function for EndPoint 6:
async function fetchAlllPlayers() {
  let query = 'SELECT * FROM players ';
  let response = await db.all(query, []);

  return { players: response };
}
//EndPOint 6:
app.get('/players', async (req, res) => {
  try {
    let results = await fetchAlllPlayers();

    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No players  found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//players

//function for EndPoint 7:
async function fetchPlayersById(id) {
  let query = 'SELECT * FROM players WHERE id=?';
  let response = await db.all(query, [id]);
  return { players: response };
}

//EndPoint 7:
app.get('/players/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchPlayersById(id);

    if (results.players.length === 0) {
      return res.status(404).json({ message: 'No players found By this ID' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//players/details/1

//function for EndPoint 8:
async function fetchplayersByFilter(platform) {
  let query = 'SELECT * FROM players WHERE platform =? ';
  let response = await db.all(query, [platform]);

  return { players: response };
}
//EndPoint 8:
app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;

  try {
    let result = await fetchplayersByFilter(platform);

    if (result.players.length === 0) {
      return res.status(404).json({ message: 'no players found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//players/platform/PC

//function for EndPoint 9:
async function fetchPlayersByRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC ';
  let response = await db.all(query, []);

  return { players: response };
}
//EndPoint 9:
app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchPlayersByRating();

    if (result.players.length === 0) {
      return res.status(404).json({ message: 'no players Found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//players/sort-by-rating

//function for EndPoint 10:
async function fetchAlllTournaments() {
  let query = 'SELECT * FROM tournaments ';
  let response = await db.all(query, []);

  return { tournaments: response };
}
//EndPOint 10:
app.get('/tournaments', async (req, res) => {
  try {
    let results = await fetchAlllTournaments();

    if (results.tournaments.length === 0) {
      return res.status(404).json({ message: 'No tournaments  found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//tournaments

//function for EndPoint 11:
async function fetchTournamentsById(id) {
  let query = 'SELECT * FROM tournaments WHERE id=?';
  let response = await db.all(query, [id]);
  return { tournaments: response };
}

//EndPoint 11:
app.get('/tournaments/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchTournamentsById(id);

    if (results.tournaments.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tournaments found By this ID' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//tournaments/details/1

//function for EndPoint 12:
async function fetchTournamentsByGameId(gameId) {
  let query = 'SELECT * FROM tournaments WHERE gameId=?';
  let response = await db.all(query, [gameId]);
  return { tournaments: response };
}

//EndPoint 12:
app.get('/tournaments/game/:gameId', async (req, res) => {
  let gameId = parseInt(req.params.gameId);
  try {
    let results = await fetchTournamentsByGameId(gameId);

    if (results.tournaments.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tournaments found By this gameId' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//tournaments/game/1

//function for EndPoint 13:
async function fetchTournamentsByRating() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC ';
  let response = await db.all(query, []);

  return { tournaments: response };
}
//EndPoint 13:
app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let result = await fetchTournamentsByRating();

    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: 'no tournaments Found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//tournaments/sort-by-prize-pool

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});