// import axios from 'axios';

export const FETCH_MOVIE = 'FETCH_MOVIE';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

const URL_LIST = 'https://api.themoviedb.org/3/movie';
// const URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?query=';
const URL_DETAIL = 'https://api.themoviedb.org/3/movie/';
// const URL_PERSON = 'https://api.themoviedb.org/3/person/';
// const URL_IMG = 'https://image.tmdb.org/t/p/';
// const URL_YOUTUBE = 'https://www.youtube.com/embed/';
// const URL_CAST = '/casts';
// const URL_VIDEO = '/videos';
// const IMG_SIZE_XSMALL = 'w45/';
// const IMG_SIZE_SMALL = 'w150/';
// const IMG_SIZE_LARGE = 'w342/';
// const CAST_MAX_NUM = 5;
// const TRAILER_MAX_NUM = 3;
const API_KEY = '?api_key=0937832cbf3fd4650f903d91d96dec31';

// export function fetchPopular() {
//     const request = axios.get(`https://api.themoviedb.org/3/list/38134?api_key=${API_KEY}`);
//     return {
//         type: FETCH_POPULAR,
//         payload: request
//     }
// }

// export function searchDatabase(term: string) {
//     // This request will search for the term provided
//     const request = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="${term}"`);
//     return {
//         type: SEARCH,
//         payload: request
//     }
// }

// export const fetchMovie = (id: number) => {
//   const request = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,recommendations,release_dates`);
//   return {
//       type: FETCH_MOVIE,
//       payload: request
//   };
// };

// export const fetchMovie = (id: number) => {
//   return (dispatch: any) => {
//     dispatch(fetchMovieAsync(id));
//     // dispatch(newToast(message))
//   };
// };

// export const changeMovie = (data: any) => {
//   return{
//       type: FETCH_MOVIE,
//       title: data.title,
//   };
// };

// export const fetchMovie = (id: number) => {
//   // const request = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,recommendations,release_dates`);
//   // return {
//   //   type: FETCH_MOVIE,
//   //   payload: request
//   // };

//   return (dispatch: any) => {
//     return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,recommendations,release_dates`).then((response) => {
//       dispatch(changeMovie(response.data));
//     });
//   };
// };

// // export function create (values) {

// //   return (dispatch) => {
// //      dispatch({type: CREATE_ORGANIZATION});
// //      axios.post('/url', values)   
// //         .then((res) =>{
// //             dispatch({type: CREATE_ORGANIZATION_SUCCESS, payload: res});
// //         })
// //         .catch((error)=> {
// //             dispatch({type: CREATE_ORGANIZATION_FAILURE, payload: error});
// //         })
// //   }

// // }

// // export function fetchPerson(id: number) {
// //     const request = axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`);
// //     return {
// //         type: FETCH_PERSON,
// //         payload: request
// //     }
// // }

// export const clearMovie = () => {
//   return {
//       type: CLEAR_MOVIE,
//       payload: null
//   };
// };

const fetchMovie = () => {
  return {
    type: FETCH_MOVIE
  };
};

const fetchMovieSuccess = (data: any) => {
  return {
    type: FETCH_MOVIE_SUCCESS,
    data
  };
};

const fetchMovieFail = (error: any) => {
  return {
    type: FETCH_MOVIE_FAILURE,
    error
  };
};

export const fetchMovieDetail = (id: number) => {
  const urlMovie = URL_DETAIL + id + API_KEY + `&append_to_response=credits,videos,recommendations,release_dates`;
  return function(dispatch: any) {
    dispatch(fetchMovie());
    return fetch(urlMovie)
      .then(response => response.json())
      .then(data => dispatch(fetchMovieSuccess(data)))
      .catch(error => dispatch(fetchMovieFail(error)));
  };
};

// ============================================================
// ============================================================

const fetchMovies = () => {
  return {
    type: FETCH_MOVIES
  };
};

const fetchMoviesSuccess = (data: any) => {
  return {
    type: FETCH_MOVIES_SUCCESS,
    data
  };
};

const fetchMoviesFail = (error: any) => {
  return {
    type: FETCH_MOVIES_FAILURE,
    error
  };
};

export const fetchMoviesList = (foo: string) => {
  const urlMovies = URL_LIST + '/popular' + API_KEY;
  return function(dispatch: any) {
    dispatch(fetchMovies());
    return fetch(urlMovies)
      .then(response => response.json())
      .then(data => dispatch(fetchMoviesSuccess(data)))
      .catch(error => dispatch(fetchMoviesFail(error)));
  };
};

// ============================================================
// ============================================================
