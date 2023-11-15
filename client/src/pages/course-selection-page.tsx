import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AuthContext } from '../hooks/use-auth';

export const CourseSelectionPage: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [netId, setNetID] = useState<string>('');
  const [notification, setNotification] = useState<string | null> (null);

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
        if (user) {
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set("Content-Type", "application/json");
        requestHeaders.set("Authorization", `Bearer ${user.authToken}`);

          const response = await fetch('http://localhost:8080/course/get-courses', {
            method: 'GET',
            headers: requestHeaders
          });
          const data = await response.json();
  
          console.log('Data from backend:', data); // testing...
  
          setCourses(data);
          setSelectedCourses([0]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, [user, user?.authToken]);

  useEffect(() => {
    if (user && user.authToken && !netId && user.id) { 
      setNetID(user.id.toString());
    }
  }, [user, netId]);
  

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
      console.error('Please select at least one course.');
      return;
    }

    savePreferences(netId, selectedCourses)
      .then((response) => {
        console.log('Preferences saved successfully:', response);
        setNotification('Preferences were successfully saved');
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error: Error) => {
        console.error('Failed to save preferences:', error.message);
      });
  };

  const savePreferences = async (netID: string, selectedCourses: number[]): Promise<any> => {
    
    if (user){
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", `Bearer ${user.authToken}`);

    const response = await fetch('http://localhost:8080/course/submit-preferences', {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ netId, selectedCourses }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

  }};
  console.log('NetID: ', netId)
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
            <InputLabel>Course {index + 1}</InputLabel>
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
      {notification && (
      <Typography variant="body1" style={{ color: 'green', marginLeft: '1rem'}}>
        {notification}
      </Typography>
    )}
    </Box>
  );  
};

export default CourseSelectionPage;