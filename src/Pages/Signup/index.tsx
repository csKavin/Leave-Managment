import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../../Assests/companyLogoBg.png';
import { userSignUp } from '../../Apiservice/apiservice';
import Loader from '../../Components/Loader';

const useStyles = makeStyles((theme: any) => ({
    container: {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
        'background-color': 'white',
        'box-shadow': '0 0 40px rgba(0,0,0,0.16)',
        'border-radius': '12px',
        'width': '600px'
    },
    root: {
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        width: '100%',
    },
    cardHeader: {
        backgroundColor: '#1976d2',
        padding: '24px',
        fontSize: '22px'
    },
    signUp: {
        color: '#352F44',
        cursor: 'pointer',
        fontWeight: 600
    },
    roleSelected: {
        border: '1px solid #352F44',
        padding: '16px',
        borderRadius: '8px',
        cursor: 'pointer'
    }

}));

interface signUp {
    username: string,
    userEmail: string,
    confrimPassword: string,
    createPassword: string
}

const SignUp = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [signUp, setSignUp] = useState<signUp>({
        username: '',
        userEmail: '',
        createPassword: '',
        confrimPassword: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setSignUp((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignUp = () => {
        setLoader(true);
        let payload = {
            username: signUp.username,
            email: signUp.userEmail,
            password: signUp.confrimPassword,
            role: "employee"
        }
        if (signUp.createPassword === signUp.confrimPassword) {
            userSignUp(payload)
                .then((res) => {
                    setLoader(false);
                    alert("account created successfully");
                    navigate('/');
                })
                .catch((err) => {
                    setLoader(false);
                    let errMsg = err.response.data.message;
                    alert(errMsg);
                })
        }
        else {
            alert("password mismatch")
            setLoader(false);
        }

    }

    const handleBack = () => {
        navigate('/');
    }

    return (
        <div >
            <Loader loading={loader} />
            <div className={`p-4 ${classes.container}`}>
                <div className='d-flex justify-content-center'>
                    <img src={companyLogo} width={'100px'} height={'80px'} />
                </div>

                <div className='px-4'>
                    <>
                        <div className='pb-2 mt-4' >User Name</div>
                        <TextField className='w-100' placeholder='Eg.Tsquaredc' name="username" onChange={handleChange} required />
                        <div className='pb-2 mt-4'>User Email</div>
                        <TextField className='w-100' placeholder='Eg.test@tsquaredc.com' name="userEmail" onChange={handleChange} required />
                        <div className='pb-2 mt-4'>Create Password</div>
                        <TextField className='w-100 ' placeholder='Password@123#' name="createPassword" onChange={handleChange} required />
                        <div className='pb-2 mt-4'>Confrim Password</div>
                        <TextField className='w-100 ' placeholder='Password@123#' name='confrimPassword' onChange={handleChange} required />
                        <div className='d-flex justify-content-between mt-4'>
                            <Button onClick={() => handleBack()}>Back</Button>
                            <Button variant='contained' type='submit' onClick={(e) => handleSignUp()}>Sign Up</Button>
                        </div>
                    </>


                </div>
            </div >
        </div>
    )
}

export default SignUp