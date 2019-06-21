import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import axios from 'axios';

import { Evaluation } from '../core/enums'
import { isNumber } from '../core/utils';

const EVALUATIONS = Object.keys(Evaluation).reduce((result, key) => {
    if (isNumber(key)) { result.push({ id: Number(key), text: Evaluation[key] }); }
    return result;
}, []);

function postEvaluation(value) {
    return axios.post('https://demo0929535.mockable.io/evaluate', value).then((data) => data.data);
}

export const Evaluate = ({ open, onClose }) => {

    const [formData, setFormData] = React.useState({ evaluation: Evaluation.REJECTED, comment: '' });
    const { evaluation, comment } = formData;

    function onChange(value) {
        console.log('onChange', value);
        setFormData({ ...formData, ...value });
    }

    function onSubmit() {
        console.log('onSubmit', formData);

        return postEvaluation(formData).then((response) => {
            console.log(response);
            onClose(true);
        });
    }

    console.log(formData);

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>

                    <RadioGroup name="evaluation" value={evaluation} onChange={(e) => onChange({ evaluation: Number(e.target.value) })}>
                        {
                            EVALUATIONS.map(({ id, text }) => <FormControlLabel key={id} name="evaluation" value={id} label={text} control={<Radio />} />)
                        }
                    </RadioGroup>

                    <TextField name="comment" margin="dense" label="Comments" type="email" fullWidth autoFocus value={comment} onChange={(e) => onChange({ comment: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary"> Cancel </Button>
                    <Button onClick={onSubmit} color="primary"> Send </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
