import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import { Evaluate, SubmissionTitle, SubmissionSubTitle, Observations, PlatformInfos, Photos } from '.';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


const useListingStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        padding: 0
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));



export const Submission = ({ value, onClose }) => {
    const classes = useStyles();
    const listiingClasses = useListingStyles();
    const [showEvaluateModal, setShowEvaluateModal] = React.useState(false);

    function onEvaluationSuccess() {
        console.log('onEvaluationSuccess: success....');
        setShowEvaluateModal(false);
    }

    return (
        <Fragment>
            <Toolbar>
                <IconButton className={classes.button} style={{ padding: "0 16px" }} aria-label="Delete" onClick={onClose}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" noWrap> Submision </Typography>
            </Toolbar>

            <Divider />

            <div>
                <Grid container spacing={3} style={{ padding: '5px' }} >
                    <Grid item style={{ maxWidth: '320px', flexShrink: 0 }}>
                        <div className={classes.root}>
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
                                    <Button size="small" color="primary" style={{ flexDirection: 'column' }} onClick={() => setShowEvaluateModal(true)}>Evaluate</Button>
                                    {showEvaluateModal && <Evaluate open={showEvaluateModal} onClose={onEvaluationSuccess} />}
                                </CardActions>

                                <Divider />

                                <CardContent>
                                    <List className={listiingClasses.root} subheader={<li />}>
                                        <li className={listiingClasses.listSection}>
                                            <Observations className={listiingClasses.ul} values={value.landobservations} />
                                            <PlatformInfos className={listiingClasses.ul} values={value.platform} />
                                        </li>
                                    </List>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>

                    <Grid item style={{ width: 'auto', flexGrow: 1, maxWidth: 'calc(100% - 320px)' }} >
                        <Photos values={value.photos} />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
}