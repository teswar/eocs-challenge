import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 'auto',
    transform: 'translateZ(0)',
  },
  gridListTitle: {
    maxHeight: '150px',
    width: '100%'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));


export const Photo = ({ value, classes }) => {
  return (
    <GridListTile className={classes.gridListTitle}>
      <img src={value.url} alt={value.direction} />
      <GridListTileBar className={classes.titleBar} title={value.direction} titlePosition="top" />
    </GridListTile>
  );
}


export const Photos = ({ values }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {values.map((value, index) => <Photo key={index} value={value} classes={classes} />)}
      </GridList>
    </div>
  );
}