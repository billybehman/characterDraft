import React from "react"
import "./style.css"

function AllCharacters(props) {
    return (
        <div id="allCharacters">
            {props.characterz.map(character => 
                <div className="allCharacters" key={character.name}>
                    <h3>{character.name}</h3>
                    <img src={character.image} />
                    <button onClick={(e) => props.positives(e, character)}>Draft for positives</button>
                    <button onClick={(e) => props.negatives(e, character)}>Draft for negatives</button>
                </div>
            )}
        </div>
    )
}

export default AllCharacters