
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Submissions, Submission, GMap } from '../components';

const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
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


export class BoardT extends Submissions {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, sorting, selectedSubmission } = this.state;
    const { timestamp } = sorting;
    const { classes } = this.props;


    console.log(items, selectedSubmission);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              EOCS Challenge
          </Typography>
          </Toolbar>
        </AppBar>

        <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} anchor="left"  >
          <div className={classes.toolbar} >

            <Toolbar>
              {
                (!selectedSubmission) ?
                  <Fragment>
                    <IconButton className={classes.button} style={{ padding: "0 16px" }} aria-label="Delete" onClick={this.onSortingChange.bind(this, { timestamp: !timestamp })} >
                      {!timestamp ? <ArrowDownward /> : <ArrowUpward />}
                    </IconButton>
                    <Typography variant="h6" noWrap> Submisions </Typography>
                  </Fragment>

                  : <Fragment>
                    <IconButton className={classes.button} style={{ padding: "0 16px" }} aria-label="Delete" onClick={this.onSelectionChange.bind(this, null)} >
                      <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" noWrap> Submision </Typography>
                  </Fragment>

              }
            </Toolbar>

          </div>
          <Divider />
          <div>
            {(!selectedSubmission) ? super.render() : <Submission value={selectedSubmission} />}
          </div>
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

export const Board = (props) => {
  const classes = useStyles();


  return (<BoardT classes={classes} />);
};

export const PermanentDrawerLeft = (props) => {
  const classes = useStyles();

  const [selectedSubmission, setSelectedSubmission] = React.useState(null);
  const onSelect = (value) => setSelectedSubmission(value);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} anchor="left"  >
        <div className={classes.toolbar} >
          Heading..
        </div>
        <Divider />
        {selectedSubmission ? <Submission value={selectedSubmission} /> : <Submissions onSelect={onSelect} />}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <GMap />
      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  value: PropTypes.any
};
