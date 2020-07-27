import React from "react"
import "./style.css"

function AllCharacters(props) {
    return (
        <div>
            {props.characterz.map(character => 
                <div>
                    <div>{character.name}</div>
                    <img src={character.image} />
                    <button onClick={(e) => props.positives(e, character)}>Draft for positives</button>
                    <button onClick={(e) => props.negatives(e, character)}>Draft for negatives</button>
                </div>
            )}
        </div>
    )
}

export default AllCharacters