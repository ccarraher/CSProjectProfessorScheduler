import * as React from "react";
import { AuthContext } from "./use-auth";

export const useCoursePreferenceDataGrid = (
  fetchCoursePreferences: () => Promise<void>
): UseCoursePreferenceDataGridReturn => {
  const { user } = React.useContext(AuthContext);
  const [
    deletedCoursePreferenceSuccessfully,
    setDeletedCoursePreferenceSuccessfully,
  ] = React.useState<boolean>(false);
  const [showNotification, setShowNotification] =
    React.useState<boolean>(false);

  const closeNotification = (): void => {
    setShowNotification(false);
  };

  const deleteCoursePreference = async (courseId: number): Promise<void> => {
    if (user) {
      const body = {
        netId: user.netId,
        courseId: courseId,
      };
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("Content-Type", "application/json");
      requestHeaders.set("Authorization", `Bearer ${user.authToken}`);
      const response = await fetch(
        "http://127.0.0.1:8080/course/deleteCoursePreference",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: requestHeaders,
        }
      );
      if (response.ok) {
        setShowNotification(true);
        setDeletedCoursePreferenceSuccessfully(true);
        fetchCoursePreferences();
      } else {
        setShowNotification(true);
        setDeletedCoursePreferenceSuccessfully(false);
      }
    }
  };

  return {
    showNotification,
    closeNotification,
    deletedCoursePreferenceSuccessfully,
    deleteCoursePreference,
  };
};

interface UseCoursePreferenceDataGridReturn {
  readonly showNotification: boolean;
  readonly closeNotification: () => void;
  readonly deletedCoursePreferenceSuccessfully: boolean;
  readonly deleteCoursePreference: (courseId: number) => Promise<void>;
}
