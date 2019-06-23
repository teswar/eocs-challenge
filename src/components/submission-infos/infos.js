import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(theme => ({
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  }
}));


const InfoItem = ({ text }) => {
  return (
    <ListItem >
      <ListItemText primary={text} />
    </ListItem>
  );
}


export const Infos = ({ header, values }) => {
  const classes = useStyles();

  return (
    <ul className={classes.ul}>
      <ListSubheader>{header}</ListSubheader>
      {values.map((item, index) => <InfoItem key={index} text={item} />)}
    </ul>
  );
}
