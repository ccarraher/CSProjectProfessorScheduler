import * as React from "react";
import { Course } from "../types/entity-types";
import { AuthContext } from "./use-auth";
import { GridColDef } from "@mui/x-data-grid";
import _, { groupBy, map, uniq, uniqBy } from "lodash-es";

export const useAdmin = (): UseAdminReturn => {
  const [professorSchedules, setProfessorSchedules] = React.useState<
    ProfessorSchedule[]
  >([]);
  const [isProfessorDetailModalOpen, setIsProfessorDetailModalOpen] =
    React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const { user } = React.useContext(AuthContext);

  const fetchAllProfessorSchedules = async () => {
    if (user?.authToken) {
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("Content-Type", "application/json");
      requestHeaders.set("Authorization", `Bearer ${user?.authToken}`);
      const response = await fetch(
        "http://127.0.0.1:8080/admin/allProfessorSchedules",
        {
          method: "GET",
          headers: requestHeaders,
        }
      );
      const jsonResponse: AllProfessorSchedulesResponse[] =
        await response.json();
      const mappedToAppropriateObject = jsonResponse.map((x) => {
        return {
          id: x.netId,
          firstName: x.firstName,
          lastName: x.lastName,
          course: {
            id: x.courses.courseId,
            courseNumber: `${x.courses.prefix} ${x.courses.courseNumber}.${x.schedule.sectionNumber}`,
            courseName: x.courses.courseName,
            time: x.schedule.time,
            days: x.schedule.days,
          },
        };
      });
      const profSchedules: ProfessorSchedule[] = map(
        groupBy(mappedToAppropriateObject, "id"),
        (professorCourses, id) => {
          const courses = professorCourses.map((x) => x.course);
          const professorSchedule = {
            firstName: professorCourses?.[0]?.firstName ?? "-",
            lastName: professorCourses?.[0]?.lastName ?? "-",
            id,
            courses: uniqBy(courses, "id"),
          };
          return professorSchedule;
        }
      );
      setProfessorSchedules(profSchedules);
    }
  };

  let didInit = false;
  React.useEffect(() => {
    if (user && user.authToken && !didInit) {
      didInit = true;
      fetchAllProfessorSchedules();
    }
  }, [user?.authToken]);

  const columns: GridColDef<ProfessorSchedule>[] = [
    {
      field: "id",
      headerName: "Net ID",
      flex: 1,
      sortable: false,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      sortable: false,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      sortable: false,
    },
  ];

  const courseColumns: GridColDef<ProfessorCourse>[] = [
    {
      field: "courseNumber",
      headerName: "Course Number",
      flex: 1,
      sortable: false,
    },
    {
      field: "courseName",
      headerName: "Course Name",
      flex: 1,
      sortable: false,
    },
    {
      field: "days",
      headerName: "Days",
      flex: 1,
      sortable: false,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      sortable: false,
    },
  ];

  const selectedRow = professorSchedules.find((x) => x.id === selectedId);

  const openModal = (id: string) => {
    setSelectedId(id);
    setIsProfessorDetailModalOpen(true);
  };

  const closeModal = () => {
    setIsProfessorDetailModalOpen(false);
  };

  const handleSchedulerClick = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", `Bearer ${user?.authToken}`);
    const response = await fetch(
      "http://127.0.0.1:8080/schedule/createSchedule",
      {
        method: "GET",
        headers: requestHeaders,
      }
    );
    fetchAllProfessorSchedules();
  };

  return {
    openModal,
    closeModal,
    selectedRow,
    columns,
    courseColumns,
    isProfessorDetailModalOpen,
    professorSchedules,
    handleSchedulerClick,
  };
};

interface UseAdminReturn {
  readonly openModal: (id: string) => void;
  readonly closeModal: () => void;
  readonly selectedRow: ProfessorSchedule | undefined;
  readonly columns: GridColDef<ProfessorSchedule>[];
  readonly courseColumns: GridColDef<ProfessorCourse>[];
  readonly isProfessorDetailModalOpen: boolean;
  readonly professorSchedules: ProfessorSchedule[];
  readonly handleSchedulerClick: () => void;
}

export interface AllProfessorSchedulesResponse {
  readonly firstName: string;
  readonly lastName: string;
  readonly netId: string;
  readonly schedule: Schedule;
  readonly courses: Course;
}

export interface ProfessorSchedule {
  readonly firstName: string;
  readonly lastName: string;
  readonly id: string;
  readonly courses: ProfessorCourse[];
}

export interface Schedule {
  readonly classNumber: number;
  readonly courseId: number;
  readonly days: string;
  readonly instructorId: string;
  readonly sectionNumber: string;
  readonly time: string;
}

export interface ProfessorCourse {
  readonly id: number;
  readonly courseName: string;
  readonly courseNumber: string;
  readonly days: string;
  readonly time: string;
}
