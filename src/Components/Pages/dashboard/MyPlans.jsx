import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMyPlans } from '../../../util/dashboard'
import PlanCard from '../../Common/PlanCard'
import { Box, Grid, Button, Typography } from "@mui/material"

function MyPlans() {
  const [plans, setPlans] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      const data = await getMyPlans(setError)
      if (!data) return
      setPlans(data.items || [])
    })()
  }, [])

  const handleRemovePlan = async (planId) => {
    console.log('Do remove!', planId)
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4">
          My Plans
        </Typography>
        <Button component={Link} to="/account/create" color="inherit">
          Create New Plan
        </Button>
      </Box>
      {error && <p>{error}</p>}
      {plans.length > 0 ? (
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={plan._id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <PlanCard 
                image={plan.images[0]}
                title={plan.title}
                rate={plan.rate}
                type={plan.type}
                distance={plan.distance}
                stopCount={plan.stopCount}
              />
              <Box>
                <Button component={Link} to={`/account/${plan._id}`} sx={{ marginTop: 1 }}>Edit</Button>
                <Button onClick={() => handleRemovePlan(plan._id)} style={{ backgroundColor: '#f44336', color: 'white' }} sx={{ marginLeft: 1, marginTop: 1 }}>Remove</Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No plans found.</p>
      )}
    </>
  )
}

export default MyPlans