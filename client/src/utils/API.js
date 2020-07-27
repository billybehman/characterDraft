import axios from "axios"

export default {
    search: function (title, year) {
        return axios.get("https://www.omdbapi.com/?t=" + title + "&y=" + year + "&apikey=f20e851a")
    }
}   