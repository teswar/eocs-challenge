import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createListing } from '../core/hocs'
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


function getSubmissions() {
    return axios.get('https://api.myjson.com/bins/jpfmg').then((data) => data.data);//[...data.data, ...data.data, ...data.data]);
}

const listingProps = {
    ParentComponent: Component,
    fetch: getSubmissions,
    initialState: { ...createListing.INITIAL_STATE, sorting: { timestamp: false } },
};

const Listing = createListing(listingProps);
export class Submissions extends Listing {

    constructor(props) {
        super(props);
        this.state = Object.assign(this.state, { selectedSubmission: null });
    }


    onSelectionChange(selectedSubmission) {
        console.log('onSelectionChange', arguments);
        this.setState({ selectedSubmission });
    }


    render() {
        const { items, isLoading } = this.state;
        console.log('Submissions.render', this.state);
        return (
            <Fragment>
                {isLoading && <div> Loading .... </div>}
                <div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
                    <List>
                        {items.map((value, index) => <Row key={value.id} value={value} isLast={index === (items.length - 1)} onClick={this.onSelectionChange.bind(this, value)} />)}
                    </List>
                </div>


            </Fragment>
        );
    }
}


export const SubmissionTitle = ({ value }) => {
    return (
        <Typography style={{ display: 'inline', textTransform: 'capitalize' }} component="span" variant="body2" color="textPrimary">
            {(!value.landobservations || !value.landobservations.length)
                ? ''
                : <Fragment>
                    {value.landobservations[0].landcover} , {value.landobservations[0].landuse}
                </Fragment>}
        </Typography>
    );
}


export const SubmissionSubTitle = ({ value }) => {
    return (
        <Fragment>
            {moment(value.timestamp).format('LLLL')}
        </Fragment>
    );
}


const Row = ({ value, onClick, children, isLast }) => {
    return (
        <Fragment>
            <ListItem alignItems="flex-start" onClick={onClick}>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={SubmissionTitle({ value })} secondary={SubmissionSubTitle({ value })} />
            </ListItem>
            {!isLast && <Divider />}
        </Fragment>

    );
};