import * as types from '../../constants/actionTypes'
import clientApi from '../../modules/_clientApi'

export function fetchFilmsSuccess(response) {
    return{
        type: types.FETCH_FILMS_SUCCESS,
        payload: response
    }
}

export function fetchTopFilmsSuccess(response) {
    return{
        type: types.FETCH_TOP_FILMS_SUCCESS,
        payload: response
    }
}
export function fetchFilmsError(error) {
    return {
        type: types.FETCH_FILMS_FAIL,
        payload: error
    }
}
export function startFetchFilms() {
    return{
        type: types.FETCH_FILMS_START
    }

}
export function fetchPopularFilms(page = 1) {
    console.log("PAGE:", page);
    const api = clientApi();
    return function (dispatch) {
        return api.getPopularFilms(page)
                .then(response => {
                    console.log("RESPONSE SUCCESS");
                    dispatch(fetchFilmsSuccess(response.data))
                })
                .catch(error => {
                    console.log(error);
                    dispatch(fetchFilmsError(error.message));

                });

    }
}

export function fetchTopFilms(page = 1) {
    console.log("PAGE(topFilms):", page);
    const api = clientApi();
    return function (dispatch) {
        return api.getTopMovies(page)
            .then(response => {
                console.log("RESPONSE SUCCESS");
                dispatch(fetchTopFilmsSuccess(response.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchFilmsError(error.message));

            });

    }
}

