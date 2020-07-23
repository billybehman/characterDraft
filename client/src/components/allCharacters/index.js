import React from "react"
import "./style.css"

function AllCharacters(props) {
    return (
        <div>
            {props.characterz.map(character => 
                <div>
                    <div>{character.name}</div>
                    <img src={character.image} />
                </div>
            )}
        </div>
    )
}

export default AllCharacters