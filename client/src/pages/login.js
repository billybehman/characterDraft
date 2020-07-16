import { Component } from "react";
import LoginBox from "../components/login"
import React from "react"
import axios from 'axios';

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        let userObj = {
            name: this.state.username,
            password: this.state.password
        }
        axios.post("/api/create-user", userObj).then(function(data) {
            console.log(data)
        }).catch(function(err) {
            console.log(err)
        })
    }

    handleOtherSubmit = (event) => {
        event.preventDefault()
        let userObj = {
            name: this.state.username,
            password: this.state.password
        }
        axios.get("/api/find-user", { params: userObj }).then(function(data) {
            if (data.data === null) {
                alert("Either your username or password is wrong or you don't exist and you need to create an account.")
            } else {
                window.location.replace("/create-game")
                //is this not how I should do it in react?
            }
        }).catch(function(err) {
            console.log(err)
        })
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ username: event.target.value })
    }
//is there a way to combine these two onChange functions?
    handleOtherChange = (event) => {
        event.preventDefault()
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <LoginBox
                handleFormSubmit={this.handleFormSubmit}
                handleOtherSubmit={this.handleOtherSubmit}
                handleInputChange={this.handleChange}
                handleOtherChange={this.handleOtherChange}
            />
        )
    }

}

export default Login