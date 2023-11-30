import { Box, Toolbar } from "@mui/material";
import { useForm, FormProvider } from 'react-hook-form';
import AvailabilityInput from './AvailabilityInput';
import { AuthContext } from '../hooks/use-auth';
import React, { useContext } from "react";
import { useAvailability } from "../hooks/use-availability";

export const AvailabilityPage = () => {
  const { user } = useContext(AuthContext);
  const {
    showNotification,
    closeNotification,
    isOperationSuccessful,
    modifyAvailability
  } = useAvailability();

  const handleAvailabilitySubmit = async (availability: { [day: string]: string[] }) => {
    try{
    await modifyAvailability(availability);
    console.log(availability);
    console.log(JSON.stringify(availability));
  }
  catch(error){
console.log("error occured",error);
  }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Toolbar />
      <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        <AvailabilityInput onAvailabilitySubmit={handleAvailabilitySubmit} />
      </Box>
      {showNotification && (
        // Render your notification component or message here
        <div>
          {isOperationSuccessful ? "Operation successful" : "Operation failed"}
          
        </div>
      )}
    </Box>
  );
};

export default AvailabilityPage;

