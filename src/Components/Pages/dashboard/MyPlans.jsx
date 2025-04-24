import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMyPlans } from '../../../util/dashboard'
import PlanCard from '../../Common/PlanCard'
import { Grid } from "@mui/material"

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

  return (
    <div>
      <div>
        <h1>My Plans</h1>
        <Link to="/account/create">
          Create New Plan
        </Link>
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