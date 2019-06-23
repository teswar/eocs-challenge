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
import FormControlLabel from '@material-ui/core/FormControlLabel';

import axios from 'axios';
import { Evaluation } from '../core/enums'
import { isNumber, isUndefinedNullOrEmpty, fromSnakeCase, toTitleCase } from '../core/utils';


const EVALUATIONS = Object.keys(Evaluation).reduce((result, key) => {
    if (isNumber(key)) { result.push({ key: Number(key), value: Evaluation[key], text: toTitleCase(fromSnakeCase(Evaluation[key])) }); }
    return result;
}, []);



function postEvaluation(value) {
    return axios.post('https://demo0929535.mockable.io/evaluate', value).then((data) => data.data);
}


export const Evaluate = ({ open, onClose }) => {

    const [formData, setFormData] = React.useState({ evaluation: '', comment: '' });
    const [errors, setErrors] = React.useState(null);;
    const { evaluation, comment } = formData;

    function onChange(value) {
        setFormData({ ...formData, ...value });
    }

    function validate(data) {
        let dataErrors = {};
        if (!data || !data.evaluation) { dataErrors.evaluation = 'Is required' };
        return dataErrors;
    }

    function onSubmit() {
        Promise.resolve()
            .then((errs) => {
                var errs = validate(formData);
                setErrors(errs);
                const postData = { ...formData, evaluation: Evaluation[formData.evaluation], }
                return isUndefinedNullOrEmpty(errs)
                    ? postEvaluation(postData).catch(() => Promise.reject(alert("Evaluation submission failed ...!!")))
                    : Promise.reject(alert("Error, fill in required fields ...!!"));
            })
            .then(() => onClose(true));

    }

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Evaluate</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please leave feedback in the comments section, it will help user to understand of your opinion.</DialogContentText>
                    <RadioGroup name="evaluation" value={evaluation} onChange={(e) => onChange({ evaluation: e.target.value })}>
                        {
                            EVALUATIONS.map(({ key, value, text }) => <FormControlLabel key={key} name="evaluation" value={value} label={text} control={<Radio />} />)
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