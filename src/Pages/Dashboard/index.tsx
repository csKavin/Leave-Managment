import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashBoardCard from '../../Components/DashBoardCard'
import { dashboard } from '../../Apiservice/apiservice'

interface cardDetails {
  heading: string,
  Total: number,
  subHeading: string,
  history: string
}

const Index = () => {
  const [data, setData] = useState<any>([])
  useEffect(()=>{
    dashboard()
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>{
      alert("something went wrong")
    })
  },[setData])
  const cardDetails: cardDetails[] = [
    {
      heading: 'Available Leave Types',
      Total: data.totalLeave,
      subHeading: 'Leave Types',
      history: 'leavetypes'
    },
    // {
    //   heading: 'Registered Employees',
    //   Total: 13,
    //   subHeading: 'Active Employees'
    // },
    {
      heading: 'Pending Application',
      Total:data.pendingLeave,
      subHeading: 'Pending',
      history: 'pending'
    },
    {
      heading: 'Declined Application',
      Total: data.rejectedLeave,
      subHeading: 'Declined',
      history: 'approve'
    },
    {
      heading: 'Approved Application',
      Total: data.approvedLeave,
      subHeading: 'Approved',
      history: 'declined'
    },
  ]
  
  return (
    <React.Fragment>
      <Typography sx={{ flexGrow: 1, color: 'theme.main', fontWeight: 'bold' }}>Dashboard</Typography>
      <div className='mt-4'>
        <Grid container spacing={6} >
          {cardDetails.map((item, index) => {
            return <Grid item md={4} key={index}>
              <DashBoardCard {...item} />
            </Grid>
          })}

        </Grid>
      </div>
    </React.Fragment>
  )
}

export default Index