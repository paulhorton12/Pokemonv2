package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func initDB() {
	var err error
	db, err = sql.Open("sqlite3", "pokedex.db")
	if err != nil {
		panic(err)
	}
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS cache (
		name TEXT PRIMARY KEY,
		data TEXT,
		cached_at DATETIME
	)`)
	if err != nil {
		panic(err)
	}
}

// structs to match the pokemon api json
type AbilityInfo struct {
	Name string `json:"name"`
}

type AbilityEntry struct {
	Ability  AbilityInfo `json:"ability"`
	IsHidden bool        `json:"is_hidden"`
}

type TypeInfo struct {
	Name string `json:"name"`
}

type TypeEntry struct {
	Type TypeInfo `json:"type"`
}

type StatInfo struct {
	Name string `json:"name"`
}

type StatEntry struct {
	BaseStat int      `json:"base_stat"`
	Stat     StatInfo `json:"stat"`
}

type Pokemon struct {
	ID        int            `json:"id"`
	Name      string         `json:"name"`
	Abilities []AbilityEntry `json:"abilities"`
	Types     []TypeEntry    `json:"types"`
	Stats     []StatEntry    `json:"stats"`
}

func getPokemon(c echo.Context) error {
	name := strings.ToLower(c.Param("name"))

	// check cache for a fresh entry (within 24 hours)
	var data string
	err := db.QueryRow(
		"SELECT data FROM cache WHERE name = ? AND cached_at > ?",
		name, time.Now().Add(-24*time.Hour),
	).Scan(&data)
	if err == nil {
		var pokemon Pokemon
		json.Unmarshal([]byte(data), &pokemon)
		return c.JSON(http.StatusOK, pokemon)
	}

	// cache miss or expired — fetch from pokemon api
	resp, err := http.Get(fmt.Sprintf("https://pokeapi.co/api/v2/pokemon/%s", name))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to fetch"})
	}
	defer resp.Body.Close()

	if resp.StatusCode == 404 {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "pokemon not found"})
	}

	var pokemon Pokemon
	json.NewDecoder(resp.Body).Decode(&pokemon)

	// store in cache
	jsonBytes, _ := json.Marshal(pokemon)
	db.Exec("INSERT OR REPLACE INTO cache (name, data, cached_at) VALUES (?, ?, ?)",
		name, string(jsonBytes), time.Now(),
	)

	return c.JSON(http.StatusOK, pokemon)
}

func main() {
	initDB()
	defer db.Close()

	e := echo.New()
	e.GET("/pokemon/:name", getPokemon)
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "frontend/dist",
		HTML5:  true,
		Browse: false,
	}))
	e.Start(":8080")
}
