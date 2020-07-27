import React from "react"

function CreateOrFind(props) {
    return (
        <div>

            <div>
                Welcome {props.welcome}
            </div>
            
            {/* <label htmlFor="start">Start Game</label>
            <input checked={props.status === "start"} type="radio" name="start" value="start" onChange={props.handleChange} />

            <label htmlFor="find">Find Game</label>
            <input checked={props.status === "find"} type="radio" name="find" value="find" onChange={props.handleChange} /> */}

        </div>
    )
}

export default CreateOrFind


