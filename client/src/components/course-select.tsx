import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/use-auth";
import { Course } from "../types/entity-types";

export const CourseSelect = ({ fetchCoursePreferences }: CourseSelectProps) => {
  const { user } = useContext(AuthContext);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (user) {
          const requestHeaders: HeadersInit = new Headers();
          requestHeaders.set("Content-Type", "application/json");
          requestHeaders.set("Authorization", `Bearer ${user.authToken}`);

          const response = await fetch(
            "http://localhost:8080/course/get-courses",
            {
              method: "GET",
              headers: requestHeaders,
            }
          );
          const data = await response.json();

          console.log("Data from backend:", data); // testing...

          setCourses(data);
          setSelectedCourses([0]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [user, user?.authToken]);

  const handleCourseChange = (index: number, courseId: number) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = courseId;
    setSelectedCourses(updatedCourses);
  };

  const handleAddCourse = (courseId: number) => {
    if (selectedCourses.length < 5) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleSavePreferences = async () => {
    // Make sure courses are selected
    if (selectedCourses.length === 0 || selectedCourses.includes(0)) {
      console.error("Please select at least one course.");
      return;
    }

    savePreferences(selectedCourses)
      .then((response) => {
        console.log("Preferences saved successfully:", response);
        setShowNotification(true);
        fetchCoursePreferences();
      })
      .catch((error: Error) => {
        console.error("Failed to save preferences:", error.message);
      });
  };

  const savePreferences = async (selectedCourses: number[]): Promise<void> => {
    if (user) {
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("Content-Type", "application/json");
      requestHeaders.set("Authorization", `Bearer ${user.authToken}`);

      const response = await fetch(
        "http://localhost:8080/course/submit-preferences",
        {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify({ netId: user.netId, selectedCourses }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
  };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        style={{ marginTop: "4rem", marginLeft: ".5rem" }}
        color="textSecondary"
      >
        Course Selection
      </Typography>
      {selectedCourses.map((selectedCourse, index: number) => (
        <Box key={index} mt={3}>
          <FormControl fullWidth sx={{ padding: "8px" }}>
            <InputLabel>Course {index + 1}</InputLabel>
            <Select
              value={selectedCourse}
              onChange={(e) =>
                handleCourseChange(index, e.target.value as number)
              }
            >
              <MenuItem value={0}>Select a course</MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.courseId} value={course.courseId}>
                  {`${course.prefix}${course.courseNumber} - ${course.courseName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          handleAddCourse(0);
        }}
        style={{ marginTop: "1rem", marginLeft: ".5rem" }}
      >
        Add Another Course
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSavePreferences}
        style={{ marginTop: "1rem", marginLeft: "1rem" }}
      >
        Save Preferences
      </Button>
      <Snackbar
        open={showNotification}
        autoHideDuration={5000}
        onClose={() => setShowNotification(false)}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Preferences were successfully saved
        </Alert>
      </Snackbar>
    </Box>
  );
};

interface CourseSelectProps {
  readonly fetchCoursePreferences: () => Promise<void>;
}
