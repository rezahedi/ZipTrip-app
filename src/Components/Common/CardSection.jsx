import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import PlanCard from './PlanCard';

const CardSection = ({ title, category='', search='' }) => {
  return (
    <Box
      sx={{
        marginTop: 2,
        marginBottom: 4,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <Grid container spacing={3}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <PlanCard planId={index} image='http://something' title='Placeholder example plan title here' />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
};

CardSection.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  search: PropTypes.string,
};

export default CardSection;