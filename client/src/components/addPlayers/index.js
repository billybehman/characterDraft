import React from "react"

function AddPlayers(props) {
    return (
        <div>
            <label htmlFor="playerSearch">Search Player</label>
            <input 
                onChange={props.handleAdd}
                placeholder="playerName"
                name="playerSearch"
            ></input>
            <button onClick={props.handleAddSubmit}>Add</button>
        </div>
    )
}

export default AddPlayers