import React from "react"

function AllPlayers(props) {
    return (
        <div>
            <h1>
                It's {props.drafter}'s turn
            </h1>
            <div>
                {props.playerz.map((player)=> 
                    <div>
                        <h1>
                            {player.name}
                        </h1>
                        <div>
                            {player.name}'s Characters:
                            {player.characters?.map(
                                character => <div>{character}</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllPlayers