import { Box, Toolbar} from "@mui/material";
import AvailabilityInput from './AvailabilityInput';

export const AvailabilityPage = () => {
  const handleAvailabilitySubmit = (availability: { [day: string]: string[] }) => {  
    console.log(availability); 
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}> {}
      <Toolbar />
      <Box sx={{ flexGrow: 1, p: 3,overflow: 'auto'}}> {}
        <AvailabilityInput onAvailabilitySubmit={handleAvailabilitySubmit} />
      </Box>
    </Box>
  );
};

export default AvailabilityPage;