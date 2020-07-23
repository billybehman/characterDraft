import React from "react"

function AllPlayers(props) {
    return (
        <div>
            {props.playerz.map(player => 
                <div>
                    {player.name}
                </div>
            )}
        </div>
    )
}

export default AllPlayers