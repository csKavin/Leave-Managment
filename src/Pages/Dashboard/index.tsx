import { Grid, Typography } from '@mui/material'
import React from 'react'
import DashBoardCard from '../../Components/DashBoardCard'

interface cardDetails {
  heading: string,
  Total: number,
  subHeading: string
}

const index = () => {
  const cardDetails: cardDetails[] = [
    {
      heading: 'Available Leave Types',
      Total: 12,
      subHeading: 'Leave Types'
    },
    {
      heading: 'Registered Employees',
      Total: 13,
      subHeading: 'Active Employees'
    },
    {
      heading: 'Pending Application',
      Total: 5,
      subHeading: 'Pending'
    },
    {
      heading: 'Declined Application',
      Total: 4,
      subHeading: 'Declined'
    },
    {
      heading: 'Approved Application',
      Total: 9,
      subHeading: 'Approved'
    },
  ]
  return (
    <React.Fragment>
      <Typography sx={{ flexGrow: 1, color: 'theme.main',fontWeight:'bold'}}>Dashboard</Typography>
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

export default index