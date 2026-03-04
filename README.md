# Pokedex + Battle Simulator

A Pokemon card viewer and turn-based battle simulator built with Go and React + TypeScript.

Search for any Pokemon and see it displayed as a TCG-style card with a 3D flip animation — the front shows the card with artwork, abilities, and moves, and the back shows detailed base stats. Then pit two Pokemon against each other in the battle simulator!

![Pokedex Demo](screenshots/demo.png)

## Features

### Card Viewer
- Pokemon TCG card design with type-colored borders
- 3D card flip animation (click to flip)
- Base stats with animated stat bars on the back
- Weakness, resistance, and retreat cost
- Official Pokemon artwork
- Deep-link to any Pokemon via `?name=charizard`

### Battle Simulator
- Turn-based battles using real Pokemon stats
- Full 18x18 type effectiveness chart
- Physical and Special attack options
- STAB (Same Type Attack Bonus)
- Speed determines turn order
- AI opponent picks the highest-damage move

## Run It

### Development (hot reload)

```bash
# Start the Go API server
go run main.go

# In another terminal, start the Vite dev server
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — Vite proxies API calls to the Go backend automatically.

### Production

```bash
cd frontend && npm install && npm run build && cd ..
go run main.go
```

Open [http://localhost:8080](http://localhost:8080)

## Tech Stack

- **Backend:** Go + [Echo](https://echo.labstack.com/) with SQLite caching
- **Frontend:** React + TypeScript + [Vite](https://vite.dev/)
- **Styling:** CSS Modules
- **Routing:** React Router v6
- **Data:** [PokeAPI](https://pokeapi.co/)
