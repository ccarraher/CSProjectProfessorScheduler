export const generateTimeIntervals = () => {
  const intervals = [];
  const startTime = new Date(0); // Midnight
  startTime.setHours(0, 0, 0);
  const endTime = new Date(0); // 11 PM
  endTime.setHours(23, 59, 59, 999); // Set the end time to 11:59:59.999 PM

  const intervalDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

  let currentTime = new Date(startTime);

  while (currentTime <= endTime) {
    intervals.push(
      currentTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    );
    currentTime = new Date(currentTime.getTime() + intervalDuration);
  }

  return intervals;
};

export const convertToAMPM = (timeString: string) => {
  // Parse the input time string
  const [hour, minute] = timeString.split(":").map(Number);

  // Determine if it's AM or PM
  const period = hour < 12 ? "AM" : "PM";

  // Convert 24-hour format to 12-hour format
  const formattedHour = hour % 12 || 12;

  // Create the final formatted time string
  const formattedTime = `${formattedHour}:${
    minute < 10 ? "0" : ""
  }${minute} ${period}`;

  return formattedTime;
};
