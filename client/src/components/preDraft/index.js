import React from "react"

function PreDraft(props) {
    return (
        <div>
            {props.playerz.map(player =>
                <div>
                    <h3>
                        {player.name}
                    </h3>
                    <label htmlFor="draftOrder">Draft Order</label>
                    <input name="draftOrder" onClick={(e) => props.handleInputClick(e, player)} type="number" min="1" max="3"></input>
                </div>
            )}
            <button onClick={props.handleSubmit}>Submit</button>
        </div>
    )
}

export default PreDraft
//the min and the max needs to be changed to player.length