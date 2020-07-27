import { Component } from "react"
import React from "react"
import CreateOrFind from "../components/createOrFind"
import Create from "../components/create"
import API from "../utils/API"
import SearchResults from "../components/searchResults"
import axios from "axios"
import AddPlayers from "../components/addPlayers"
import SelectFilm from "../components/selectFilm"
import Films from "../characters.json"
import NewPlayer from "../components/newPlayer"
const session = require("express-session")

class CreateGame extends Component {

    state = {
        createOrFind: "",
        searchYear: "",
        film: "",
        results: {},
        currentUser: "",
        addPlayers: false,
        playerSearch: "",
        players: [],
        Films,
        createPlayer: false,
        username: "",
        password: "",
        showResults: false
    }

    componentDidMount() {
        axios.get("/api/get-session").then(data =>
            this.setState({
                currentUser: data.data.user
            })
        )


    }

    handleInputChange = (event) => {
        event.preventDefault()
        let id = event.target.id
        if (id === "searchTitle") {
            let value = event.target.value
            this.setState({
                searchTitle: value
            })
        } else if (id === "searchYear") {
            let value = event.target.value
            this.setState({
                searchYear: value
            })
        }

    }


    handleFormSubmit = () => {
        API.search(this.state.film, this.state.searchYear).then(data => this.setState({ results: data.data })).catch(function (err) {
            console.log(err)
        })
    }

    handleChange = event => {
        event.preventDefault()
        let value = event.target.value
        this.setState({
            createOrFind: value
        })
    }

    addPlayers = event => {
        event.preventDefault()
        this.setState({
            addPlayers: true
        })
    }

    handleAdd = event => {
        event.preventDefault()
        let value = event.target.value
        this.setState({
            playerSearch: value
        })
    }

    handleAddSubmit = event => {
        event.preventDefault()
        let playerObj = {
            name: this.state.playerSearch
        }
        axios.get("/api/all-players", { params: playerObj }).then(data => {
            if (!data.data) {
                this.newPlayer()
            } else {
                let thePlayerObj = {
                    name: data.data.name,
                    id: data.data._id
                }
                this.setState({
                    players: [...this.state.players, thePlayerObj]
                })
            }
        })
    }

    newPlayer = () => {
        alert("this person doesn't exist.")
        this.setState({
            createPlayer: true
        })
    }

    handlePlayerSubmit = (event) => {
        event.preventDefault()
        let userObj = {
            name: this.state.username,
            password: this.state.password
        }
        axios.post("/api/create-user", userObj).then(function (data) {
            console.log(data)
        }).catch(function (err) {
            console.log(err)
        })
        this.setState({
            createPlayer: false
        })
    }

    handleSelect = event => {
        event.preventDefault()
        let value = event.target.value
        this.setState({
            film: value
        })
        Films.forEach(film => {
            if (film.name === value) {
                API.search(film.name, film.year).then(data => this.setState({ results: data.data })).catch(function (err) {
                    console.log(err)
                })
            }
        })
        this.setState({
            showResults: true
        })
    }

    createGame = event => {
        event.preventDefault()
        if (this.state.players.length < 2) {
            alert("not enough players")
        } else if (this.state.film === "") {
            alert("select a film")
        } else {
            let characters = []
            Films.forEach(film => {
                if (film.name === this.state.film) {
                    characters = film.characters
                }
            })
    
            const characterPromises = characters.map(character => {
                return axios.post("/api/character", character)
            })
    
            Promise.all(characterPromises).then(characterDataArray => {
                let characterIds = characterDataArray.map(character => character.data._id)
                this.createActualGame(characterIds)
            })
        }
    }

    createActualGame = (characterIdArr) => {

        let gameObj = {
            players: this.state.players,
            film: this.state.film,
            characters: characterIdArr
        }
        console.log(gameObj.characters)

        axios.post("/api/new-game", gameObj).then(data => {
            console.log(data)
        })
        window.location.replace("/draft")
    }

    handlePlayerChange = (event) => {
        event.preventDefault()
        this.setState({ username: event.target.value })
    }

    handlePlayerPassword = (event) => {
        event.preventDefault()
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <CreateOrFind
                    handleChange={this.handleChange}
                    welcome={this.state.currentUser.name}
                    status={this.state.createOrFind}
                />
                <Create
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    createGame={this.createGame}
                    addPlayers={this.addPlayers}
                />

                <SelectFilm
                    filmz={this.state.Films}
                    handleSelect={this.handleSelect}
                />
                {this.state.addPlayers === true &&
                    <AddPlayers
                        handleAdd={this.handleAdd}
                        handleAddSubmit={this.handleAddSubmit}
                        players={this.state.players}
                    />
                }
                {this.state.showResults === true && 
                    <SearchResults
                    data={this.state.results}
                />
                }
                
                {this.state.createPlayer === true &&
                    <NewPlayer
                        handlePlayerChange={this.handlePlayerChange}
                        handlePlayerPassword={this.handlePlayerPassword}
                        handlePlayerSubmit={this.handlePlayerSubmit}
                    />

                }

            </React.Fragment>
        )
    }
}

export default CreateGame

//instead of getting the game from the search input there should instead be no search input. The search will come from the selected game and it will automatically make the api call. 