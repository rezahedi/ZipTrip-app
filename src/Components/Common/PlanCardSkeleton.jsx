import React from 'react'
import { Box, Skeleton } from '@mui/material';

function PlanCardSkeleton() {
  return (
    <Box>
      <Skeleton variant="rectangular" height={195} sx={{ borderRadius: 3 }} />
      <Skeleton variant="text" sx={{ marginTop: 1.5, width: '90%', height: 30 }} />
      <Skeleton variant="text" sx={{ width: '70%' }} />
      <Skeleton variant="text" sx={{ width: '50%' }} />
    </Box>
  )
}

export default PlanCardSkeleton