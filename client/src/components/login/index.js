import React from "react"
import "./style.css"

function LoginBox(props) {
    return (
        <div>
            <div className="login">
                <h3>
                    Create Person
                </h3>
                <label htmlFor="createUsername">
                    Username:
                </label>
                <input
                    name="createUsername"
                    placeholder="Enter Username"
                    onChange={props.handleInputChange}
                >
                </input>

                <label htmlFor="createPassword">
                    Password:
                </label>
                <input
                    name="createPassword"
                    placeholder="Enter Password"
                    onChange={props.handleOtherChange}
                >
                </input>

                <button onClick={props.handleFormSubmit}>
                    Create Person
                </button>    
            </div>

            <div className="login">
                <h3>
                    Login
                </h3>
                <label htmlFor="username">
                    Username:
                </label>
                <input
                    name="username"
                    placeholder="Enter Username"
                    onChange={props.handleInputChange}
                >
                </input>

                <label htmlFor="password">
                    Password:
                </label>
                <input
                    name="password"
                    placeholder="Enter Password"
                    onChange={props.handleOtherChange}
                >
                </input>

                <button onClick={props.handleOtherSubmit}>
                    Login
                </button>
            </div>

        </div>

    )
}

export default LoginBox