import * as React from 'react';

// import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { connect } from 'react-redux';
import { fetchMovieDetail } from '../actions';

import Movie from '../components/movie';
import PageLayout from '../components/PageLayout';

interface ReduxStateProps {
  // create a type for this eventually
  activeFilm: {
    title: string;
    tagline: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    credits: {
      cast: any;
    }
    genres: any;
    release_date: string;
    runtime: number;
  };
}

interface MovieOwnProps extends RouteComponentProps<{id: number}> {}

interface ReduxDispatchProps {
  FooOnYou: (id: number) => void;
}

type MovieProps =
MovieOwnProps
& ReduxStateProps
& ReduxDispatchProps;

class MoviePage extends React.Component<MovieProps, {}> {

// class Movie extends React.Component {
  componentDidMount() {
    this.props.FooOnYou(this.props.match.params.id);

    window.scrollTo(0, 0);
  }
    
  render() {
      
      // if(this.props.activeFilm.data === undefined)
      //     return <div>Loading</div>
      
      // if(this.props.personList.data === undefined)
      //     return <div>Loading</div>
      
      // const film = this.props.activeFilm.data;
      // const poster = film.poster_path;
      // const src = poster === null ? 'http://via.placeholder.com/185x278' : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster}`;
      // const videoId = `https://www.youtube.com/embed/${film.videos.results[0].key}`;

      // const people = this.props.personList.data;
      // console.log(people);

      // tslint:disable-next-line:no-console
      console.log('fooooo', this.props);

      return(
        <PageLayout>
          <Movie
            title={this.props.activeFilm.title}
            tagline={this.props.activeFilm.tagline}
            poster={this.props.activeFilm.poster_path}
            backdrop={this.props.activeFilm.backdrop_path}
            overview={this.props.activeFilm.overview}
            credits={this.props.activeFilm.credits}
            genres={this.props.activeFilm.genres}
            releaseDate={this.props.activeFilm.release_date}
            runtime={this.props.activeFilm.runtime}
          />
        </PageLayout>
      );
    }
}

// state needs typings
const mapStateToProps = (state: any) => {
  return {
    activeFilm: state.movieDetail.item,
  };
};

// Dispatch not working in current react-redux, so using any, but should be changed
const mapDispatchToProps = (dispatch: any, ownProps: MovieProps): ReduxDispatchProps => ({
  FooOnYou: (id: number) => dispatch(fetchMovieDetail(id)),
});

export default connect<ReduxStateProps, ReduxDispatchProps, MovieProps>
(mapStateToProps, mapDispatchToProps)(MoviePage);
