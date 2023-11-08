import React from 'react';
import { Box, Toolbar, Container } from "@mui/material";
import AvailabilityInput from './AvailabilityInput';

export const AvailabilityPage = () => {
  const handleAvailabilitySubmit = (availability: { [day: string]: { periods: { startHour: string; endHour: string }[] } }) => {
    // Handle submission of the availability data
    console.log(availability); // For now, we'll just log it to the console
  };

  return (
    <Box component={'form'} sx={{ display: "flex", flexDirection: "column", width: "100%" }}> {}
      <Toolbar />
      <Box sx={{ flexGrow: 1, p: 3}}> {/* Ensure minimum width is set to prevent squishing */}
        <AvailabilityInput onAvailabilitySubmit={handleAvailabilitySubmit} />
      </Box>
    </Box>
  );
};

export default AvailabilityPage;