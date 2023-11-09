import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const CourseSelectionPage: React.FC = () => {
  const initialCourse = '';
  const [selectedCourses, setSelectedCourses] = useState<string[]>([initialCourse]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [netID, setNetID] = useState<string>('');

  type Course = {
    courseId: number;
    prefix: string;
    courseNumber: number;
    courseName: string;
    school: string;
    department: string;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/course/get-courses');
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);

  const handleCourseChange = (index: number, value: string) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = value;
    setSelectedCourses(updatedCourses);
  };

  const handleAddCourse = () => {
    setSelectedCourses([...selectedCourses, initialCourse]);
  };
 

  const handleSavePreferences = async () => {
    // Make sure courses are selected
    if (selectedCourses.length === 0 || selectedCourses.includes('')) {
      console.error('Please select at least one course.');
      return;
    }

    savePreferences(netID, selectedCourses)
      .then((response) => {
        console.log('Preferences saved successfully:', response);
      })
      .catch((error: Error) => {
        console.error('Failed to save preferences:', error.message);
      });
  };

  const savePreferences = async (netID: string, selectedCourses: string[]) => {
    const response = await fetch('http://localhost:8080/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ netID, selectedCourses }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" style={{ marginTop: '4rem', marginLeft: '.5rem' }} color="grey">Course Selection</Typography>
      {selectedCourses.map((_, index: number) => (
        <Box key={index} mt={3}>
          <FormControl fullWidth sx={{ padding: '8px' }}>
            <InputLabel>Course {index + 1}</InputLabel>
            <Select
              value={courses[selectedCourses[index] as unknown as number]?.courseId || ''}
              onChange={(e) => handleCourseChange(index, e.target.value as string)}
            >
              <MenuItem value="">Select a course</MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
        <Button variant="outlined" onClick={handleAddCourse} style={{ marginTop: '1rem', marginLeft: '.5rem' }}>
         Add Another Course
        </Button>
        <Button variant="contained" color="primary" onClick={handleSavePreferences} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
        Save Preferences
        </Button>
    </Box>
  );
};

export default CourseSelectionPage;

