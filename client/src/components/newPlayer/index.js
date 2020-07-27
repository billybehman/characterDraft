import React from "react"

function NewPlayer(props) {
    return (
        <div>
            <div>
                <h3>
                    Create Person
                </h3>
                <label htmlFor="createUsername">
                    Username:
                </label>
                <input
                    name="createUsername"
                    placeholder="Enter Username"
                    onChange={props.handlePlayerChange}
                >
                </input>

                <label htmlFor="createPassword">
                    Password:
                </label>
                <input
                    name="createPassword"
                    placeholder="Enter Password"
                    onChange={props.handlePlayerPassword}
                >
                </input>

                <button onClick={props.handlePlayerSubmit}>
                    Create Person
                </button>    
            </div>
        </div>
    )
}

export default NewPlayer