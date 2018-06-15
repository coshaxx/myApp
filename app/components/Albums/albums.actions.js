import axios from 'axios';
import * as types from '../../constants/actionTypes'

function fetchUserAlbumSuccess(res) {
    return{
        type: types.FETCH_ALBOMS_FOR_USER_SUCCESS,
        payload: res
    }
}
function fetchUserAlbumsFails(res) {
    return{
        type: types.FETCH_ALBOMS_FOR_USER_FAIL,
    }
}

export function fetchUserAlbums(userId) {
    const url = 'https://jsonplaceholder.typicode.com/albums?userId=' + userId
    return function (dispatch) {
        return axios.get(url)
            .then((response) => {
                dispatch(fetchUserAlbumSuccess(response))
            })
            .catch((error)=>{
                dispatch(fetchUserAlbumsFails(response));
                console.log("FetchUserAlbomsFails:", error.message);
            })
    }
}
