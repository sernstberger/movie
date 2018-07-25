import { combineReducers } from 'redux';

// // import resultsReducer from './results-reducer';
// import filmReducer from './film-reducer';
// // import personReducer from './person-reducer';

// const rootReducer = combineReducers({
//     // results: resultsReducer,
//     activeFilm: filmReducer,
//     // personList: personReducer,
// });

import {
  FETCH_MOVIES, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE,
  FETCH_MOVIE, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE,
  // FETCH_STAR_SUCCESS, FETCH_STAR_FAILURE,
  // FETCH_CASTS, FETCH_CASTS_SUCCESS, FETCH_CASTS_FAILURE,
  // FETCH_TRAILERS, FETCH_TRAILERS_SUCCESS, FETCH_TRAILERS_FAILURE,
  // SEARCH_MOVIE, SEARCH_MOVIE_SUCCESS, SEARCH_MOVIE_FAILURE,
  // ENTER_SEARCH_TEXT
} from '../actions';

// export default rootReducer;

// import { FETCH_MOVIE } from '../actions';

// let defaultState = {
//   movie: {
//     title: 'red',
//     overview: '',
//   }
// };

const defaultState = {
  isFetching: false,
  item: {},
  error: {}
};

const movieDetail = (state = defaultState, action: any) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.data
      });
    case FETCH_MOVIE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      });
    default:
      return state;
  }
};

const movieList = (state = defaultState, action: any) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {...state, isFetching: true};
    case FETCH_MOVIES_SUCCESS:
      return {...state, isFetching: false, items: action.data};
    case FETCH_MOVIES_FAILURE:
      return {...state, isFetching: false, error: action.data};

    default:
      return state;
  }
};

const mainReducer = combineReducers({
  movieList,
  // castList,
  // trailerList,
  movieDetail,
  // starDetail,
  // input,
  // routing: routerReducer
});

export default mainReducer;