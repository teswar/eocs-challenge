import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { toTitleCase } from '../core/utils';


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
    <div className={classes.gridListTitle}>
      <img src={value.url} alt={value.direction} />
      <div className={classes.titleBar} title={value.direction} />
    </div>
  );
}


export const Photos = ({ values }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div className={classes.root}>
      <Photo value={values[selectedIndex]} classes={classes} />
      <ThumbnailsSlider values={values} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
    </div>
  );
}


const thumbnailsSliderStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export const ThumbnailsSlider = ({ values, selectedIndex, onSelect }) => {
  const classes = thumbnailsSliderStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {
          values.map((value, index) => (
            <GridListTile key={value.direction} onClick={() => onSelect(index)}>
              <img src={value.url} alt={value.direction} />
              <GridListTileBar title={toTitleCase(value.direction)} classes={{ root: classes.titleBar }} />
            </GridListTile>
          ))
        }
      </GridList>
    </div>
  );
}



