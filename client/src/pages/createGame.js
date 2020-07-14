import {Component} from "react"
import React from "react"
import CreateOrFind from "../components/createOrFind"
import Create from "../components/create"
import API from "../utils/API"
import SearchResults from "../components/searchResults"

class CreateGame extends Component {

    state = {
        createOrFind: "",
        searchTitle: "",
        searchYear: "",
        results: {}
    }

    componentDidMount() {
        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        let id = event.target.id
        if (id === "searchTitle") {
            let value = event.target.value
            this.setState({
            searchTitle: value
        }) 
        } else if (id === "searchYear") {
            let value = event.target.value
            this.setState({
                searchYear: value
            })
        }
        
    }


    handleFormSubmit = event => {
        event.preventDefault()
        API.search(this.state.searchTitle, this.state.searchYear).then(data => this.setState({ results: data.data})).catch(function(err) {
            console.log(err)
        })
    }

    handleChange = event => {
        event.preventDefault()
        let value = event.target.value
        this.setState({
            createOrFind: value
        })
    }

    render() {
        return (
            <React.Fragment>
                <CreateOrFind handleChange={this.handleChange}/>
                {this.state.createOrFind === "start" && 
                    <Create 
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    createGame={this.createGame}
                />
                }
                <SearchResults 
                    data={this.state.results}
                />
            </React.Fragment>
        )
    }
}

export default CreateGame