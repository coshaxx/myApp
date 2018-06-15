import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.albums, action) {
    switch (action.type) {

        case types.FETCH_ALBOMS_FOR_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                data:[ ...action.payload.data]
            };
        }

        case types.FETCH_ALBOMS_FOR_USER_FAIL: {
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