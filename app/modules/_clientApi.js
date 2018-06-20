import axios from 'axios'

const API_URL = 'http://api.themoviedb.org/3';
const API_KEY = '2f7b53d6c9c21b285a74a0aecf8bc403'

export const endpoints = {
    popularMovies: '/movie/popular',
    movie: '/movie'
};
export default function clientApi() {
    return {
        getPopularFilms: function (page) {
            return axios.get(API_URL + endpoints.popularMovies, {
                params: {
                    'api_key': API_KEY,
                    'page': page
                }
            })
        },
        getPosterData: function (id) {
            return axios.get(API_URL + endpoints.movie +'/' + id, {
                params: {
                    'api_key': API_KEY,
                }
            })
        }
    }
}