import React from "react"

function SearchResults(props) {
    return (
        <div>
            <div>
                Title: {props.data.Title}
            </div>
            <div>
                Plot: {props.data.Plot}
            </div>
            <img src={props.data.Poster} />

        </div>
    )
}

export default SearchResults