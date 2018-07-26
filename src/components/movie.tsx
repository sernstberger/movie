import * as React from 'react';

import Button from '@material-ui/core/Button';
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

import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight, faTimes } from '@fortawesome/pro-light-svg-icons';

library.add(faLongArrowRight, faTimes);

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

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
  imagesList: any;
}

type State = {
  open: boolean;
  photo: string;
  photoNumber: number;
};

class Movie extends React.Component<Props, State> {
  state = {
    open: false,
    photo: '',
    photoNumber: 0,
  };

  handleClickOpen = (photo: string, photoNumber: number) => {
    this.setState({ 
      open: true,
      photo,
      photoNumber: photoNumber + 1,
    });
  };

  handleNextPhoto = (photo: string, photoNumber: number) => {
    this.setState({ 
      photo,
      photoNumber: photoNumber + 1,
    });
  };

  handlePrevPhoto = (photo: string, photoNumber: number) => {
    this.setState({ 
      photo,
      photoNumber: photoNumber - 1,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className={this.props.classes.main}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12}>
            <Grid container>
              <Card className={this.props.classes.card}>
                <div style={{position: 'relative'}}>

                  <Button
                    variant="contained"
                    // color="default"
                    onClick={() => this.handleClickOpen(`https://image.tmdb.org/t/p/original${this.props.backdrop}`, 0)}
                    style={{
                      bottom: 10,
                      position: 'absolute',
                      right: 10,
                    }}
                  >
                    View All Photos
                  </Button>

                  <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    fullScreen
                    // scroll="body"
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    {/* <DialogTitle id="alert-dialog-slide-title">
                      {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent
                      style={{
                        padding: 0,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Button onClick={this.handleClose} variant="fab" color="primary" style={{fontSize: 30, position: 'absolute', right: 10, top: 10}}>
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>

                      <Button
                        onClick={() => this.handleNextPhoto(`https://image.tmdb.org/t/p/original${this.props.imagesList.backdrops[`${this.state.photoNumber}`].file_path}`, this.state.photoNumber)}
                        variant="fab"
                        color="primary"
                        style={{fontSize: 30, position: 'absolute', right: 10, top: 100}}
                      >
                        <FontAwesomeIcon icon={faLongArrowRight} />
                      </Button>

                      <Button
                        onClick={() => this.handlePrevPhoto(`https://image.tmdb.org/t/p/original${this.props.imagesList.backdrops[`${this.state.photoNumber}`].file_path}`, this.state.photoNumber)}
                        variant="fab"
                        color="primary"
                        style={{fontSize: 30, position: 'absolute', left: 10, top: 100}}
                      >
                        <FontAwesomeIcon icon={faLongArrowRight} />
                      </Button>

                      <img src={this.state.photo} alt={this.props.title} style={{maxWidth: '100%'}}/>
                    </DialogContent>
                    {/* <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Disagree
                      </Button>
                      <Button onClick={this.handleClose} color="primary">
                        Agree
                      </Button>
                    </DialogActions> */}
                  </Dialog>
    
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
                  
                  <Typography variant="title" gutterBottom style={{marginTop: 20}}>Photos</Typography>
                  <Grid container spacing={16}>
                    {this.props.imagesList && this.props.imagesList.backdrops.map((image: any, i: number) => {
                      return (
                        <Grid item xs={6} sm={4} key={i}>
                          <img
                            src={`https://image.tmdb.org/t/p/w700_and_h392_bestv2${image.file_path}`}
                            style={{maxWidth: '100%'}}
                            // onClick={() => this.handleNextPhoto(`https://image.tmdb.org/t/p/original${this.props.imagesList.backdrops[`${i}`].file_path}`, i)}
                            onClick={() => this.handleClickOpen(`https://image.tmdb.org/t/p/original${image.file_path}`, i)}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
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
