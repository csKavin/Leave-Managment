import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Themes } from './Helpers/themes';
import { Outlet } from "react-router-dom";
import { setAuthToken } from './Apiservice/apiservice';
const Login = React.lazy(() => import('./Pages/Login'));
const SignUp = React.lazy(() => import('./Pages/Signup'));
const Dashboard = React.lazy(() => import('./Pages/Dashboard'));
const SideNavigation = React.lazy(() => import('./Pages/SideNavigation'));
const EmployeeSection = React.lazy(() => import('./Pages/EmployeeSection'));
const LeaveTypes = React.lazy(() => import('./Pages/Leavetypes'));
const ApplyLeave = React.lazy(() => import('./Pages/ApplyLeave'));
const LeaveHistory = React.lazy(() => import('./Pages/LeaveHistory'));
const PendingRequest = React.lazy(() => import('./Pages/PendingRequest'));
const ApprovedRequest = React.lazy(() => import('./Pages/ApprovedRequest'));
const RejectedList = React.lazy(() => import('./Pages/RejectedList'));

function App() {
  const token = localStorage.getItem("accessToken")
  useEffect(() => { setAuthToken(token) }, [token])
  return (
    <Themes>
      <Suspense>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {token &&
            <Route element={<SideNavigation> <Outlet /> </SideNavigation>}>
              {/* manager login */}
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/leavetypes' element={<LeaveTypes />} />
              <Route path='/employee' element={<EmployeeSection />} />
              <Route path='/pending' element={<PendingRequest />} />
              <Route path='/approve' element={<ApprovedRequest />} />
              <Route path='/declined' element={<RejectedList />} />
              {/* employee login */}
              <Route path='/applyleave' element={<ApplyLeave />} />
              <Route path='/leavehistory' element={<LeaveHistory />} />
            </Route>}
        </Routes>
      </Suspense>
    </Themes>
  );
}

export default App;
