import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.users, action) {
    switch (action.type) {

        case types.FETCH_USERS_START: {
            return {
                ...state,
                loading: true
            };
        }

        case types.FETCH_USERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                data:[ ...action.payload.data]
            };
        }

        case types.FETCH_USERS_FAIL: {
            return{
                ...state,
                loading: false,
                error:{
                    message: "Some problem"
                }
            }
        }

        default:
            return state;

    }
}