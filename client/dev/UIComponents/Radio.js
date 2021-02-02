import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
}));

function RadioButtonsGroup (props) {
    const {takeStatus, oldStatus} = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(oldStatus || '');

    function handleChange(e) {
        setValue(e.target.value);
        takeStatus(e.target.value);
    }

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Choose status:</FormLabel>
                <RadioGroup
                    aria-label="Choose"
                    name="status"
                    className={classes.group}
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="active"
                        control={<Radio color="primary" />}
                        label="active"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="unnecessary"
                        control={<Radio color="primary" />}
                        label="unnecessary"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="in work"
                        control={<Radio color="primary" />}
                        label="in work"
                        labelPlacement="start"
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default RadioButtonsGroup;