package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

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
	name := c.Param("name")

	// fetch from pokemon api
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

	return c.JSON(http.StatusOK, pokemon)
}

func main() {
	e := echo.New()
	e.GET("/pokemon/:name", getPokemon)
	e.Static("/", "static")
	e.Start(":8080")
}
