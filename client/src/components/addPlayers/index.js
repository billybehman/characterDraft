import React from "react"
import "./style.css"

function AddPlayers(props) {
    return (
        <div id="searchPlayer">
            <label htmlFor="playerSearch">Search Player</label>
            <input
                onChange={props.handleAdd}
                placeholder="playerName"
                name="playerSearch"
            ></input>
            <button onClick={props.handleAddSubmit}>Add</button>
            <div>
                <strong>Current Players: </strong>{props.players.map(player => <div key={player.name}>{player.name}</div>)}
            </div>
        </div>
    )
}

export default AddPlayers