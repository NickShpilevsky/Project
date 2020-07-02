import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { brown, red } from '@material-ui/core/colors';

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(brown[500]),
        backgroundColor: brown[900],
        '&:hover': {
            backgroundColor: brown[700],
        },
    },
}))(Button);

const RemoveButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[900],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}))(Button);

const useStyles = makeStyles(theme => ({
    myButton: {
        margin: theme.spacing(1),
        width: 150
    },
    removeButton: {
        margin: theme.spacing(1),
        width: 170
    }
}));

function MyButton({action, title}) {
    const classes = useStyles();
    return (
        <div>
            <ColorButton onClick={action} variant="contained" color="primary" className={classes.myButton}>
                {title}
            </ColorButton>
        </div>
    );
}

function MyRemoveButton({action, title}) {
    const classes = useStyles();
    return (
        <div>
            <RemoveButton onClick={action} variant="contained" color="primary" className={classes.removeButton}>
                {title}
                {
                    title === 'remove Note' ? (
                        <DeleteIcon />
                    ) : (
                        null
                    )
                }
            </RemoveButton>
        </div>
    );
}

export {
    MyButton,
    MyRemoveButton,
}