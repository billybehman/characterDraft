import React from "react"
import "./style.css"

function AllPlayers(props) {
    return (
        <div className="containter">
            <h1>
                It's {props.drafter}'s turn
            </h1>
            <div className="row" id="players">
                {props.playerz.map((player) =>
                    <div className="col-sm" key={player.name}>

                        <strong>{player.name}'s Characters:</strong>
                        {player.characters?.map(
                            character => <div key={character}>{character}</div>
                        )}

                    </div>
                )}
            </div>
        </div>
    )
}

export default AllPlayers