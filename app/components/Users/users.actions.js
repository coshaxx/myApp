import axios from 'axios';
import * as types from '../../constants/actionTypes'

export function fetchUsersSuccess(response) {
    return{
        type: types.FETCH_USERS_SUCCESS,
        payload: response
    }
}
export function fetchUsersError() {
    return {
        type: types.FETCH_USERS_FAIL
    }

}
export function fetchUsers() {
    return function (dispatch) {
        return axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                dispatch(fetchUsersSuccess(response))
            })
            .catch(error => {
                dispatch(fetchUsersError())
                console.log(error); //eslint-disable-line
            })

    }
}
