import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { useCoursePreferenceDataGrid } from "../hooks/use-course-preference-data-grid";
import { Course } from "../types/entity-types";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Snackbar, Typography } from "@mui/material";

export const CoursePreferenceDataGrid = ({
  courses,
  fetchCoursePreferences,
}: CoursePreferenceDataGridProps): JSX.Element => {
  const {
    showNotification,
    closeNotification,
    deletedCoursePreferenceSuccessfully,
    deleteCoursePreference,
  } = useCoursePreferenceDataGrid(fetchCoursePreferences);
  const rows: CourseRow[] = courses.map((course) => ({
    id: course.courseId,
    courseNumber: `${course.prefix} ${course.courseNumber}`,
    courseName: course.courseName,
  }));

  const columns: GridColDef<CourseRow>[] = [
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
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<CloseIcon />}
          onClick={() => {
            deleteCoursePreference(params.row.id);
          }}
          label="Delete"
        />,
      ],
    },
  ];
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" color="textSecondary">
        My Course Preferences
      </Typography>
      <DataGrid columns={columns} rows={rows} hideFooter />
      <Snackbar
        open={showNotification}
        autoHideDuration={5000}
        onClose={closeNotification}
      >
        <Alert
          onClose={closeNotification}
          severity={deletedCoursePreferenceSuccessfully ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {deletedCoursePreferenceSuccessfully
            ? "Course Preference was successfully deleted!"
            : "Course Preference deletion failed due to an error."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

interface CoursePreferenceDataGridProps {
  readonly courses: Course[];
  readonly fetchCoursePreferences: () => Promise<void>;
}

interface CourseRow extends Pick<Course, "courseName"> {
  readonly id: number;
  readonly courseNumber: string;
}
