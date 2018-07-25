import * as React from 'react';

// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import grey from '@material-ui/core/colors/grey';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ContentCard from '../components/ContentCard';

import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',

    minHeight: '100%',
  },

  media: {
    height: 0,
    paddingTop: '56.25%',

    [theme.breakpoints.up('sm')]: {
      paddingTop: '46.25%',
    },

    [theme.breakpoints.up('md')]: {
      paddingTop: '36.25%',
    }
  },

  posterWrapper: {
    bottom: -225,
    left: 16,
    position: 'absolute',

    [theme.breakpoints.down('sm')]: {
      bottom: -25,
      width: 100,
    }
  },

  posterImage: {
    display: 'block',
    width: '100%',
  },

  details: {
    padding: '32px 16px',

    [theme.breakpoints.up('md')]: {
      paddingLeft: 350
    },

    [theme.breakpoints.only('lg')]: {
      paddingRight: 200
    },

    [theme.breakpoints.only('xl')]: {
      paddingRight: 350
    }
  },
  
  main: {
    display: 'flex',
    flex: 1,
  },

  title: {
    color: grey[900],
    fontStyle: 'italic',
    fontWeight: 900,
  },

  card: {
    backgroundColor: 'transparent',
    border: 'none',
    overflow: 'visible',
    width: '100%',

    '&:hover': {
      boxShadow: 'none',
    }
  }
});

interface Props extends WithStyles<typeof styles> {
  title: string;
  tagline: string;
  poster: string;
  backdrop: string;
  overview: string;
  credits: any;
  genres: any;
  releaseDate: string;
  runtime: number;
}

type State = {
  open: boolean;
};

class Movie extends React.Component<Props, State> {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    // tslint:disable-next-line:no-console
    console.log('ahh', this.props.releaseDate);
    return (
      <div className={this.props.classes.main}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12}>
            <Grid container>
              <Card className={this.props.classes.card}>
                <div style={{position: 'relative'}}>
                  {/* <Button>View all</Button> */}
                  <CardMedia
                    className={this.props.classes.media}
                    image={`https://image.tmdb.org/t/p/original${this.props.backdrop}`}
                  />
                  <Paper elevation={10} className={this.props.classes.posterWrapper}>
                    <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.props.poster}`} className={this.props.classes.posterImage}/>
                  </Paper>
                </div>
                <div className={this.props.classes.details}>
                  <Hidden mdUp>
                    <Typography variant="display1" className={this.props.classes.title}>{this.props.title}</Typography>
                    <Typography variant="headline" color="textSecondary">{this.props.tagline}</Typography>
                  </Hidden>
                  <Hidden smDown>
                    <Typography variant="display2" className={this.props.classes.title}>{this.props.title}</Typography>
                    <Typography variant="display1" color="textSecondary">{this.props.tagline}</Typography>
                  </Hidden>

                  <Typography variant="title" style={{marginTop: 20}}>Storyline</Typography>
                  <Typography variant="subheading" gutterBottom>{this.props.overview}</Typography>

                  <Grid container>
                    <Grid item xs={12} sm={4} style={{marginTop: 20}}>
                      <Typography variant="title" gutterBottom>Runtime</Typography>
                      <Typography>{this.props.runtime} minutes</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{marginTop: 20}}>
                      <Typography variant="title" gutterBottom>Release date</Typography>
                      <Typography>{this.props.releaseDate}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{marginTop: 20}}>
                      <Typography variant="title" gutterBottom>Category</Typography>
                      {this.props.genres && this.props.genres.map((genre: any, i: number) => {
                        return (
                          <Chip 
                            key={i}
                            label={genre.name}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>
                  
                  <Typography variant="title" gutterBottom style={{marginTop: 20}}>Cast</Typography>
                  <Grid container spacing={32}>
                    {this.props.credits && this.props.credits.cast.slice(0, 6).map((person: any, i: number) => {
                      return (
                        <Grid item xs={4} sm={2} key={i}>
                          <ContentCard
                            title={person.name}
                            subtitle={person.character}
                            // link={`/${person.id}`}
                            link={`#`}
                            poster={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${person.profile_path}`}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                  {/* videos section */}
                </div>
              </Card>
            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Movie)) as any;
