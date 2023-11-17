import { Box, Toolbar } from "@mui/material";
import { CourseSelect } from "../components/course-select";
import { CoursePreferenceDataGrid } from "../components/course-preference-data-grid";
import { useCoursePreferences } from "../hooks/use-course-preferences";

export const CourseSelectionPage = (): JSX.Element => {
  const { courses, fetchCoursePreferences } = useCoursePreferences();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Toolbar />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}>
        <CourseSelect fetchCoursePreferences={fetchCoursePreferences} />
        <CoursePreferenceDataGrid
          courses={courses}
          fetchCoursePreferences={fetchCoursePreferences}
        />
      </Box>
    </Box>
  );
};

export default CourseSelectionPage;
