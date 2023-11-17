import * as React from "react";
import { AuthContext } from "./use-auth";
import { Course } from "../types/entity-types";

export const useCoursePreferences = (): UseCoursePreferencesReturn => {
  const { user } = React.useContext(AuthContext);
  const [courses, setCourses] = React.useState<Course[]>([]);

  const fetchCoursePreferences = async (): Promise<void> => {
    const body = {
      netId: user?.netId,
    };
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", `Bearer ${user?.authToken}`);
    const response = await fetch(
      "http://127.0.0.1:8080/course/getCoursePreferences",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: requestHeaders,
      }
    );
    const jsonResponse = await response.json();
    setCourses(jsonResponse);
  };

  let didInit = false;
  React.useEffect(() => {
    if (user && user.authToken && !didInit) {
      didInit = true;
      fetchCoursePreferences();
    }
  }, [user, user?.authToken]);

  return { courses, fetchCoursePreferences };
};

interface UseCoursePreferencesReturn {
  readonly courses: Course[];
  readonly fetchCoursePreferences: () => Promise<void>;
}
