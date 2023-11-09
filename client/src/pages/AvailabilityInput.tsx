import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

interface AvailabilityInputProps {
  onAvailabilitySubmit: (availability: { [day: string]: { periods: { startHour: string; endHour: string }[] } }) => void;
}
const icon = <Box sx={{ width: 70, height:40.5, backgroundColor: 'white', border: '.05px solid black', margin:'0px', padding:'0px'}} />;

// Custom icon for checked state
const checkedIcon = <Box sx={{ width: 70, height:40.5, backgroundColor: '#646cff', border: '.05px solid black' , margin:'0px',padding:'0px'}} />;


const AvailabilityInput: React.FC<AvailabilityInputProps> = ({ onAvailabilitySubmit }) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const allHours = [
    '7:00 am - 7:30 am',
  '7:30 am - 8:00 am',
  '8:00 am - 8:30 am',
  '8:30 am - 9:00 am',
  '9:00 am - 9:30 am',
  '9:30 am - 10:00 am',
  '10:00 am - 10:30 am',
  '10:30 am - 11:00 am',
  '11:00 am - 11:30 am',
  '11:30 am - 12:00 pm',
  '12:00 pm - 12:30 pm',
  '12:30 pm - 1:00 pm',
  '1:00 pm - 1:30 pm',
  '1:30 pm - 2:00 pm',
  '2:00 pm - 2:30 pm',
  '2:30 pm - 3:00 pm',
  '3:00 pm - 3:30 pm',
  '3:30 pm - 4:00 pm',
  '4:00 pm - 4:30 pm',
  '4:30 pm - 5:00 pm',
  '5:00 pm - 5:30 pm',
  '5:30 pm - 6:00 pm',
  '6:00 pm - 6:30 pm',
  '6:30 pm - 7:00 pm',
  '7:00 pm - 7:30 pm',
  '7:30 pm - 8:00 pm',
  '8:00 pm - 8:30 pm',
  '8:30 pm - 9:00 pm',
  '9:00 pm - 9:30 pm',
  '9:30 pm - 10:00 pm',

  ];

  const handleDayChange = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const isDaySelected = (day: string) => selectedDays.includes(day);

  const handleSubmit = () => {
    const availability: { [day: string]: { periods: { startHour: string; endHour: string }[] } } = {};

    selectedDays.forEach((day) => {
      availability[day] = { periods: [] };
    });

    onAvailabilitySubmit(availability);
  };

  return (
   
      
        <Box
          className="wrapper"
          sx={{
            display: 'block',
            justifyContent: 'center',
            bgcolor: 'white',
            minHeight: '80vh',
            position: 'sticky',
            pl: '50px',
            pr: '50px',
            pb: '50px',
            pt: '40px',
          }}
        >
          <Box
            className="formTitleBox"
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="h6"
              className="title"
              sx={{
                width: 'fit-content',
                height: 'fit-content',
                m: 0,
                mb: '10px',
                p: 0,
                textAlign: 'center',
                color: 'black'
              }}
            >
              Enter your availability below.
            </Typography>
          </Box>
          <Box
            className="formTitleBox"
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="subtitle1"
              className="note"
              sx={{
                width: 'fit-content',
                height: 'fit-content',
                m: 0,
                mb: '10px',
                p: 0,
                textAlign: 'center',
                color: 'black'
              }}
            >
              Select cell to mark that time slot as "available". All blank cells will be marked as "unavailable" time slots.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: '20px',
              border: '1px solid #a8b2b9',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              height: 'min-content',
            }}
          >
            <Box
              className="days-header"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb:'10px'
              }}
            >
            <Box sx={{ width: '130px',marginRight:"80px"}} /> {/* This placeholder is for the times column */}
          {daysOfWeek.map((day) => (
            <Box key={day} className="day-name" sx={{flex: 1,color:'black',width:"71px"}}>{day}</Box>
          ))}
            </Box>
            <Box
              className="days-and-times"
              sx={{
                margin:0,
                padding:0,
                display:'flex'
              }}
            >
            <Box className="times-column" sx={{
            display: 'flex',
            flexDirection: 'column',
            padding:0,
            margin:0
              }}>
            
              {allHours.map((hour) => (
              <Box key={hour} className="hour" sx={{color:'black', padding:'9.5px', width:"150px"}}>{hour}</Box>
              ))}
            </Box> 

            {daysOfWeek.map((day) => (
  <Box key={day} sx={{display: 'flex', flexDirection: 'column', padding:0,
  margin:0}}>
    {allHours.map((hour) => (
      <FormControlLabel
      sx={{margin:0}}
        key={hour}
        control={
          <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          sx={{
            padding: 0, 
            margin: 0, 
          }}
        />
        }
        label="" 
      />
    ))}
  </Box>
))}

            </Box>
            <Box
              className="buttonContainer"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: '20px',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                className="submitButton"
                sx={{
                  width: '300px',
      padding: '15px',

                }}
              >
                SUBMIT
              </Button>
            </Box>
          </Box>
                  </Box>
                //</Box>
              //</Box>
  
  );
  
};

export default AvailabilityInput;