import React from "react"
import "./style.css"

function SearchResults(props) {
    return (
        <div id="searchResults">
            <div class="textResults">
                <strong>Title: </strong>{props.data.Title}
            </div>
            <div class="textResults">
                <strong>Plot: </strong>{props.data.Plot}
            </div>
            <img id="image" src={props.data.Poster} />

        </div>
    )
}

export default SearchResults