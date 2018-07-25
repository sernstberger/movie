import * as React from 'react';

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';

const styles = (theme: Theme) => createStyles({
  logo: {
    backgroundColor: theme.palette.primary.main,
    color: '#000',
    marginLeft: -24,
    overflow: 'hidden',
    padding: '20px 40px',
    textDecoration: 'none',
    
    '& h2': {
      transition: '250ms all',
    },

    '&:hover': {
      '& h2': {
        transform: 'scale(1.1)',
      }
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  children: any;
}

class Layout extends React.Component<Props, {}> {
  render() {
    return (
      <div style={{ padding: 16 }}>
        <AppBar position="fixed" color="default" elevation={1}>
          <Toolbar>
            <Link to="/" className={this.props.classes.logo}>
              <Typography variant="title" color="inherit">
                Cineplex
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Grid container spacing={32} justify="center" style={{ paddingTop: 70 }}>
          <Grid item xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
        <div style={{marginTop: 50, textAlign: 'center'}}>
          <Typography>Created by Steve Ernstberger.</Typography>
          <Typography>This product uses the TMDb API but is not endorsed or certified by TMDb.</Typography>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Layout)) as any;
