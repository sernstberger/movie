import * as React from 'react';

// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMoviesList } from '../actions';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import ContentCard from '../components/ContentCard';
import PageLayout from '../components/PageLayout';
import Typography from '../../node_modules/@material-ui/core/Typography';

interface ReduxStateProps {
  // create a type for this eventually
  listOfThings: {
    results: any;
  };
}

interface ReduxDispatchProps {
  movieList: (foo: string) => void;
}

type HomeProps =
& ReduxStateProps
& ReduxDispatchProps;

class HomePage extends React.Component<HomeProps, {}> {
  componentDidMount() {
    this.props.movieList('popular');

    window.scrollTo(0, 0);
  }
    
  render() {
    return(
      <React.Fragment>
        <PageLayout>
          <Grid container spacing={16} justify="center">
            <Grid item xs={12} xl={10}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Hidden smDown>
                    <Typography variant="display4">Popular</Typography>
                  </Hidden>
                  <Hidden mdUp>
                    <Typography variant="display1">Popular</Typography>
                  </Hidden>
                </Grid>
                {this.props.listOfThings && this.props.listOfThings.results.map( (thing: any, i: number) => {
                  return <Grid item xs={3} sm={2} key={i}>
                    <ContentCard
                      title={thing.title}
                      link={`/movie/${thing.id}`}
                      poster={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${thing.poster_path}`}
                    />
                  </Grid>;
                })}
              </Grid>
            </Grid>
          </Grid>
        </PageLayout>
      </React.Fragment>
    );
  }
}

// state needs typings
const mapStateToProps = (state: any) => {
  return {
    listOfThings: state.movieList.items,
  };
};

// Dispatch not working in current react-redux, so using any, but should be changed
const mapDispatchToProps = (dispatch: any, ownProps: HomeProps): ReduxDispatchProps => ({
  movieList: (foo: string) => dispatch(fetchMoviesList(foo)),
});

export default connect<ReduxStateProps, ReduxDispatchProps, HomeProps>
(mapStateToProps, mapDispatchToProps)(HomePage);
