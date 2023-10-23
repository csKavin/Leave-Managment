import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles((theme: any) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0,0,0,0.3)',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function Loader({ loading }: { loading: boolean }) {
    const classes = useStyles();

    return (
        <div>
            {
                loading ?
                    < div className={classes.root} data-testId='KenLoader'>
                        <CircularProgress sx={{ color: "black" }} />
                    </div>
                    : null

            }

        </div >
    );
}
