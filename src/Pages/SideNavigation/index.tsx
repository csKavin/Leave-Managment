import * as React from 'react';
import { ReactNode } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import logo from "../../Assests/companyLogo.png";

const drawerWidth = 260;

interface ISideNavigation {
    children: ReactNode;
    window?: () => Window;
}

interface RouteParams {
    id: string;
}

const SideNavigation: React.FunctionComponent<ISideNavigation> = ({ children, window }) => {
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname.split("/");
    const userLogin = localStorage.getItem('LogIn');
    const userName = localStorage.getItem('userName')

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleRoutes = (routes: string) => {
        navigate(`/${routes}`)
    }

    const handleLogout = () => {
        navigate('/');
        localStorage.clear();
    }

    const EmployeeDrawer = (
        <div>
            <Toolbar ><img src={logo} width={'40px'} height={'40px'} /><Typography className='mx-2'>Leave Managment</Typography></Toolbar>
            <Divider sx={{ backgroundColor: 'white' }} />
            <br />
            <List className='mt-4 '>
                <ListItem disablePadding sx={{ borderLeft: url[1] == "applyleave" ? '3px solid white' : 'none' }}>
                    <ListItemButton onClick={() => handleRoutes('applyleave')}>
                        <ListItemIcon>
                            <DashboardRoundedIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={'Apply Leave'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ borderLeft: url[1] == "leavehistory" ? '3px solid white' : 'none' }}>
                    <ListItemButton onClick={() => handleRoutes('leavehistory')}>
                        <ListItemIcon>
                            <AssignmentTurnedInRoundedIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={'View My History'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    )
    const Managerdrawer = (
        <div>
            <Toolbar ><img src={logo} width={'40px'} height={'40px'} /><Typography className='mx-2'>Leave Managment</Typography></Toolbar>
            <Divider sx={{ backgroundColor: 'white' }} />
            <br />
            <List className='mt-4 '>
                <ListItem disablePadding sx={{ borderLeft: url[1] == "dashboard" ? '3px solid white' : 'none' }}>
                    <ListItemButton onClick={() => handleRoutes('dashboard')}>
                        <ListItemIcon>
                            <DashboardRoundedIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ borderLeft: url[1] == "leavetypes" ? '3px solid white' : 'none' }} className='mt-2'>
                    <ListItemButton onClick={() => handleRoutes('leavetypes')}>
                        <ListItemIcon>
                            <BeenhereIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={'Leave Types'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ borderLeft: url[1] == "employee" ? '3px solid white' : 'none' }} className='mt-2'>
                    <ListItemButton onClick={() => handleRoutes('employee')}>
                        <ListItemIcon>
                            <AccountBoxRoundedIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={'Employee Section'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ borderLeft: url[1] == "pending" ? '3px solid white' : 'none' }} className='mt-2'>
                    <ListItemButton onClick={() => handleRoutes('pending')}>
                        <ListItemIcon>
                            <PendingActionsRoundedIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={'Pending Request'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ borderLeft: url[1] == "approve" ? '3px solid white' : 'none' }} className='mt-2'>
                    <ListItemButton onClick={() => handleRoutes('approve')}>
                        <ListItemIcon>
                            <AssignmentTurnedInRoundedIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={'Approved List'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ borderLeft: url[1] == "declined" ? '3px solid white' : 'none' }} className='mt-2'>
                    <ListItemButton onClick={() => handleRoutes('declined')}>
                        <ListItemIcon>
                            <ThumbDownAltRoundedIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={'Declined Request'} />
                    </ListItemButton>
                </ListItem>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {userLogin == "employee" ? EmployeeDrawer : Managerdrawer}
                    {/* <Typography className='text-center'>Powered By Kavin</Typography> */}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth,
                            backgroundColor: 'theme.main',
                            color: 'white'
                        },
                    }}
                    open
                >
                    {userLogin == "employee" ? EmployeeDrawer : Managerdrawer}
                    <div style={{position:'absolute',bottom:0}} className='mx-5'>Powered By Kavin</div>

                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <AppBar position="sticky" sx={{ backgroundColor: 'white', 'box-shadow': '0 0 40px rgba(0,0,0,0.16)' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'theme.main' }} >
                            Welcome <span className='fw-bold'>{userName}!</span>
                        </Typography>
                        <Button color="primary" variant='contained' onClick={(e) => handleLogout()}>Log out</Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ flexGrow: 1 }} className="p-4 mt-4">
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default SideNavigation;