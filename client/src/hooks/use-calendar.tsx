import * as React from "react";
import { SxProps, Theme, alpha, darken } from "@mui/material";
import moment from "moment";
import { AuthContext } from "./use-auth";

export const FIRST_DAY_OF_CLASSES = moment("2024-01-16");
const LAST_DAY_OF_CLASSES = moment("2024-05-03"); // Definitely don't want to hard code these but what are our options?
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const useCalendar = (): UseCalendarReturn => {
  const { user } = React.useContext(AuthContext);
  const [semesterDates, setSemesterDates] = React.useState<
    ClassDetailsWithDates[]
  >([]);
  const colors = ["#F9626D", "#856DF4", "#20CBBD", "#f9a862"];

  const convertToCalendarForm = (
    data: ClassDetails[]
  ): ClassDetailsWithDates[] => {
    const startDateMs = FIRST_DAY_OF_CLASSES.toDate().getTime();
    const numOfDays = LAST_DAY_OF_CLASSES.diff(FIRST_DAY_OF_CLASSES, "days");
    const semesterDates = [...Array(numOfDays).keys()].map(
      (i) => new Date(startDateMs + i * DAY_IN_MS)
    );
    const calendarDays = data.map((course, idx) => {
      const datesWhenCourseOccurs = semesterDates.filter((x) =>
        course.days.includes(x.toLocaleString("en-us", { weekday: "long" }))
      );
      return {
        ...course,
        datesWhenCourseOccurs,
        color: colors[idx],
      };
    });
    return calendarDays;
  };
  let didInit = false;

  React.useEffect(() => {
    if (user && user.authToken && !didInit) {
      didInit = true;
      const fetchPreviousSemester = async () => {
        const body = {
          netId: user.netId,
        };
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set("Content-Type", "application/json");
        requestHeaders.set("Authorization", `Bearer ${user.authToken}`);
        const response = await fetch(
          "http://127.0.0.1:8080/schedule/previousSemesterSchedule",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: requestHeaders,
          }
        );
        const jsonResponse = await response.json();
        const previousSemesterScheduleData: ClassDetails[] =
          jsonResponse.previousSemesterSchedule;
        if (previousSemesterScheduleData) {
          const calendarDays = convertToCalendarForm(
            previousSemesterScheduleData
          );
          setSemesterDates(calendarDays);
        }
      };
      fetchPreviousSemester();
    }
  }, [user, user?.authToken]);

  const events: Event[] = semesterDates
    .map((course) => {
      const yea = course.datesWhenCourseOccurs.map((dateWhenCourseOccurs) => {
        return {
          title: `${course.classNumber} - ${course.className}`,
          start: moment(dateWhenCourseOccurs)
            .set("hour", Number(course.startTime.split(":")[0]))
            .set("minute", Number(course.startTime.split(":")[1]))
            .set("second", 0)
            .toDate(),
          end: moment(dateWhenCourseOccurs)
            .set("hour", Number(course.endTime.split(":")[0]))
            .set("minute", Number(course.endTime.split(":")[1]))
            .set("second", 0)
            .toDate(),
          backgroundColor: alpha(course.color, 0.3),
          borderColor: alpha(course.color, 0.3),
          textColor: course.color,
        };
      });
      return yea;
    })
    .flat();

  const calendarStyles = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    p: 3,
    overflow: "scroll",
    ".fc-toolbar-title": {
      color: "black",
    },
    ".fc-timegrid-slot, .fc-col-header-cell-cushion, .fc-icon-chevron-left, .fc-icon-chevron-right":
      {
        color: "#666666",
      },
    ".fc-prev-button, .fc-next-button, .fc-button, .fc-button-primary, .fc-button-group":
      {
        backgroundColor: "#ffffff",
        color: "#666666",
        opacity: 0.8,
        borderColor: "#ddd",
        borderRadius: "10%",
        boxShadow: "none",
        textTransform: "capitalize",
      },
    ".fc-prev-button:hover, .fc-next-button:hover, .fc-button:hover, .fc-button-primary:hover, .fc-button-group:hover":
      {
        backgroundColor: darken("#ffffff", 0.2),
        color: "#666666",
        borderColor: "#ddd",
      },
    ".fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active":
      {
        backgroundColor: darken("#ffffff", 0.2),
        color: "#666666",
        borderColor: "#ddd",
        boxShadow: "none",
      },
    ".fc-daygrid-event, .fc-daygrid-day-number": {
      color: "#666666",
    },
  };

  return { events, calendarStyles };
};

interface UseCalendarReturn {
  readonly events: Event[];
  readonly calendarStyles: SxProps<Theme>;
}

interface Event {
  readonly title: string;
  readonly start: Date;
  readonly end: Date;
  readonly backgroundColor: string;
  readonly borderColor: string;
  readonly textColor: string;
}

interface ClassDetails {
  readonly classNumber: string;
  readonly className: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly days: string[];
  readonly professorName: string;
  readonly netId: string;
}

export interface ClassDetailsWithDates extends ClassDetails {
  readonly datesWhenCourseOccurs: Date[];
  readonly color: string;
}
