import React, { useState } from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

interface AvailabilityInputProps {
  onAvailabilitySubmit: (availability: { [day: string]: { periods: { startHour: string; endHour: string }[] } }) => void;
}

const AvailabilityInput: React.FC<AvailabilityInputProps> = ({ onAvailabilitySubmit }) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const allHours = [
    '7:00 am - 8:00 am',
    '8:00 am - 9:00 am',
    '9:00 am - 10:00 am',
    '10:00 am - 11:00 am',
    '11:00 am - 12:00 pm',
    '12:00 pm - 1:00 pm',
    '1:00 pm - 2:00 pm',
    '2:00 pm - 3:00 pm',
    '3:00 pm - 4:00 pm',
    '4:00 pm - 5:00 pm',
    '5:00 pm - 6:00 pm',
    '6:00 pm - 7:00 pm',
    '7:00 pm - 8:00 pm',
    '8:00 pm - 9:00 pm',
    '9:00 pm - 10:00 pm',
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
      sx={{
        fontFamily: "'Poppins', sans-serif",
        lineHeight: 1.5,
        fontWeight: 400,
        bgcolor: '#F5F6FA',
        fontSynthesis: 'none',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        WebkitTextSizeAdjust: '100%',
        mb: '50px'
        
      }}
    >
      <Box
        className="sticky-container"
        sx={{
          display: 'flex',
          height: 'max-content',
          justifyContent: 'center'
        }}
      >
        <Box
          className="wrapper"
          sx={{
            display: 'block',
            justifyContent: 'center',
            bgcolor: 'white',
            maxHeight: 'fit-content',
            position: 'sticky',
            pl: '50px',
            pr: '50px',
            pb: '50px',
            pt: '40px',
            mt: '20px',
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
              variant="h3"
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

          <form>
            <Box
              className="days-header"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                mt: '0px'
              }}
            >
              {/* ... Your days header map function ... */}
            </Box>
            <Box
              className="days-and-times"
              sx={{
                '& .day-column': {
                  display: 'flex',
                  flexDirection: 'column',
                  p: 0,
                  alignItems: 'flex-start',
                  m: 0,
                  mb: '0px',
                  color: 'black'
                },
                '& .times-column': {
                  display: 'flex',
                  transform: 'translateY(61.42px)',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  m: 0,
                  borderTop: 'none',
                  color: 'black'
                },
                '& .hour': {
                  display: 'flex',
                  m: 0,
                  border: '0.5px solid #a8b2b9',
                  borderRadius: 0,
                  p: '8px',
                  width: '160px',
                  color: 'black'
                },
                '& .custom-checkbox': {
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                },
                '& .circular-checkbox': {
                  width: '50px',
                  height: '20.5px',
                  p: '9px',
                  m: 0,
                  border: '0.5px solid #a8b2b9',
                  borderRadius: 0,
                  '&:hover': {
                    bgcolor: '#646cffa8'
                  }
                },
                '& .hidden-checkbox:checked + .circular-checkbox': {
                  bgcolor: '#646cff'
                }
              }}
            >
              {/* ... Your days and times map functions ... */}
            </Box>
            <Box
              className="buttonContainer"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: '20px'
              }}
            >
              <Button
                type="submit"
                variant="contained"
                className="submitButton"
                sx={{
                  width: '300px',
                  p: '15px',
                  pl: '30px',
                  pr: '30px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  bgcolor: '#3D82FF',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#306bdb'
                  }
                }}
              >
                SUBMIT
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  
  );
  
};

export default AvailabilityInput;