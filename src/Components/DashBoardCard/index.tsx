import makeStyles from '@mui/styles/makeStyles';
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Data {
    heading: string,
    Total: number,
    subHeading: string,
    history: string
}

const useStyles = makeStyles((theme: any) => ({
    cardContainer: {
        'box-shadow': '0 0 40px rgba(0,0,0,0.16) !important',
        borderRadius: '12px',
        borderLeft: '4px solid #5C5470 !important',
        cursor: 'pointer'
    },
    heading: {
        color: '#5C5470',
        fontWeight: '600'
    }
}))

const DashBoardCard = (props: Data) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleClick = (x: string) => {
        navigate(`/${x}`)
    }
    return (
        <div>
            <div className={`p-4 card border-0 ${classes.cardContainer}`} onClick={() => handleClick(props.history)}>
                <div className={classes.heading}>{props.heading}</div>
                <div className='d-flex justify-content-between align-items-center mt-4'>
                    <div className='d-flex align-items-end gap-3'>
                        <Typography className=' fs-1 fw-bold' sx={{ color: 'theme.main' }}>{props.Total}</Typography>
                        <Typography className='mb-3' sx={{ color: 'theme.main' }}>{props.subHeading}</Typography>
                    </div>
                    <div><BsBoxArrowUpRight style={{ color: '#5C5470', width: '50px', height: '25px' }} /></div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardCard