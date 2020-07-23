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
const session = require("express-session")

class CreateGame extends Component {

    state = {
        createOrFind: "",
        searchTitle: "",
        searchYear: "",
        film: "",
        results: {},
        currentUser: "",
        addPlayers: false,
        playerSearch: "",
        players: [],
        Films
    }

    componentDidMount() {
        axios.get("/api/get-session").then(data =>
            this.setState({
                currentUser: data.data.user
            }))

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


    handleFormSubmit = event => {
        event.preventDefault()
        API.search(this.state.searchTitle, this.state.searchYear).then(data => this.setState({ results: data.data })).catch(function (err) {
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
            let thePlayerObj = {
                name: data.data.name,
                id: data.data._id
            }
            this.setState({
                players: [...this.state.players, thePlayerObj]
            })
        })
    }

    handleSelect = event => {
        event.preventDefault()
        let value = event.target.value
        this.setState({
            film: value
        })
    }

    createGame = event => {
        event.preventDefault()
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

    }

    render() {
        return (
            <React.Fragment>
                <CreateOrFind
                    handleChange={this.handleChange}
                    welcome={this.state.currentUser}
                    status={this.state.createOrFind}
                />
                {this.state.createOrFind === "start" &&
                    <Create
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                        createGame={this.createGame}
                        addPlayers={this.addPlayers}
                    />
                }
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
                <SearchResults
                    data={this.state.results}
                />
            </React.Fragment>
        )
    }
}

export default CreateGame

//instead of getting the game from the search input there should instead be no search input. The search will come from the selected game and it will automatically make the api call. 