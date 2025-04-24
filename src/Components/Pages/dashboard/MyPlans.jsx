import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMyPlans } from '../../../util/dashboard'
import PlanCard from '../../Common/PlanCard'
import { Grid, Button } from "@mui/material"

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
    <div>
      <div>
        <h1>My Plans</h1>
        <Button component={Link} to="/account/create" color="inherit">
          Create New Plan
        </Button>
      </div>
      {error && <p>{error}</p>}
      {plans.length > 0 ? (
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={plan.planId}>
              <PlanCard 
                key={plan._id}
                image={plan.images[0]}
                title={plan.title}
                rate={plan.rate}
                type={plan.type}
                distance={plan.distance}
                stopCount={plan.stopCount}
              />
              <Button component={Link} to={`/account/${plan._id}`} color="primary" sx={{ marginTop: 1 }}>Edit</Button>
              <Button onClick={() => handleRemovePlan(plan._id)} color="error" sx={{ marginLeft: 1, marginTop: 1 }}>Remove</Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No plans found.</p>
      )}
    </div>
  )
}

export default MyPlans