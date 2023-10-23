import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Button, Card, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginPage from '../../Assests/bglogin.jpg';
import companyLogo from '../../Assests/companyLogoBg.png';
import {  userLogin, setAuthToken } from '../../Apiservice/apiservice';
import Loader from '../../Components/Loader';


interface ILogin {
    email: string;
    password: string;
}

const useStyles = makeStyles((theme: any) => ({
    container: {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
        'background-color': 'white',
        'box-shadow': '0 0 40px rgba(0,0,0,0.16)',
        'border-radius': '12px',
        'width': '900px'
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

const Index = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handleSignUp = () => {
        navigate('/signup')
    }
    const handleLogin = () => {
        setLoader(true);
        userLogin(login)
            .then((res) => {
                const { accessToken, userDetails } = res.data;
                const { role, userName } = userDetails;
                if (role == "manager") {
                    navigate('/dashboard')
                }
                else {
                    navigate('/applyleave')
                }
                localStorage.setItem("accessToken", accessToken)
                setAuthToken(accessToken);
                localStorage.setItem("LogIn", role)
                localStorage.setItem("userName", userName)
                setLoader(false);
            })
            .catch((err) => {
                let errMsg = err?.response?.data?.message;
                alert(errMsg);
                setLoader(false);
            })
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setLogin((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div >
            <Loader loading={loader} />
            <div className={`p-4 ${classes.container}`}>
                <div className='d-flex justify-content-center'>
                    <img src={companyLogo} width={'100px'} height={'80px'} />
                </div>
                <Grid container spacing={6}>
                    <Grid item md={6} xs={0}>
                        <div className='w-100 h-100 d-flex text-center align-items-center'>
                            <img src={loginPage} className={classes.root} />
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <div className='px-4'>
                            <>
                                <form >
                                    <div className='pb-2 mt-4'>User Email</div>
                                    <TextField className='w-100' name="email" placeholder='Eg.test@tsquaredc.com' type='email' required onChange={handleChange} value={login.email} />
                                    <div className='pb-2 mt-4'>User Password</div>
                                    <TextField className='w-100 ' name='password' placeholder='Password@123#' required onChange={handleChange} value={login.password} />
                                    <div className='d-flex justify-content-between mt-4'>
                                        <div className='align-self-center'>
                                            No account ? <span className={classes.signUp} onClick={() => handleSignUp()}>sign up</span>
                                        </div>
                                        <Button variant='contained' sx={{ bgcolor: 'theme.light' }} onClick={(e) => handleLogin()} >Login</Button>
                                    </div>
                                </form>
                            </>
                        </div>
                    </Grid>

                </Grid>

            </div >
        </div>
    )
}

export default Index