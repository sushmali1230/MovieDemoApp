import { API_KEY, BASE_URL } from "../utils/AppConstants";

export const getGeners = () => {
    return fetch(BASE_URL + "3/genre/movie/list?language=en&api_key="+API_KEY, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(response => {
        return response;
    })
    .catch(error => {
        console.error(error);
    });
}

export const getMovies = (genre) => {
    return fetch(BASE_URL + "3/discover/movie?include_adult=false&include_video=false&language=en-US&with_genres="+genre+"&sort_by=popularity.desc&api_key="+API_KEY, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(response => {
        return response;
    })
    .catch(error => {
        console.error(error);
    });
}