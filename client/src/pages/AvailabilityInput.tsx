import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import moment from "moment";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const allHours = [
    "8:00am - 8:30am",
    "8:30am - 10:00am",
    "10:00am - 11:30am",
    "11:30am - 1:00pm",
    "1:00pm - 2:30pm",
    "2:30pm - 4:00pm",
    "4:00pm - 5:30pm",
    "5:30pm - 7:00pm",
    "7:00pm - 8:30pm",
    "8:30pm - 10:00pm"
  ];
  const icon = <Box sx={{ width: 70, height:40.5, backgroundColor: 'white', border: '.05px solid black', margin:'0px', padding:'0px'}} />;
  const checkedIcon = <Box sx={{ width: 70, height:40.5, backgroundColor: '#646cff', border: '.05px solid black' , margin:'0px',padding:'0px'}} />;

  interface AvailabilityInputProps {
    onAvailabilitySubmit: (availability: { [day: string]: string[] }) => void;
  }  
  
  const AvailabilityInput: React.FC<AvailabilityInputProps> = ({ onAvailabilitySubmit }) => {
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<{ [day: string]: string[] }>({
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: []
    });
  
    const handleTimeSlotChange = (day: string, timeSlot: string, isChecked: boolean) => {
      setSelectedTimeSlots(prevSlots => {
        const updatedSlots = { ...prevSlots };
  
        if (isChecked) {
          // Add the time slot if it's selected
          updatedSlots[day] = [...updatedSlots[day], timeSlot];
        } else {
          // Remove the time slot if it's deselected
          updatedSlots[day] = updatedSlots[day].filter(slot => slot !== timeSlot);
        }
  
        return updatedSlots;
      });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent default form submission behavior
      const splitTimeSlot = (timeSlot: string) => {
        const times = timeSlot.match(/\d+:\d+\w+/g);
        if (!times || times.length !== 2) return [];
    
        const [start, end] = times.map(t => moment(t, "h:mma"));
        const intervals = [];
    
        while (start < end) {
          const newStart = moment(start);
          intervals.push(`${newStart.format("h:mma")} - ${start.add(30, 'minutes').format("h:mma")}`);
        }
    
        return intervals;
      };
    
      const availability: { [day: string]: string[] } = {};
    
      Object.entries(selectedTimeSlots).forEach(([day, slots]) => {
        availability[day] = slots.flatMap(slot => splitTimeSlot(slot));
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
          <Box className="formTitleBox"sx={{display: 'flex',justifyContent: 'center'}}>
            <Typography variant="subtitle1"className="note"
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
              <Box key={hour} className="hour" sx={{textAlign:"center",color:'black', paddingLeft:'5px',paddingRight:'5px', width:"160px", height:40.5, border: '.05px solid black',}}>{hour}</Box>
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
          checked={selectedTimeSlots[day].includes(hour)}
          onChange={(e) => handleTimeSlotChange(day, hour, e.target.checked)}
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
               
  
  );
  
};

export default AvailabilityInput;
