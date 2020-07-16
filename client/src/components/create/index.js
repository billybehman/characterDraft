import React from "react"

function Create(props) {
    return (
        <div>
            <label htmlFor="searchTitle">
                Search title
            </label>
            <input name="searchTitle" id="searchTitle" placeholder="title" onChange={props.handleInputChange}>
            </input>

            <label htmlFor="searchYear">
                Search year
            </label>
            <input name="searchYear" id="searchYear" placeholder="title" onChange={props.handleInputChange}>
            </input>

            <button onClick={props.handleFormSubmit}>Search</button>

            <button onClick={props.addPlayers}>Add Players</button>

            <button onClick={props.createGame}>Create Game</button>

        </div>
    )
}

export default Create

//add players will make a get request for all the players. then the user can click players and add them to the game. If the players don't exist yet then the user can just add them 

//on create game a game will be added to the database and then they'll be able to invite players. Also the session user's id will be added to the game's players. If a user accepts the invite then their id will be added to the game's users. 

//to start the draft all the players will 

//only one person needs to do it. So the invites doesn't need to happen
