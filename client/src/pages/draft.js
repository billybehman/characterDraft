import { Component } from "react"
import React from "react"
import AllCharacters from "../components/allCharacters"
import axios from "axios"
import AllPlayers from "../components/playersDraft"
import PreDraft from "../components/preDraft"

class Draft extends Component {
    state = {
        charactersArr: [],
        players: [],
        playerDrafting: "",
        draftOrder: []
    }

    componentDidMount() {
        axios.get("/api/get-session").then(data => {
            let id = {
                game: data.data.game
            }
            this.getGame(id)
        })
    }

    handleInputClick = (event, player) => {
        let drafterObj = {
            name: player.name,
            draftPosition: event.target.value
        }
        console.log(player)
        const newArr = this.state.draftOrder.filter(obj => obj.name !== player.name)
        newArr.push(drafterObj)
        this.setState({
            draftOrder: newArr
        })
    }

    getGame = (id) => {
        axios.get("/api/get-game", { params: id }).then(data => {
            let characters = data.data.characters
            characters.forEach(character => {
                let characterObj = {
                    id: character
                }
                axios.get("/api/get-character", { params: characterObj }).then(data => {
                    console.log(data)
                    let newCharacterObj = {
                        name: data.data.name,
                        image: data.data.image
                    }
                    this.setState({
                        charactersArr: [...this.state.charactersArr, newCharacterObj]
                    })
                })
            })
            let players = data.data.players
            players.forEach(player => this.setState({
                players: [...this.state.players, player]
            }))
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let num1 = this.state.players.length
        console.log(num1)
        let numArr = []
        for (let i = 1; i <= num1; i++) {
            numArr.push(i)
        }
        const possibleArr = this.state.draftOrder.map(obj => obj.draftPosition)
        console.log("Old Arr: " + possibleArr)
        console.log(numArr)
        
        numArr.forEach(num => {
            const find = possibleArr.find(pNum => pNum == num)
            if (find) {
                console.log(find)
            } else {
                this.incorrectDraftOrder()
            }
        })

        
    }

    incorrectDraftOrder = () => {
        alert("Draft order doesn't make sense, do it again")
        window.location.reload()
    }

    render() {
        return (
            <React.Fragment>
                <AllCharacters
                    characterz={this.state.charactersArr}
                />
                <AllPlayers
                    playerz={this.state.players}
                />
                <PreDraft
                    playerz={this.state.players}
                    handleInputClick={this.handleInputClick}
                    handleSubmit={this.handleSubmit}
                />
            </React.Fragment>
        )
    }
}

export default Draft

//i need divs for player 1, 2, and 3 so that their players can go there. When a player selects a character should I run the api call right there or should I wait and run it when the draft is over? Probably right there. 