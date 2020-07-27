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
        draftOrder: [],
        orderComplete: false
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
            draftPosition: event.target.value,
            id: player.id
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
                        image: data.data.image,
                        id: data.data._id
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
        this.setState({
            orderComplete: true
        })
        this.startDraft()
    }

    startDraft = () => {
        console.log(this.state.draftOrder)
        this.state.draftOrder.forEach(player => {
            if (player.draftPosition == 1) {
                let playerObj = {
                    name: player.name,
                    id: player.id,
                    draftPosition: player.draftPosition
                }
                this.setState({
                    playerDrafting: playerObj
                })
            }
        })
    }

    positives = (event, character) => {
        event.preventDefault()
        let putObj = {
            player: this.state.playerDrafting.id,
            character: character.id
        }

        axios.put("/api/positives", putObj).then(data => {
            console.log(data)
            let newArr = this.state.charactersArr.filter(character => character.name !== data.data.name)
            let thePlayer = this.state.players.find(player => player.id === data.data.owner)
            console.log(thePlayer)
            this.state.players.forEach(player => {
                if (player.id === data.data.owner) {
                    if (!player.characters) {
                        player.characters = [data.data.name]
                    } else {
                        player.characters.push(data.data.name)
                    }
                }
            })
            this.setState({
                charactersArr: newArr
            })
        })
        this.nextPick()
    }

    negatives = (event, character) => {
        event.preventDefault()
        let putObj = {
            player: this.state.playerDrafting.id,
            character: character.id
        }

        axios.put("/api/negatives", putObj).then(data => {
            console.log(data)
            let newArr = this.state.charactersArr.filter(character => character.name !== data.data.name)
            let thePlayer = this.state.players.find(player => player.id === data.data.owner)
            console.log(thePlayer)
            this.state.players.forEach(player => {
                if (player.id === data.data.owner) {
                    if (!player.characters) {
                        player.characters = [data.data.name]
                    } else {
                        player.characters.push(data.data.name)
                    }
                }
            })
            this.setState({
                charactersArr: newArr
            })
        })
        this.nextPick()
    }

    nextPick = () => {
        let previousPick = parseFloat(this.state.playerDrafting.draftPosition)
        let next = 1
        if (previousPick !== this.state.players.length) {
            console.log("hellooooo?")
            next = previousPick + 1
        }
        console.log(next)
        this.state.draftOrder.forEach(player => {
            if (player.draftPosition == next) {
                this.state.playerDrafting = player
            }
        })
    }

    incorrectDraftOrder = () => {
        alert("Draft order doesn't make sense, do it again")
        window.location.reload()
    }

    draftIsOver = () => {
        window.location.replace("/game")
    }

    render() {
        return (
            <React.Fragment>
                {this.state.orderComplete === true &&
                    <AllPlayers
                        playerz={this.state.players}
                        drafter={this.state.playerDrafting.name}
                    />
                }
                {this.state.orderComplete === true &&
                    <AllCharacters
                        characterz={this.state.charactersArr}
                        positives={this.positives}
                        negatives={this.negatives}
                    />
                }
                {this.state.orderComplete === false &&
                    <PreDraft
                        playerz={this.state.players}
                        handleInputClick={this.handleInputClick}
                        handleSubmit={this.handleSubmit}
                        playerAmount={this.state.players.length}
                    />
                }
                <button onClick={this.draftIsOver}>Finished Drafting</button>
            </React.Fragment>
        )
    }
}

export default Draft

