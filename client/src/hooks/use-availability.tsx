import React, { useContext, useState } from "react";
import { AuthContext } from "./use-auth";

export const useAvailability = () => {
  const { user } = useContext(AuthContext);
  const [isOperationSuccessful, setIsOperationSuccessful] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const closeNotification = () => {
    setShowNotification(false);
  };

  const modifyAvailability = async (timeSlots : { [day: string]: string[] }): Promise<void> => {
    if (user) {
      const body = {
        netId: user.netId,
        timeSlots,
      };
      console.log(JSON.stringify(body));
      const requestHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.authToken}`
      });

      try {
        const response = await fetch("http://127.0.0.1:8080/availability/update", {
          method: "POST",
          body: JSON.stringify(body),
          headers: requestHeaders,
        });

        setShowNotification(true);
        setIsOperationSuccessful(response.ok);
      } catch (error) {
        console.error("Error during fetch:", error);
        setShowNotification(true);
        setIsOperationSuccessful(false);
      }
    }
  };

  return {
    showNotification,
    closeNotification,
    isOperationSuccessful,
    modifyAvailability,
  };
};

// Define the return type for better type-checking and IntelliSense
interface UseAvailabilityReturn {
  readonly showNotification: boolean;
  readonly closeNotification: () => void;
  readonly isOperationSuccessful: boolean;
  readonly modifyAvailability: (availabilityData: { [day: string]: string[] }) => Promise<void>;
}
