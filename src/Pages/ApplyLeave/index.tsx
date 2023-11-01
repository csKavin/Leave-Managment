import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material';
import { applyLeave, getLeave } from '../../Apiservice/apiservice';
import Loader from '../../Components/Loader';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme: any) => ({
    container: {
        'background-color': 'white',
        'box-shadow': '0 0 40px rgba(0,0,0,0.16)',
        'border-radius': '12px',
    }

}));

interface IApplyLeave {
    start_date: string | any,
    end_date: string | any,
    leave_type: string,
    description: string,
    user_name: string | any,
    email: string | any
}

interface leaveType {
    leavetype : string   
}

const ApplyLeave = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [loader, setLoader] = React.useState(false);
    const [type, setType] = React.useState('');
    const [startDate, setStartDate] = React.useState<string | null>(null);
    const [endDate, setEndDate] = React.useState<string | null>(null);
    const [description, setDescription] = React.useState<string>('');
    const [leave, setLeave] = React.useState([])
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    const handleStartDate = (date: any) => {
        setStartDate(date.toString());
    };
    const handleEndDate = (date: any) => {
        setEndDate(date.toString());
    };
    const handleChange = (event: any) => {
        setType(event.target.value);
    };
    const handleDescription = (event: any) => {
        setDescription(event.target.value)
    }

    React.useEffect(() => {
        if(leave){
            getLeave()
            .then((res) => {
                if (res.data)
                    setLeave(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
        }
      
    },[])

    const handleApplyLeave = () => {
        setLoader(true);
        let payload: IApplyLeave = {
            start_date: startDate,
            end_date: endDate,
            leave_type: type,
            description: description,
            user_name: userName,
            email: email
        }
        applyLeave(payload)
            .then((res) => {
                if (res.data) {
                    alert("Leave Applied Successfully");
                    setStartDate('');
                    setEndDate('');
                    setDescription('');
                    setType('');
                    setLoader(false);
                    navigate('/leavehistory')
                }
            })
            .catch((err) => {
                setLoader(false);
                console.log(err);
            })
    }

    return (
        <div>
         <Loader loading={loader} />
            <div className={`p-4 ${classes.container}`}>
                <div className='fw-bold text-center'>Employee Leave Form</div>
                <div className='mt-4'>please fill up the form below</div>
                <div className='mt-4'>Starting Date</div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        className='w-100 mt-2'
                        value={startDate}
                        onChange={handleStartDate} />
                </LocalizationProvider>
                <div className='mt-4'>End Date</div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker className='w-100 mt-2' value={endDate} onChange={handleEndDate} />
                </LocalizationProvider>
                <div className='mt-4'>Your Leave Type</div>
                <FormControl fullWidth className='mt-2'>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={handleChange}
                    >
                        {leave.map((item : leaveType, index : number) => {
                          return  <MenuItem value={item.leavetype}>{item.leavetype}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <div className='mt-4'> Describe Your condition</div>
                <TextField multiline rows={6} className='w-100 mt-2' name="description" onChange={(event) => handleDescription(event)} />
                <div className='mt-4 d-flex justify-content-end'>
                    <Button onClick={() => handleApplyLeave()}>Apply Leave</Button>
                </div>
            </div>
        </div>
    )
}

export default ApplyLeave;