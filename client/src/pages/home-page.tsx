import { Box, Toolbar, darken } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FIRST_DAY_OF_CLASSES, useCalendar } from "../hooks/use-calendar";

export const HomePage = () => {
  const { events, calendarStyles } = useCalendar();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Toolbar />
      <Box sx={calendarStyles}>
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          weekends={false}
          events={events}
          defaultAllDay={false}
          allDaySlot={false}
          initialDate={FIRST_DAY_OF_CLASSES.toDate()}
        />
      </Box>
    </Box>
  );
};
