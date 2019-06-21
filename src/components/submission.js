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

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


import { Evaluate, SubmissionTitle, SubmissionSubTitle, Observations, Photos } from '.';

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
    const [showEvaluateModal, setShowEvaluateModal] = React.useState(false);

    function handleChange(event, newValue) {
        setSelectedTab(newValue);
    }

    function onEvaluationSuccess() {
        console.log('onEvaluationSuccess: success....');
        setShowEvaluateModal(false);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">

                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia component="img" alt="Contemplative Reptile" height="140" image={value.photos[0].url} title="Contemplative Reptile" />
                        <CardContent>
                            <SubmissionTitle gutterBottom variant="h5" component="h2" value={value} />
                            <Typography variant="body2" color="textSecondary" component="p">
                                <SubmissionSubTitle value={value} />
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => setShowEvaluateModal(true)} > Evaluate  </Button>
                        {showEvaluateModal && <Evaluate open={showEvaluateModal} onClose={onEvaluationSuccess} />}
                    </CardActions>
                </Card>


                <Tabs value={selectedTab} onChange={handleChange} variant="scrollable" scrollButtons="on" indicatorColor="primary" textColor="primary" >
                    <Tab label="Observations" icon={<PhoneIcon />} />
                    <Tab label="Photos" icon={<FavoriteIcon />} />
                    <Tab label="Platform" icon={<PersonPinIcon />} />
                </Tabs>
            </AppBar>
            <div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
                {selectedTab === 0 && <Observations values={value.landobservations} />}
                {selectedTab === 1 && <Photos values={value.photos} />}
                {selectedTab === 2 && <TabContainer>Platform....</TabContainer>}
            </div>


        </div>
    );
}