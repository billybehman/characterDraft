import React, { Component } from "react"
import axios from "axios"
import PlayerTeams from "../components/teams"


class Game extends Component {

    state = {
        players: [],
        newPoints: 0,
        points: []
    }

    componentDidMount() {
        axios.get("/api/get-session").then(data => {
            let id = {
                game: data.data.game
            }
            this.getGame(id)
        })
    }


    getGame = (id) => {
        axios.get("/api/get-game", { params: id }).then(data => {
            console.log(data)
            this.setState({
                players: data.data.players
            })
            data.data.characters.forEach(character => {
                let characterObj = {
                    id: character
                }
                axios.get("/api/get-character", { params: characterObj }).then(data => {
                    this.charactersToOwners(data)
                })
            })
        })
    }

    charactersToOwners = (data) => {
        let character = data.data
        console.log(character)
        this.state.players.forEach(player => {
            if (character.owner === player.id) {
                let characterObj = {
                    name: character.name,
                    id: character._id,
                    points: character.points,
                    image: character.image,
                    forPositives: ""
                }
                if (character.forPositives === true) {
                    characterObj.forPositives = "positives"
                } else {
                    characterObj.forPositives = "negatives"
                }
                if (!player.characters) {
                    player.characters = [characterObj]
                } else {
                    player.characters.push(characterObj)
                }
            }
        })
        this.setState({
            newPoints: 0
        })
    }

    playerPoints = () => {
        this.state.players.forEach(player => {
            let totalPoints = 0
            player.characters.forEach(character => {
                if (character.forPositives === "positives") {
                    totalPoints += parseFloat(character.points)
                } else {
                    totalPoints -= parseFloat(character.points)
                }
            })
            player.points = totalPoints
        })
    }

    handlePointsInput = (event, character) => {
        event.preventDefault()
        let value = event.target.value
        let pointsObj = {
            points: value,
            character: character.id
        }
        console.log(pointsObj)
        let newPoints = this.state.points.filter(point => point.character !== pointsObj.character)
        newPoints.push(pointsObj)
        this.setState({
            points: newPoints
        })
    }

    handleSubmit = (event, character) => {
        event.preventDefault()
        let pointsObj = {
            points: parseFloat(character.points),
            character: ""
        }
        this.state.points.forEach(point => {
            if (point.character === character.id) {
                pointsObj.character = point.character
                pointsObj.points += parseFloat(point.points)
            }
        })
        console.log(pointsObj)
        axios.put("/api/points", pointsObj).then(data => {
            this.state.players.forEach(player => {
                if (player.id == data.data.owner) {
                    player.characters.forEach(character => {
                        if (character.id == data.data._id) {
                            character.points = data.data.points
                            this.playerPoints()
                            this.setState({
                                newPoints: 0
                            })
                        }
                    })
                }
            })
        })
    }

    endGame = () => {
        
    }

    render() {
        return (
            <React.Fragment>
                <PlayerTeams
                    players={this.state.players}
                    handlePointsInput={this.handlePointsInput}
                    points={this.points}
                    handleSubmit={this.handleSubmit}
                />
                <button onClick={this.endGame}>
                    End Game
                </button>
            </React.Fragment>
        )
    }
}

export default Game
