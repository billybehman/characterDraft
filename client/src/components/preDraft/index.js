import React from "react"

function PreDraft(props) {
    return (
        <div>
            <h1>
                Choose Drafting Order
            </h1>
            {props.playerz.map(player =>
                <div key={player.id}>
                    <h3>
                        {player.name}
                    </h3>
                    <label htmlFor="draftOrder">Draft Order</label>
                    <input name="draftOrder" onClick={(e) => props.handleInputClick(e, player)} type="number" min="1" max={props.playerAmount}></input>
                </div>
            )}
            <button onClick={props.handleSubmit}>Submit</button>
        </div>
    )
}

export default PreDraft
//the max needs to be changed to player.length