import React from "react"
import "./style.css"

function SelectFilm(props) {
    return (
        <div id="selectFilm">
            <label htmlFor="selectFilm">Select Film</label>
            <select id="select" name="selectFilm" onChange={props.handleSelect}>
                <option>Select</option>
                {props.filmz.map(
                    film => <option key={film.name}>
                        {film.name}
                    </option>
                )}
            </select>
        </div>
    )
}

export default SelectFilm

//this should come from the json file