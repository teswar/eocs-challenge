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
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useSnackbar } from 'notistack';

import axios from 'axios';
import { Evaluation } from '../core/enums'
import { isNumber, isUndefinedNullOrEmpty, fromSnakeCase, toTitleCase } from '../core/utils';
import { CloseDiscardConfirmation } from '.';


const EVALUATIONS = Object.keys(Evaluation).reduce((result, key) => {
  if (isNumber(key)) { result.push({ key: Number(key), value: Evaluation[key], text: toTitleCase(fromSnakeCase(Evaluation[key])) }); }
  return result;
}, []);



function postEvaluation(value) {
  return axios.post('https://demo0929535.mockable.io/evaluate', value).then((data) => data.data);
}


export const Evaluate = ({ submission, open, onClose: close }) => {

  const { enqueueSnackbar } = useSnackbar();
  const notify = (message) => enqueueSnackbar(message, { variant: 'error', key: 'submission' });
  const [formData, setFormData] = React.useState({ evaluation: '', comment: '' });
  const [dirty, setDirty] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const { evaluation, comment } = formData;

  function onChange(value) {
    setFormData({ ...formData, ...value });
    setDirty(true);
  }

  function validate(data) {
    let errs = {};
    if (!data || !data.evaluation) { errs.evaluation = 'Is required' };
    return errs
  }

  function onCloseConfirmation(confirm) {
    setShowConfirmation(false);
    if (confirm) { close(); }
  }

  function onCancel() {
    if (dirty) { return setShowConfirmation(true); }
    close();
  }

  function onSend() {
    Promise.resolve().then(() => validate(formData))
      .then((errs) => setErrors(errs) || errs)
      .then((errs) => {
        const { id: submissionId } = submission;
        const postData = { submissionId, ...formData, evaluation: Evaluation[formData.evaluation] };
        return isUndefinedNullOrEmpty(errs)
          ? postEvaluation(postData).catch(() => Promise.reject(notify("Error while sending evaluation...!!")))
          : Promise.reject();
      })
      .then(() => close(true));

  }

  return (
    <div>
      <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
        <DialogTitle>Evaluate</DialogTitle>
        <DialogContent>
          <DialogContentText>Please leave feedback in the comments section, it will help user to understand of your opinion.</DialogContentText>

          <FormControl error={(errors && !!errors.evaluation)}>
            <RadioGroup name="evaluation" value={evaluation} onChange={(e) => onChange({ evaluation: e.target.value })}>
              {
                EVALUATIONS.map(({ key, value, text }) => <FormControlLabel key={key} name="evaluation" value={value} label={text} control={<Radio />} />)
              }
            </RadioGroup>
            {errors && !!errors.evaluation && <FormHelperText>{errors.evaluation}</FormHelperText>}
          </FormControl>
          <TextField name="comment" margin="dense" label="Comments" type="email" fullWidth multiline autoFocus value={comment} onChange={(e) => onChange({ comment: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">Cancel</Button>
          <Button disabled={!dirty || !isUndefinedNullOrEmpty(errors)} onClick={onSend} color="primary">Send</Button>
        </DialogActions>
      </Dialog>
      {showConfirmation && <CloseDiscardConfirmation open={showConfirmation} onClose={onCloseConfirmation} />}
    </div>
  );
}