import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.films, action) {
    switch (action.type) {

        case types.FETCH_FILMS_START: {
            return {
                ...state,
                loading: true
            };
        }

        case types.FETCH_FILMS_SUCCESS: {
            return {
                ...state,
                loading: false,
                popular: {
                    ...action.payload,
                    results: [
                        ...state.popular.results,
                        ...action.payload.results
                    ]
                }
            };
        }

        case types.FETCH_TOP_FILMS_SUCCESS: {
            return {
                ...state,
                loading: false,
                top: {
                    ...action.payload,
                    results: [
                        ...state.top.results,
                        ...action.payload.results
                    ]
                }
            };
        }

        case types.FETCH_FILMS_FAIL: {
            return {
                ...state,
                loading: false,
                error: {
                    message: action.payload
                }
            }
        }

        default:
            return state;

    }
}