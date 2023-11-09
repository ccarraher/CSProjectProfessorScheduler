import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const CourseSelectionPage: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [NetID, setNetID] = useState<string>('');

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
        const response = await fetch('http://localhost:8080/course/get-courses', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJpYXQiOjE2OTk1NjIyMTQsInJvbGVzIjoiVVNFUiJ9.LJpLX7fgOmKnMFffaZZAUDJFRyfZ6zBmP6N5TmppkuQa6arGwiS_KG1bsm9PmQdAsKvmhWaZbRejREvsgLvkzdhvmi2-bMfA3HclExpUtJepDSP61GWbNk7u1ZfYXey6RwqhydbAfEtzoL3Wnd1L7JWcqJU43bZwVmr3duVDZ0VB2_y23LD89IG9g8B8EIPCEA6zux9H4jWyD-4a0nj3tGpQU1_H8xcYUua1us9PzGTRQ7J9NflLnYy5CwmxYtMooa6Wv6HoRFNXbJQsfizttmx87ht6WAKLj2S3IOu21hcrerNBOlgsz9xCsZN0afn5Q_Cp6aFuUnAMEh4gbLHONA`,
          },
        });
        const data = await response.json();

        console.log('Data from backend:', data); // testing...

        setCourses(data);

        setSelectedCourses([0]);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);
  

  const handleCourseChange = (index: number, courseId: number) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index] = courseId;
    setSelectedCourses(updatedCourses);
  };

  const handleAddCourse = (courseId: number) => {
    setSelectedCourses([...selectedCourses, courseId]);
  };
 

  const handleSavePreferences = async () => {
    // Make sure courses are selected
    if (selectedCourses.length === 0 || selectedCourses.includes(0)) {
      console.error('Please select at least one course.');
      return;
    }

    savePreferences(NetID, selectedCourses)
      .then((response) => {
        console.log('Preferences saved successfully:', response);
      })
      .catch((error: Error) => {
        console.error('Failed to save preferences:', error.message);
      });
  };

  const savePreferences = async (netID: string, selectedCourses: number[]): Promise<any> => {
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
  console.log('Courses Data:', courses);
  console.log('Selected Courses:', selectedCourses);

  return (
    <Box p={4}>
      <Typography variant="h4" style={{ marginTop: '4rem', marginLeft: '.5rem' }} color='textSecondary'>
        Course Selection
      </Typography>
      {selectedCourses.map((selectedCourse, index: number) => (
        <Box key={index} mt={3}>
          <FormControl fullWidth sx={{ padding: '8px' }}>
            <InputLabel>Select a course</InputLabel>
            <Select
              value={selectedCourse}  
              onChange={(e) => handleCourseChange(index, e.target.value as number)}
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
      <Button variant="outlined" onClick={(e) => { e.preventDefault(); handleAddCourse(0); }} style={{ marginTop: '1rem', marginLeft: '.5rem' }} >
        Add Another Course
        </Button>
      <Button variant="contained" color="primary" onClick={handleSavePreferences} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
        Save Preferences
      </Button>
    </Box>
  );  
};

export default CourseSelectionPage;