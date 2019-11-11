import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {brown} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    Textarea: {
        width: 100,
        height: 100
    }
}));

export default function Textarea() {
    const classes = useStyles();
    return (
        <TextareaAutosize
            rows={3}
            aria-label="maximum height"
            placeholder="Write some notes"
            className={classes.Textarea}
        />
    );
}