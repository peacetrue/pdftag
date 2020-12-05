import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            // margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButton({label = '上传', icon, accept, onChange}) {
    const classes = useStyles();
    let ref = React.createRef();
    return (
        <div className={classes.root}>
            <input
                ref={ref}
                id="contained-button-file"
                className={classes.input}
                accept={accept}
                // multiple
                type="file"
                onChange={event => {
                    event.stopPropagation();
                    onChange(ref.current.files);
                }}
            />
            <label htmlFor="contained-button-file">
                <Button startIcon={icon}
                        component="span"
                    // variant="contained"
                        variant="outlined"
                        color="primary"
                >
                    {label}
                </Button>
            </label>
        </div>
    );
}
