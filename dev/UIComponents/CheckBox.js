import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function CheckboxesGroup( {takeCategory} ) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        Art: false,
        Technologies: false,
        Nature: false,
    });

    const { Art, Technologies, Nature } = state;

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
        takeCategory(name);
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" color="secondary">Choose Categories:</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={Art} onChange={handleChange('Art')} value="Art" />}
                        label="Art"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={Technologies} onChange={handleChange('Technologies')} value="Technologies" />}
                        label="Technologies"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={Nature} onChange={handleChange('Nature')} value="Nature" />
                        }
                        label="Nature"
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
}