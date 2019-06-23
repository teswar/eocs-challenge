import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Submissions, Submission, GMap } from '../components';


const drawerWidth = '60%';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    height: `calc(100vh - 64px)`,
    boxSizing: 'border-box'
  },
}));


class BoardComponent extends Submissions {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, selectedSubmission } = this.state;
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>EOCS Challenge</Typography>
          </Toolbar>
        </AppBar>

        <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} anchor="left" >
          {(!selectedSubmission) ? super.render() : <Submission value={selectedSubmission} onClose={this.onSelectionChange.bind(this, null)} />}
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{ position: 'relative', height: '100%' }}>
            <GMap {...{ submissions: items, submission: selectedSubmission }} />
          </div>
        </main>
      </div>
    );
  }
}

export const Board = (props) => (<BoardComponent classes={useStyles()} />);

