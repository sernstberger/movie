import * as React from 'react';

// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMoviesList } from '../actions';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
// import Hidden from '@material-ui/core/Hidden';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/pro-light-svg-icons';

// import {  } from '@fortawesome/fontawesome-pro';

import ContentCard from '../components/ContentCard';
import PageLayout from '../components/PageLayout';
import Typography from '../../node_modules/@material-ui/core/Typography';

library.add(faLongArrowLeft, faLongArrowRight);

interface ReduxStateProps {
  // create a type for this eventually
  listOfThings: {
    isFetching: boolean;
    items: {
      results: any;
    };
  };
}

interface ReduxDispatchProps {
  movieList: (foo: string, page: number) => void;
}

type HomeProps =
& ReduxStateProps
& ReduxDispatchProps;

type State = {
  open: string;
  page: number;
};

class HomePage extends React.Component<HomeProps, State> {
  state = {
    open: 'popular',
    page: 1,
  };

  componentDidMount() {
    this.props.movieList('popular', 1);

    // window.scrollTo(0, 0);
  }

  selectStuff = (foo: string) => {
    this.props.movieList(foo, 1);
    this.setState({open: foo});
  }

  pageUp = () => {
    this.props.movieList(this.state.open, this.state.page + 1);
    this.setState({page: this.state.page + 1});
  }

  pageDown = () => {
    this.props.movieList(this.state.open, this.state.page - 1);
    this.setState({page: this.state.page - 1});
  }
    
  render() {
    return(
      <React.Fragment>
        <PageLayout>
          <Grid container spacing={16} justify="center">
            <Grid item xs={12} xl={10}>
              <Grid container spacing={16} justify="center">
                <Grid item xs={12}>
                  {/* <Hidden smDown>
                    <Typography variant="display4">Popular</Typography>
                  </Hidden>
                  <Hidden mdUp>
                    <Typography variant="display1">Popular</Typography>
                  </Hidden> */}
                  <Typography
                    variant="display1"
                    color={this.state.open === 'popular' ? 'primary' : 'default'}
                    onClick={() => this.selectStuff('popular')}
                    style={{cursor: 'pointer', display: 'inline-block', marginRight: 30}}
                  >
                    Popular
                  </Typography>
                  <Typography
                    variant="display1"
                    color={this.state.open === 'top_rated' ? 'primary' : 'default'}
                    onClick={() => this.selectStuff('top_rated')}
                    style={{cursor: 'pointer', display: 'inline-block', marginRight: 30}}
                  >
                    Top Rated
                  </Typography>
                  <Typography
                    variant="display1"
                    color={this.state.open === 'upcoming' ? 'primary' : 'default'}
                    onClick={() => this.selectStuff('upcoming')}
                    style={{cursor: 'pointer', display: 'inline-block'}}
                  >
                    Upcoming
                  </Typography>
                </Grid>
                {/* <CircularProgress /> */}
                {this.props.listOfThings.isFetching ?
                  <div>
                    <CircularProgress />
                  </div>
                  :
                  this.props.listOfThings.items && this.props.listOfThings.items.results.map( (thing: any, i: number) => {
                    return <Grid item xs={4} md={3} lg={2} key={i}>
                      <ContentCard
                        title={thing.title}
                        link={`/movie/${thing.id}`}
                        poster={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${thing.poster_path}`}
                      />
                    </Grid>;
                  })
                }
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Grid item>
                      <Button variant="fab" color="primary" style={{fontSize: 30}} disabled={this.state.page > 1 ? false : true} onClick={() => this.pageDown()}>
                        <FontAwesomeIcon icon={faLongArrowLeft} />
                      </Button>
                    </Grid>
                    <Grid item style={{display: 'flex', alignItems: 'center', padding: '0 30px'}}>
                      <Typography>Page {this.state.page} of 100</Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="fab" color="primary" style={{fontSize: 30}} disabled={this.state.page < 100 ? false : true} onClick={() => this.pageUp()}>
                        <FontAwesomeIcon icon={faLongArrowRight} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
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
    listOfThings: state.movieList,
  };
};

// Dispatch not working in current react-redux, so using any, but should be changed
const mapDispatchToProps = (dispatch: any, ownProps: HomeProps): ReduxDispatchProps => ({
  movieList: (foo: string, page: number) => dispatch(fetchMoviesList(foo, page)),
});

export default connect<ReduxStateProps, ReduxDispatchProps, HomeProps>
(mapStateToProps, mapDispatchToProps)(HomePage);
