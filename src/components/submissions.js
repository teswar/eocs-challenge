import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { createListing } from '../core/hocs'

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import moment from 'moment';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';


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
        this.setState({ selectedSubmission });
    }

    render() {
        const { items, sorting, isLoading } = this.state;
        const { classes } = this.props;
        const { timestamp } = sorting;

        return (
            <Fragment>
                <div className={classes.toolbar} >
                    <Toolbar>

                        <Fragment>
                            <IconButton className={classes.button} style={{ padding: "0 16px" }} aria-label="Delete" onClick={this.onSortingChange.bind(this, { timestamp: !timestamp })} >
                                {!timestamp ? <ArrowDownward /> : <ArrowUpward />}
                            </IconButton>
                            <Typography variant="h6" noWrap> Submisions </Typography>
                        </Fragment>
                    </Toolbar>
                </div>

                <Divider />

                <div>
                    {isLoading && <div> Loading .... </div>}
                    <div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
                        <List>
                            {items.map((value, index) => <Row key={value.id} value={value} isLast={index === (items.length - 1)} onClick={() => this.onSelectionChange(value)} />)}
                        </List>
                    </div>
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
    return (<Fragment>{moment(value.timestamp).format('LLLL')}</Fragment>);
}


const Row = ({ value, onClick, isLast }) => {
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