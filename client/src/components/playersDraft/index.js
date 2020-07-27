import React from "react"

function AllPlayers(props) {
    return (
        <div>
            <h1>
                It's {props.drafter}'s turn
            </h1>
            <div>
                {props.playerz.map((player)=> 
                    <div key={player.name}>
                        <h1>
                            {player.name}
                        </h1>
                        <div>
                            {player.name}'s Characters:
                            {player.characters?.map(
                                character => <div key={character}>{character}</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllPlayers