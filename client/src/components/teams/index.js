import React from "react"
import "./style.css"

function PlayerTeams(props) {
    return(
        <div className="row">
            {props.players.map(player => 
                <div className="col-sm" key={player.name}>
                    <h1>
                        {player.name}'s Team
                    </h1>
                    <h3>
                        Points: {player.points}
                    </h3>
                    <div>
                        {player.characters?.map(
                            character => 
                            <div className="character" key={character.name}>
                                <h3>{character.name}</h3>
                                <h4>For: {character.forPositives}</h4>
                                <img src={character.image}/>
                                <div>
                                    Points: {character.points}
                                </div>
                                <label htmlFor="points">
                                    Select Points
                                </label>
                                <input
                                    name="points"
                                    onClick={(e) => props.handlePointsInput(e, character)}
                                    type="number"
                                >
                                </input>
                                <button onClick={(e) => props.handleSubmit(e, character)}>Submit Points</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlayerTeams