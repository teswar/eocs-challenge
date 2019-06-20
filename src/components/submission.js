import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { Observations, Photos } from '.';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export const Submission = ({ value }) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);

    function handleChange(event, newValue) {
        setSelectedTab(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="on" indicatorColor="primary" textColor="primary" >
                    <Tab label="Observations" icon={<PhoneIcon />} />
                    <Tab label="Photos" icon={<FavoriteIcon />} />
                    <Tab label="Platform" icon={<PersonPinIcon />} />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <Observations values={value.landobservations}/>}
            {selectedTab === 1 && <Photos values={value.photos}/>}
            {selectedTab === 2 && <TabContainer>Platform....</TabContainer>}
        </div>
    );
}