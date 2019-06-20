import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export const Observation = ({ value }) => {
  return (
    <ListItem >
      <ListItemText primary={`${value.landcover}, ${value.landuse}`} />
    </ListItem>
  );
}


export const Observations = ({ values }) => {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      <li className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>{`Land cover, Land use`}</ListSubheader>
          {values.map((item, index) => <Observation key={index} value={item} />)}
        </ul>
      </li>
    </List>
  );
}