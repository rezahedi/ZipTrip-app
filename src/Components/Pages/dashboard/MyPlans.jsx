import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMyPlans } from '../../../util/dashboard'

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
        <ul>
          {plans.map((plan) => (
            <li key={plan._id}>
              <h2>{plan.title}</h2>
              <p>{plan.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No plans found.</p>
      )}
    </div>
  )
}

export default MyPlans